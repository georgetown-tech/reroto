import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";

export default async function SiteAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  const data = await prisma.site.findUnique({
    where: {
      id: user.siteId,
    },
  });
  if (!data) {
    notFound();
  }

  return <></>;
}
