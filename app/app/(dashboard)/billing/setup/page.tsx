import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
import { Card } from "@/components/ui/card";
import { Tracker, type Color } from "@tremor/react";

export default async function SettingsBillingPage({
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

  return <p>
    {site.stripeId}
  </p>;
}
