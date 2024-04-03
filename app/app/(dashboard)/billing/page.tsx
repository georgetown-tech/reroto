import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
// import { Card } from "@/components/ui/card";
import { Card, ProgressCircle } from "@tremor/react";
import BillingOverviewClientPage from "@/components/pages/billing-overview";

const stripe = require("stripe")(process.env.STRIPE_KEY);

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
    prisma.post.count({
      where: {
        siteId: user.siteId,
      },
    }),
    prisma.user.count({
      where: {
        siteId: user.siteId,
      },
    }),
  ]);

  if (!site) {
    notFound();
  }

  const invoices = await stripe.invoices.list({
    customer: site.stripeId,
  });

  return (
    <BillingOverviewClientPage
      articlesCount={articlesCount}
      userCount={usersCount}
      site={site}
      user={user}
      invoices={invoices.data}
    />
  );
}
