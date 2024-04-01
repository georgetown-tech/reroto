"use client";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
// import { Card } from "@/components/ui/card";
import { Card, ProgressCircle } from "@tremor/react";
import { User } from "lucia";
import { Plan, Site } from "@prisma/client";

const maximums = {
  [Plan.none]: {
    articles: 5,
    users: 3,
  },
  [Plan.highschool]: {
    articles: 10000,
    users: 20,
  },
  [Plan.college]: {
    articles: 100000,
    users: 100,
  },
  [Plan.professional]: {
    articles: 250000,
    users: 150,
  },
  [Plan.enterprise]: {
    articles: 999999999,
    users: 999999,
  },
};

export default function BillingOverviewClientPage({
  user,
  site,
  articlesCount,
  userCount,
}: {
  user: User;
  site: Site;
  articlesCount: number;
  userCount: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="flex flex-row items-center gap-4 p-4">
        <ProgressCircle
          value={(100 * articlesCount) / maximums[site.plan].articles}
          size="md"
        >
          <span className="text-xs font-medium text-slate-700">
            {((100 * articlesCount) / maximums[site.plan].articles).toFixed(0)}%
          </span>
        </ProgressCircle>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Current Articles</h2>
          <p className="font-medium text-slate-700">
            {articlesCount} / {maximums[site.plan].articles} •{" "}
            {maximums[site.plan].articles - articlesCount} Until Maximum Reached
          </p>
        </div>
      </Card>
      <Card className="flex flex-row items-center gap-4 p-4">
        <ProgressCircle
          value={(100 * userCount) / maximums[site.plan].users}
          size="md"
        >
          <span className="text-xs font-medium text-slate-700">
            {((100 * userCount) / maximums[site.plan].users).toFixed(0)}%
          </span>
        </ProgressCircle>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Current Users</h2>
          <p className="font-medium text-slate-700">
            {userCount} / {maximums[site.plan].users} •{" "}
            {maximums[site.plan].users - userCount} Until Maximum Reached
          </p>
        </div>
      </Card>
    </div>
  );
}
