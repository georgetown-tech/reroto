import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import Link from "next/link";

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  console.log(session);

  const data = await prisma.site.findUnique({
    where: {
      id: session.user.siteId,
    },
  });

  if (!data) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            Page Designs for {data.name}
          </h1>
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.subdomain}.localhost:3000`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
        {/* <CreatePostButton id={session.user.siteId} /> */}
      </div>
      {/* <Posts siteId={session.user.siteId} /> */}
      <div className="grid grid-cols-2">
        <Link href={`/design/home`}>
          <article className="rounded-xl border bg-white p-4 shadow hover:bg-gray-50 sm:p-6 lg:p-8">
            <div className="flex items-start sm:gap-8">
              <div>
                <h3 className="mt-4 text-lg font-medium sm:text-xl">
                  <a href="" className="hover:underline">
                    Home Page
                  </a>
                </h3>

                <p className="mt-1 text-sm text-gray-700">
                  This is the first page that users find themselves on when
                  stumbling upon your website. Make it bold but keep it simple.
                  Be iconic but humble. That&apos;s what makes a user keep
                  reading.
                </p>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </>
  );
}
