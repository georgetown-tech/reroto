import Editor from "@/components/visual-editor";
import { validateRequest } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function SitePosts({
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

  return (
    // <div className="fixed bottom-0 left-60 right-0 top-0 z-50 h-full bg-white">
    <Editor
      siteData={data}
      page={params.id}
      content={
        // @ts-ignore
        data.siteData[params.id]
      }
    />
    // </div>
  );
}
