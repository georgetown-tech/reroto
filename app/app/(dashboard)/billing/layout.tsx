import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

import NavTab from "@/components/tab-nav";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";
import { Card } from "@/components/ui/card";
import { TextInput } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setupBilling } from "@/lib/actions";
import va from "@vercel/analytics";
// import router from "next/router";

const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

export default async function BillingLayout({
  children,
}: {
  children: ReactNode;
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

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const domain = data.customDomain
    ? data.customDomain
    : `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  // const { id } = useParams() as { id?: string };

  if (data.stripeId == null) {
    return (
      <form
        action={async (data: FormData) => {
          "use server";
          setupBilling(data, user.siteId, "").then(async (res: any) => {
            if (res.error) {
              toast.error(res.error);
            } else {
              // va.track(
              //   `Updated billing information`,
              //   user.siteId ? { siteId: user.siteId } : {},
              // );
              if (user.siteId) {
                // router.refresh();
              } else {
                // await update();
                // router.refresh();
              }
              toast.success(`Successfully updated billing information!`);
            }
          });
        }}
      >
        <div className="flex h-full items-center justify-center">
          <Card className="w-full max-w-lg space-y-2 p-4">
            <h1 className="font-cal text-3xl font-bold">Set Up Billing</h1>
            <p className="block pb-4">
              ReRoto uses Stripe to manage our invoicing system. Any and all
              correspondence from Stripe that bears ReRoto&apos;s name is fully
              authorized by Georgetown Disruptive Tech.
            </p>
            <TextInput placeholder="Address Line 1" />
            <TextInput placeholder="Address Line 2" />
            <TextInput placeholder="City" />
            <div className="flex flex-row gap-2">
              <TextInput placeholder="State" />
              <TextInput placeholder="Zip" />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Enable Invoices</Button>
            </div>
          </Card>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* <div className="flex items-center justify-center sm:justify-start"> */}
      <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
          Billing for {data.name}
        </h1>
        <a
          href={`https://${url}`}
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {url} ↗
        </a>
      </div>
      <div className="flex space-x-4 border-b border-stone-200 pb-4 pt-2 dark:border-stone-700">
        <NavTab
          navItems={[
            {
              name: "Overview",
              href: `/billing`,
              segment: null,
            },
            {
              name: "Revenue",
              href: `/billing/revenue`,
              segment: "revenue",
            },
            {
              name: "Invoices",
              href: `/billing/invoices`,
              segment: "invoices",
            },
            {
              name: "Setup",
              href: `/billing/history`,
              segment: "history",
            },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
