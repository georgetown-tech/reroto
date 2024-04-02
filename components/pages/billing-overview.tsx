"use client";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
// import { Card } from "@/components/ui/card";
import { Card, ProgressCircle, BarChart } from "@tremor/react";
import { User } from "lucia";
import { Plan, Site } from "@prisma/client";

function gaugeColor(number: number): string {
  if (number >= 100) return "red";
  if (number > 75) return "yellow";
  return "green";
}

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

const chartdata = [
  {
    name: "January",
  },
  {
    name: "February",
  },
  {
    name: "March",
  },
  {
    name: "April",
  },
  {
    name: "May",
  },
  {
    name: "June",
  },
  {
    name: "July",
  },
  {
    name: "August",
  },
  {
    name: "September",
  },
  {
    name: "October",
  },
  {
    name: "November",
  },
  {
    name: "December",
  },
];

function checkInvoiceMonthYear(
  date: number,
  month: number,
  year: number,
): boolean {
  let _date = new Date(date * 1000);
  return _date.getFullYear() == year && _date.getMonth() == month;
}

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us", { style: "currency", currency: "USD" })
    .format(number)
    .toString();

export default function BillingOverviewClientPage({
  user,
  site,
  articlesCount,
  userCount,
  invoices,
}: {
  user: User;
  site: Site;
  articlesCount: number;
  userCount: number;
  invoices: any[];
}) {
  let _chartdata = chartdata.map((i, j) => {
    let Revenue = 0;
    let Costs = 0;

    invoices.forEach((element) => {
      if (!checkInvoiceMonthYear(element.created, j, new Date().getFullYear()))
        return;

      element.lines.data.forEach((line: any) => {
        if (line.amount < 0) Revenue -= line.amount / 100;
        else Costs += line.amount / 100;
      });

      console.dir(element, { depth: null });
    });

    let Profit = Revenue - Costs;

    return {
      name: i.name,
      Revenue,
      Costs,
      Profit,
    };
  });

  return (
    <div className="space-y-4">
      <div>
        <Card className="p-4">
          <BarChart
            data={_chartdata}
            index="name"
            categories={["Revenue", "Costs", "Profit"]}
            colors={["green", "red", "blue"]}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
            onValueChange={(v) => console.log(v)}
          />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="flex flex-row items-center gap-4 p-4">
          <ProgressCircle
            value={(100 * articlesCount) / maximums[site.plan].articles}
            size="md"
            color={gaugeColor(
              (100 * articlesCount) / maximums[site.plan].articles,
            )}
          >
            <span
              className={`text-xs font-medium text-${gaugeColor(
                (100 * articlesCount) / maximums[site.plan].articles,
              )}-700`}
            >
              {((100 * articlesCount) / maximums[site.plan].articles).toFixed(
                0,
              )}
              %
            </span>
          </ProgressCircle>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Current Articles</h2>
            <p className="font-medium text-slate-700">
              {articlesCount} / {maximums[site.plan].articles} •{" "}
              {maximums[site.plan].articles - articlesCount} Until Maximum
              Reached
            </p>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 p-4">
          <ProgressCircle
            value={(100 * userCount) / maximums[site.plan].users}
            size="md"
            color={gaugeColor((100 * userCount) / maximums[site.plan].users)}
          >
            <span
              className={`text-xs font-medium text-${gaugeColor(
                (100 * userCount) / maximums[site.plan].users,
              )}-700`}
            >
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
    </div>
  );
}
