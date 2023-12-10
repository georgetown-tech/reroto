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

    // const onEditor = (editor: Editor) => {
    //   console.log('Editor loaded', { editor });
    // };
  
    // return (
    //   <GjsEditor
    //     // Pass the core GrapesJS library to the wrapper (required).
    //     // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
    //     grapesjs={grapesjs}
    //     // Load the GrapesJS CSS file asynchronously from URL.
    //     // This is an optional prop, you can always import the CSS directly in your JS if you wish.
    //     grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
    //     // GrapesJS init options
    //     options={{
    //       height: '100vh',
    //       storageManager: false,
    //     }}
    //     onEditor={onEditor}
    //   />
    // );

  return <PageEditor />;
}
