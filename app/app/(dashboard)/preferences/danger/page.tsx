import prisma from "@/lib/prisma";
import Form from "@/components/form";
// import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { validateRequest } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { editUser } from "@/lib/actions";
import DeleteAccountForm from "@/components/form/delete-account-form";

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
      {/* <LeaveOrganizationForm
        title="Leave Organization"
        description="When you leave an organization, you must be invited back in."
        helpText={`Please enter your email "${data?.email}" to confirm..`}
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "Jane Doe",
          maxLength: 64,
        }}
        handleSubmit={editUser}
      /> */}

      <DeleteAccountForm email={data?.email!} />
    </div>
  );
}
