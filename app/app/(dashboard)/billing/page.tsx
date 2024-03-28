import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
import { Card } from "@/components/ui/card";
import { Tracker, type Color } from "@tremor/react";

interface Tracker {
  color: Color;
  tooltip: string;
}

const data: Tracker[] = [
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "rose", tooltip: "Downtime" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "gray", tooltip: "Maintenance" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "yellow", tooltip: "Degraded" },
  { color: "emerald", tooltip: "Operational" },
];

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
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
  if (!site) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="p-4">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <a href={""} className="focus:outline-none">
            {/* extend link to entire card */}
            <span className="absolute inset-0" aria-hidden={true} />
            Testing
          </a>
        </p>
      </Card>
      <Card className="p-4">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <a href={""} className="focus:outline-none">
            {/* extend link to entire card */}
            <span className="absolute inset-0" aria-hidden={true} />
            Testing
          </a>
        </p>
      </Card>
      <Card className="p-4">
        <p className="flex items-center justify-between text-tremor-default">
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            example.com
          </span>
          <span className="text-tremor-content dark:text-dark-tremor-content">
            uptime 99.1%
          </span>
        </p>
        <Tracker data={data} className="mt-2" />
      </Card>
      <Card className="p-4">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <a href={""} className="focus:outline-none">
            {/* extend link to entire card */}
            <span className="absolute inset-0" aria-hidden={true} />
            Testing
          </a>
        </p>
      </Card>
    </div>
  );
}
