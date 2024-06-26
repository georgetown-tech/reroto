import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { validateRequest } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function SiteSettingsIndex({
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

  // console.log(data);

  // if (!data) {
  //   notFound();
  // }

  return (
    <div className="flex flex-col space-y-6">
      <Form
        siteId={user.siteId}
        title="Name"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Site",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        siteId={user.siteId}
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
