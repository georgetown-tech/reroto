import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import PostCard from "./cards/post-card";
import Image from "next/image";

export default async function Posts({
  siteId,
  limit,
  subdomain,
}: {
  siteId?: string;
  limit?: number;
  subdomain?: string;
}) {
  return <></>;
}
