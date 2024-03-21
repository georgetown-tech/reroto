// @ts-nocheck

import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import { getSession, validateRequest } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";

import TransferForm from "@/components/transfer-form";

export default async function SiteSettingsDomains({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  return <></>;
  // return <TransferForm siteId={session?.user?.siteId || ""} />;
}
