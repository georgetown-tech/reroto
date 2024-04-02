import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSiteAppearance } from "@/lib/actions";
import { validateRequest } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function SiteSettingsAppearance({
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

  const design = (data?.siteData as any)?.design || {};

  return (
    <div className="flex flex-col space-y-6">
      <Form
        siteId={user.siteId}
        title="Primary Brand Color"
        description="The primary color for your brand. Typically the color used in your full-color logo."
        helpText="Open your logo in another tab and use the eyedropper tool to select a color."
        inputAttrs={{
          name: "primary_color",
          type: "color",
          defaultValue: design["primary_color"] || "#ED6A5A",
        }}
        handleSubmit={updateSiteAppearance}
      />
      <Form
        siteId={user.siteId}
        title="Secondary Brand Color"
        description="The secondary color for your brand. Typically the color used in your alternate-color logo."
        helpText="Open your logo in another tab and use the eyedropper tool to select a color."
        inputAttrs={{
          name: "secondary_color",
          type: "color",
          defaultValue: design["secondary_color"] || "#9BC1BC",
        }}
        handleSubmit={updateSiteAppearance}
      />
      <Form
        siteId={user.siteId}
        title="Brand White Color"
        description="The white color for your brand. Typically the color used in your light logo."
        helpText="Open your logo in another tab and use the eyedropper tool to select a color."
        inputAttrs={{
          name: "white_color",
          type: "color",
          defaultValue: design["white_color"] || "#F4F1BB",
        }}
        handleSubmit={updateSiteAppearance}
      />
      <Form
        siteId={user.siteId}
        title="Brand Black Color"
        description="The black color for your brand. Typically the color used in your dark logo."
        helpText="Open your logo in another tab and use the eyedropper tool to select a color."
        inputAttrs={{
          name: "black_color",
          type: "color",
          defaultValue: design["black_color"] || "#5D576B",
        }}
        handleSubmit={updateSiteAppearance}
      />
    </div>
  );
}
