import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import Link from "next/link";
import PageEditor from "@/components/page-editor";

export default async function SitePosts({
  params,
}: {
  params: { id: string };
}) {
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

  return <PageEditor />;
}
