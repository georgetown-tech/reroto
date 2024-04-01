import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus, BadgeCheck } from "lucide-react";
import BigProfile from "@/components/big-profile";
import Image from "next/image";
import PostCard from "@/components/cards/post-card";
import TabView from "@/components/tab-view";

export default async function TeamPage({ params }: { params: { id: string } }) {
  const { user: _user } = await validateRequest();
  if (!_user) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  const articles = await prisma.post.findMany({
    where: {
      userId: params.id,
    },
  });
  const site = await prisma.site.findUnique({
    where: {
      id: _user.siteId,
    },
  });

  if (!user) {
    notFound();
  }

  if (!site) {
    notFound();
  }

  //   const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="mt-16 flex flex-col">
          <Image
            src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
            width={80}
            height={80}
            alt={user.displayName ?? "User avatar"}
            className="h-32 w-32 rounded-full"
          />
          <h1 className="mt-4 font-cal text-xl font-bold dark:text-white sm:text-3xl">
            {user.displayName}
          </h1>
          <p className="flex flex-row gap-2 text-lg dark:text-white">
            {user.role != null
              ? [
                  "Owner",
                  "Admin",
                  "Treasurer",
                  "Designer",
                  "Editor",
                  "Writer",
                  "Part-Time Writer",
                ][user.role]
              : "Unknown Role"}{" "}
            • {user.email}{" "}
            {user.emailVerified != null ? <BadgeCheck width={18} /> : <></>}
          </p>
        </div>
      </div>
      <TabView
        tabLabels={["About", "Articles", "Statistics"]}
        tabContents={[
          <div key="0">{user.description ?? ""}</div>,
          <div
            key="1"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {articles.map((i, n) => (
              <PostCard subdomain={site.subdomain || ""} key={n} data={i} />
            ))}
          </div>,
        ]}
      />
    </>
  );
}
