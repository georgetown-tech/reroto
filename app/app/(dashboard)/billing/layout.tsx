import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

import NavTab from "@/components/tab-nav";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";

export default async function BillingLayout() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: session.user.siteId,
    },
  });
  if (!data) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const domain = data.customDomain
    ? data.customDomain
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  // const { id } = useParams() as { id?: string };

  return (
    <div className="flex flex-col space-y-6">
      {/* <div className="flex items-center justify-center sm:justify-start"> */}
      <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
          Billing for {data.name}
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
      <div className="flex space-x-4 border-b border-stone-200 pb-4 pt-2 dark:border-stone-700">
        <NavTab
          navItems={[
            {
              name: "General",
              href: `/billing`,
              segment: null,
            },
            {
              name: "Domains",
              href: `/billing/usage`,
              segment: "usage",
            },
            {
              name: "Appearance",
              href: `/billing/history`,
              segment: "history",
            },
          ]}
        />
      </div>
    </div>
  );
}
