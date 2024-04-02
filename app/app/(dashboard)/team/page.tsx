import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus } from "lucide-react";
import BigProfile, { CardUserData } from "@/components/cards/big-profile";
import AddUserButton from "@/components/add-user-button";
import AddUserModal from "@/components/modal/add-user";
import TeamOverviewClient from "@/components/pages/team-overview";

export default async function TeamOverview({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q?: string };
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
  const users: CardUserData[] = await prisma.user.findMany({
    where: {
      siteId: user.siteId,
      displayName: {
        contains: searchParams.q,
        mode: "insensitive",
      },
    },
    select: {
      displayName: true,
      image: true,
      role: true,
      id: true,
      email: true,
    },
  });
  if (!site) {
    notFound();
  }

  return <TeamOverviewClient site={site} teammates={users} user={user} />;
}
