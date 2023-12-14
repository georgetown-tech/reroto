import prisma from "@/lib/prisma";
import Form from "@/components/form";
// import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  console.log(data);

  // if (!data) {
  //   notFound();
  // }

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Display Name"
        description="Your full legal name. This is what we will use for your individual page."
        helpText="Please use 64 character maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "Jane Doe",
          maxLength: 32,
        }}
        handleSubmit={() => {}}
      />
{/* 
      <Form
        title="Description"
        description="A description of what you do and write about. Tell us a bit about yourself."
        helpText="You can include keywords to help people find you on Google."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A really, really nice person.",
        }}
        handleSubmit={updateSite}
      /> */}

      {/* <DeleteSiteForm siteName={data?.name!} /> */}
    </div>
  );
}
