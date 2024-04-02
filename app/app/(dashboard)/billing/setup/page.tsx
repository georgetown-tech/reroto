import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
import { Card } from "@/components/ui/card";
import { Tracker, type Color } from "@tremor/react";
import Form from "@/components/form";
import { updateSiteBilling } from "@/lib/actions";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export default async function SettingsBillingPage({
  params,
}: {
  params: { id: string };
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
  if (!site) {
    notFound();
  }

  const customer = await stripe.customers.retrieve(site.stripeId);

  console.log(customer);

  return (
    <div className="flex flex-col space-y-6">
      <Form
        siteId={user.siteId}
        title="Billing Email"
        description="The email where invoices are sent to."
        helpText="Choose an email that is accessible by many members of your organization."
        inputAttrs={{
          name: "email",
          type: "email",
          defaultValue: customer.email,
        }}
        handleSubmit={updateSiteBilling}
      />
      <Form
        siteId={user.siteId}
        title="Tax Address"
        description="The address that taxes are calculated based on."
        helpText="Choose the address where a majority of your business operations take place."
        inputAttrs={{
          name: "address",
          type: "address",
          defaultValue: customer.address,
        }}
        handleSubmit={updateSiteBilling}
      />
      <Form
        siteId={user.siteId}
        title="Phone Number"
        description="The phone number that we reach out to if there are billing issues."
        helpText="Choose a phone number that's accessible to many members of your organization."
        inputAttrs={{
          name: "phone",
          type: "text",
          defaultValue: customer.phone,
        }}
        handleSubmit={updateSiteBilling}
      />
    </div>
  );
}
