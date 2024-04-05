import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus, BadgeCheck } from "lucide-react";
import BigProfile from "@/components/cards/big-profile";
import Image from "next/image";
import PostCard from "@/components/cards/post-card";
import TabView from "@/components/tab-view";
import ReadingDrawing from "@/components/drawings/reading";
import { AreaChart, Card, DonutChart, Title } from "@tremor/react";

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

  const yearStart = new Date(new Date().getTime() - 2629743000 * 12);
  const postByWeek: Array<Array<any>> = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  articles.forEach((element) => {
    const week = Math.floor(
      (element.createdAt.getTime() - yearStart.getTime()) / (604800000 * 4),
    );

    if (postByWeek[week] == undefined) postByWeek[week] = [];
    postByWeek[week].push(element);
  });

  const months = postByWeek.map((i, n) => {
    return {
      "Post Count": i.length,
      date: new Date(
        yearStart.getTime() + n * 604800000 * 4,
      ).toLocaleDateString("en-US"),
    };
  });

  var groupBy = function (xs: Array<any>, key: string) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const _topics = groupBy(articles, "published");
  let topics = [];

  for (let i in _topics) {
    topics.push({
      name: i == "true" ? "Published" : "In-Progress",
      count: _topics[i].length,
    });
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
          <div key="1" className="w-full">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {articles.map((post) => (
                  <PostCard
                    key={post.id}
                    data={post}
                    subdomain={site.subdomain || ""}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center space-x-4">
                <ReadingDrawing className="w-1/3" />
                <h1 className="mb-2 font-cal text-4xl">No Posts Found</h1>
                <p className="text-lg text-stone-500">
                  This Teammate Hasn&apos;t Written Any Articles.
                </p>
              </div>
            )}
          </div>,
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2" key="2">
            <Card>
              <Title>Post Counts this Year</Title>
              <AreaChart
                className="h-72"
                data={months}
                categories={["Post Count"]}
                // labels={["Article Count"]}
                index="date"
                colors={["indigo", "cyan"]}
              />
            </Card>
            <Card>
              <Title>Article Statuses</Title>
              <DonutChart
                className="mt-6"
                data={topics}
                category="count"
                index="name"
                colors={["slate", "green"]}
              />
            </Card>
          </div>,
        ]}
      />
    </>
  );
}
