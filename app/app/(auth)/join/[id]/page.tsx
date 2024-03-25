import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { notFound, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import prisma from "@/lib/prisma";
import AuthJoinForm from "@/components/form/auth-join-form";

export default async function Page({ params }: { params: { id: string } }) {
  const inviteData = await prisma.invite.findUnique({
    where: {
      id: params.id,
    },
    include: {
      creator: true,
      site: true,
    },
  });

  if (inviteData == null) return notFound();

  return (
    <div
      className="flex content-center items-center"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundImage: "url(" + inviteData.site?.image + ")",
        backgroundSize: "cover",
      }}
    >
      <Card className="mx-auto max-w-xl bg-white">
        <CardHeader>
          <div className="flex w-full flex-row gap-4">
            <div className="aspect-square w-16">
              <Image
                className="mb-4 w-full"
                width={512}
                height={512}
                src={inviteData.site?.logo || ""}
                alt={`Logo for ${inviteData.site?.name}`}
              />
            </div>
            <div className="w-full">
              <CardTitle>Join {inviteData.site?.name} on ReRoto</CardTitle>
              <CardDescription>
                By creating an account on ReRoto, you agree to the{" "}
                <Link
                  className="underline hover:no-underline"
                  href="https://reroto.com/terms"
                >
                  Terms and Conditions
                </Link>
                .
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <AuthJoinForm inviteData={inviteData} />
        </CardContent>
      </Card>
    </div>
  );
}
