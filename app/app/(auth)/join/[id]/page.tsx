import Image from "next/image";
// import LoginButton from "./login-button";
import { Suspense } from "react";
import Logo from "@/res/logo.svg";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MoveRight } from "lucide-react";
import JoinButton from "./join-button";
import crypto from "crypto";

export default async function LoginPage({
  params,
}: {
  params: { id: string };
}) {
  const invite = await prisma.invite.findUnique({
    where: {
      id: params.id,
    },
    include: {
      site: true,
      creator: true,
    },
  });

  if (invite == null) return notFound();

  const siteData = {
    banner: "https://reroto.com/main2.jpg",
  };

  const roleNames = [
    "an owner",
    "an admin",
    "a treasurer",
    "a designer",
    "an editor",
    "a writer",
    "a part-time writer",
  ];

  let hash = crypto
    .createHash("md5")
    .update(invite.email || "")
    .digest("hex");

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 flex content-center items-center"
      style={{
        background: `url(${invite?.site?.image})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
        backgroundSize: "20%",
      }}
    >
      <div className="mx-5 border border-stone-200 bg-white py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <img
            className="aspect-square h-12 rounded-full"
            // objectFit="cover"
            src={`https://gravatar.com/avatar/${hash}` || ""}
            alt="User Icon"
          />
          <MoveRight />
          <img
            className="aspect-square h-12 rounded"
            // objectFit="cover"
            src={invite.site?.logo || ""}
            alt="User Icon"
          />
        </div>
        <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
          Join {invite?.site?.name}
        </h1>
        <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
          You were invited as {roleNames[invite?.role || 0]} by{" "}
          {invite?.creator?.name}.
        </p>

        <div className="mx-auto mt-8 w-11/12 max-w-xs sm:w-full">
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <JoinButton method="google" />
          </Suspense>
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <JoinButton method="twitter" />
          </Suspense>
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <JoinButton method="github" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
