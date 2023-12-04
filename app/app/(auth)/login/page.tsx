import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import Logo from "@/res/logo.svg";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
      <Image
        className="mx-auto h-16 w-max"
        objectFit="cover"
        src={Logo}
        alt="ReRoto Logo"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Sign in to ReRoto
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Build and manage powerful news websites in minutes.
      </p>

      <div className="mx-auto mt-8 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton method="google" />
        </Suspense>
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton method="twitter" />
        </Suspense>
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton method="github" />
        </Suspense>
      </div>
    </div>
  );
}
