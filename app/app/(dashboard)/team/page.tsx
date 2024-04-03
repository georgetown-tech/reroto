import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus } from "lucide-react";
import BigProfile, { CardUserData } from "@/components/cards/big-profile";
import AddUserButton from "@/components/add-user-button";
import AddUserModal from "@/components/modal/add-user";

export default async function TeamOverview({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q?: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  const site = await prisma.site.findUnique({
    where: {
      id: user.siteId,
    },
  });
  const teammates: CardUserData[] = await prisma.user.findMany({
    where: {
      siteId: user.siteId,
      displayName: {
        contains: searchParams.q,
        mode: "insensitive",
      },
    },
    select: {
      displayName: true,
      image: true,
      role: true,
      id: true,
      email: true,
    },
  });
  if (!site) {
    notFound();
  }

  const url = site.customDomain
    ? site.customDomain
    : `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Teammates for {site.name}
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
      <div className="relative w-full border-b bg-white dark:bg-gray-300">
        <div className="flex flex-col items-center justify-between space-y-3 p-2 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <form method="GET" action="/team" className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="q"
                  defaultValue={searchParams.q}
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <AddUserButton>
              <AddUserModal />
            </AddUserButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {teammates.map((i, n) => (
          <BigProfile key={n} user={i} />
        ))}
      </div>
    </>
  );
}
