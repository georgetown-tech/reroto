"use client";

import Image from "next/image";
import Link from "next/link";
// import LoginButton from "./login-button";
import { Suspense, useState } from "react";
import Logo from "@/res/logo.svg";
import Loading from "@/components/icons/loading-circle.tsx";

import { createSite } from "@/lib/actions";

export default function LoginPage() {
  const [index, setIndex] = useState(0);
  const [siteType, setSiteType] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  async function createWebsite() {
    let form = new FormData();

    form.append("type", siteType);
    form.append("name", siteName);
    form.append(
      "subdomain",
      siteName
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^a-z\-]/g, ""),
    );
    form.append("description", siteDescription);

    const result = await createSite(form);

    console.log(result);

    setIndex(4);
  }

  const pages = [
    <div
      key="0"
      className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md"
    >
      <Image
        className="mx-auto h-16 w-max"
        objectFit="cover"
        src={Logo}
        alt="ReRoto Logo"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Create a New Site.
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        How would you describe your current organization?
      </p>
      <div className="mt-8 flex flex-col gap-2 p-4">
        <button
          onClick={() => {
            setSiteType("college");
            setIndex(1);
          }}
          className="w-full rounded border p-2 text-center"
        >
          College Newspaper
        </button>
        <button
          onClick={() => {
            setSiteType("professional");
            setIndex(1);
          }}
          className="w-full rounded border p-2 text-center"
        >
          Professional Newspaper
        </button>
        <button
          onClick={() => {
            setSiteType("enterprise");
            setIndex(1);
          }}
          className="w-full rounded border p-2 text-center"
        >
          Enterprise Newspaper
        </button>
      </div>
    </div>,
    <div
      key="1"
      className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md"
    >
      <Image
        className="mx-auto h-16 w-max"
        objectFit="cover"
        src={Logo}
        alt="ReRoto Logo"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        What is the Website Name?
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        The best is something short and descriptive.
      </p>
      <div className="mt-8 flex flex-col gap-2 px-4">
        <input
          value={siteName}
          onChange={(e) => {
            setSiteName(e.target.value);
          }}
          className="w-full rounded border p-2 text-lg font-bold"
          type="text"
        />
        <button
          onClick={() => {
            setIndex(2);
          }}
          className="bg-primary w-full rounded  p-2 text-center font-bold text-white"
        >
          Next Up!
        </button>
      </div>
    </div>,
    <div
      key="2"
      className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md"
    >
      <Image
        className="mx-auto h-16 w-max"
        objectFit="cover"
        src={Logo}
        alt="ReRoto Logo"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Describe the Website!
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Tell us the core focus of your site.
      </p>
      <div className="mt-8 flex flex-col gap-2 px-4">
        <input
          value={siteDescription}
          onChange={(e) => {
            setSiteDescription(e.target.value);
          }}
          className="w-full rounded border p-2 text-lg font-bold"
          type="text"
        />
        <button
          onClick={() => {
            setIndex(3);
            createWebsite();
          }}
          className="bg-primary w-full rounded p-2 text-center font-bold text-white"
        >
          What&apos;s next?
        </button>
      </div>
    </div>,
    <div
      key="3"
      className="align-center flex flex-col content-center items-center justify-center gap-4"
    >
      <Loading dimensions="h-8 w-8" />
    </div>,
    <div
      key="4"
      className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md"
    >
      <Image
        className="mx-auto h-16 w-max"
        objectFit="cover"
        src={Logo}
        alt="ReRoto Logo"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Your Website is Ready!
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Just click below to start your ReRoto journey.
      </p>
      <div className="mt-8 flex flex-col gap-2 px-4">
        <Link
          href="/"
          className="bg-primary w-full rounded p-2 text-center font-bold text-white"
        >
          Check It Out
        </Link>
      </div>
    </div>,
  ];

  return pages[index];
}
