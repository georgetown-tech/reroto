import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import Link from "next/link";
// import { House } from "lucide-react";

const pages = [
  {
    id: "home",
    // icon: House,
    name: "Home Page",
    description:
      "This is the first page that users find themselves on when stumbling upon your website. Make it bold but keep it simple. Be iconic but humble. That's what makes a user keep reading.",
  },
  {
    id: "header",
    // icon: House,
    name: "Topbar",
    description:
      "The header is present on every page of your website. It helps provide a basic navigation to the different parts of the site so that your readers can get around.",
  },
  {
    id: "footer",
    // icon: House,
    name: "Footer",
    description:
      "The footer, like the header, is present on every page. In most cases, it includes more serious information like copyright, contacts, and other important information.",
  },
  {
    id: "article_page",
    // icon: House,
    name: "Article Page",
    description:
      "An article page is the page where your audience will read what your writers have posted. You can use the article components to add the article content.",
  },
  {
    id: "article",
    // icon: House,
    name: "Article Card",
    description: "---",
  },
  {
    id: "category_page",
    // icon: House,
    name: "Category Page",
    description: "---",
  },
  {
    id: "person_page",
    // icon: House,
    name: "Person Page",
    description: "---",
  },
];

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  console.log(user);

  const data = await prisma.site.findUnique({
    where: {
      id: user.siteId,
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
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {pages.map((i, n) => (
          <Link key={i.id} href={`/design/${i.id}`}>
            <article className="rounded-xl border bg-white p-4 shadow hover:bg-gray-50 sm:p-6 lg:p-8">
              <div className="flex items-start sm:gap-8">
                <div>
                  <h3 className="mt-4 text-lg font-medium sm:text-xl">
                    <a href="" className="hover:underline">
                      {i.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{i.description}</p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
