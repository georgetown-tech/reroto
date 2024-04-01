import prisma from "@/lib/prisma";
import Form from "@/components/form";
// import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { validateRequest } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { editUser } from "@/lib/actions";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // if (!data) {
  //   notFound();
  // }

  return (
    <div className="flex flex-col space-y-6">
      <Form
        siteId={user.siteId}
        title="Display Name"
        description="Your full name so your readers can trust who they are reading."
        helpText="Please use 64 character maximum."
        inputAttrs={{
          name: "displayName",
          type: "text",
          defaultValue: data?.displayName!,
          placeholder: "Jane Doe",
          maxLength: 64,
        }}
        handleSubmit={editUser}
      />

      <Form
        siteId={user.siteId}
        title="Profile Image"
        description="Your profile picture. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 400x400."
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.image!,
        }}
        handleSubmit={editUser}
      />
      <Form
        siteId={user.siteId}
        title="Description"
        description="A description of what you do and write about. Tell us a bit about yourself."
        helpText="You can include keywords to help people find you on Google."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A really, really nice person.",
        }}
        handleSubmit={editUser}
      />

      {/* <DeleteSiteForm siteName={data?.name!} /> */}
    </div>
  );
}
