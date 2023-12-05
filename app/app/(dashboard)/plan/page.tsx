import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus, Check, X } from "lucide-react";
import BigProfile from "@/components/big-profile";
import AddUserButton from "@/components/add-user-button";
import AddUserModal from "@/components/modal/add-user";
import {
  Card,
  Title,
  TextInput,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  DateRangePicker,
  TableBody,
  Badge,
  DatePicker,
  DatePickerValue,
  Button,
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";

const colors = {
  "Ready for dispatch": "gray",
  Cancelled: "rose",
  Shipped: "emerald",
};
export default async function TeamOverview({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: session.user.siteId,
    },
  });
  const users = await prisma.user.findMany({
    where: {
      siteId: session.user.siteId,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      siteId: session.user.siteId as string,
      // ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      user: true,
    },
    // ...(limit ? { take: limit } : {}),
  });
  if (!data) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Planning for {data.name}
          </h1>
          <a
            href={`https://${url}`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </div>
      {/* <div className="flex gap-2 p-2"> */}
      <Table className="mt-6 h-screen rounded-lg bg-gray-50 p-2">
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <TextInput placeholder="Title" />
            </TableHeaderCell>

            <TableHeaderCell>
              <MultiSelect
                // onValueChange={setSelectedNames}
                placeholder="Writer"
                className="max-w-xs"
              >
                {users.map((item) => (
                  <MultiSelectItem key={item.name} value={item.name || ""}>
                    {item.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </TableHeaderCell>
            <TableHeaderCell>
              <MultiSelect
                // onValueChange={setSelectedNames}
                placeholder="Tags"
                className="max-w-xs"
              >
                {[{ name: "Sports" }].map((item) => (
                  <MultiSelectItem key={item.name} value={item.name}>
                    {item.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </TableHeaderCell>
            <TableHeaderCell>
              <MultiSelect
                // onValueChange={setSelectedNames}
                placeholder="Status"
                className="max-w-xs"
              >
                {[
                  { name: "Todo" },
                  { name: "Researching" },
                  { name: "Writing" },
                  { name: "Editing" },
                  { name: "Revising" },
                  { name: "Done" },
                ].map((item) => (
                  <MultiSelectItem key={item.name} value={item.name}>
                    {item.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </TableHeaderCell>
            <TableHeaderCell>
              <MultiSelect
                // onValueChange={setSelectedNames}
                placeholder="Published"
                className="max-w-xs"
              >
                {[{ name: "Published" }, { name: "Unpublished" }].map(
                  (item) => (
                    <MultiSelectItem key={item.name} value={item.name}>
                      {item.name}
                    </MultiSelectItem>
                  ),
                )}
              </MultiSelect>
            </TableHeaderCell>
            <TableHeaderCell>
              <DateRangePicker enableSelect={true} />
            </TableHeaderCell>
            <TableHeaderCell>Link</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((item) => (
            <TableRow key={item.title}>
              <TableCell className="truncate">{item.title}</TableCell>
              <TableCell>{item.user?.name}</TableCell>
              <TableCell>{""}</TableCell>
              <TableCell>
                {/* <Badge color={colors[item.status]} size="xs">
                  {item.status}
                </Badge> */}
              </TableCell>
              <TableCell>
                {item.published ? (
                  <Check width={22} className="text-green-500" />
                ) : (
                  <X width={22} className="text-red-500" />
                )}
              </TableCell>
              <TableCell className="text-right">{""}</TableCell>
              <TableCell>
                <Button size="xs" variant="secondary" color="gray">
                  See details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </div> */}
    </>
  );
}
