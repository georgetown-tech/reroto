import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import {
  Card,
  Text,
  Title,
  Metric,
  List,
  ListItem,
  DonutChart,
  AreaChart,
} from "@tremor/react";

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

  if (session.user?.siteId == undefined) {
    redirect("/create-site");
  }

  const data = await prisma.site.findUnique({
    where: {
      id: session.user.siteId,
    },
  });
  const users = (
    await prisma.user.findMany({
      where: {
        siteId: session.user.siteId,
      },
    })
  ).map((i) => {
    return {
      ...i,
      role: [
        "Owner",
        "Admin",
        "Treasurer",
        "Designer",
        "Editor",
        "Writer",
        "Part-Time Writer",
      ][i.role || 0],
    };
  });
  const articles = await prisma.post.findMany({
    where: {
      siteId: session.user.siteId,
      createdAt: {
        gte: new Date(new Date().getTime() - 2629743000),
      },
    },
  });
  const monthStart = new Date(new Date().getTime() - 2629743000);
  const postByWeek: Array<Array<any>> = [[], [], [], []];
  articles.forEach((element) => {
    const week = Math.floor(
      (element.createdAt.getTime() - monthStart.getTime()) / 604800000,
    );

    if (postByWeek[week] == undefined) postByWeek[week] = [];
    postByWeek[week].push(element);
  });

  const weeks = postByWeek.map((i, n) => {
    return {
      "Post Count": i.length,
      date: new Date(monthStart.getTime() + n * 604800000).toLocaleDateString(
        "en-US",
      ),
    };
  });

  console.log(weeks);

  var groupBy = function (xs: Array<any>, key: string) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const _roles = groupBy(users, "role");
  let roles = [];

  for (let i in _roles) {
    roles.push({ name: i, count: _roles[i].length });
  }

  if (!data) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            Overview of {data.name}
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
        <CreatePostButton id={session.user.siteId} />
      </div>
      <main className="h-auto p-4 pt-20">
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <Title>Teammates</Title>

            <Metric>{users.length}</Metric>
            <List>
              {users.slice(0, 10).map((item) => (
                <ListItem key={item.id}>
                  <span>{item.name}</span>
                  <span>{item.role}</span>
                </ListItem>
              ))}
            </List>
          </Card>
          <Card>
            <Title>Roles</Title>
            <DonutChart
              className="mt-6"
              data={roles}
              category="count"
              index="name"
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
          </Card>
          <Card>
            <Title>Posts this Month</Title>

            <Metric>{articles.length}</Metric>
            <List>
              {articles.slice(0, 10).map((item) => (
                <ListItem key={item.id}>
                  <span className="truncate">{item.title}</span>
                  <span>{item.createdAt.toLocaleDateString("en-US")}</span>
                </ListItem>
              ))}
            </List>
          </Card>
          <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-64"></div>
        </div>
        {/* <div className="mb-4 h-96 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"></div> */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 md:h-72"></div>

          <Card>
            <Title>Post Counts this Month</Title>
            <AreaChart
              className="h-72"
              data={weeks}
              categories={["Post Count"]}
              // labels={["Article Count"]}
              index="date"
              colors={["indigo", "cyan"]}
            />
          </Card>
        </div>
      </main>
    </>
  );
}
