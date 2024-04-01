import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
// import { Card } from "@/components/ui/card";
import { Card, ProgressCircle } from "@tremor/react";
import BillingOverviewClientPage from "@/components/pages/billing-overview";

export default async function BillingOverviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  const [site, articlesCount, usersCount] = await Promise.all([
    prisma.site.findUnique({
      where: {
        id: user.siteId,
      },
    }),
    await prisma.post.count({
      where: {
        siteId: user.siteId,
      },
    }),
    await prisma.user.count({
      where: {
        siteId: user.siteId,
      },
    }),
  ]);

  if (!site) {
    notFound();
  }

  return (
    <BillingOverviewClientPage
      articlesCount={articlesCount}
      userCount={usersCount}
      site={site}
      user={user}
    />
  );
}
