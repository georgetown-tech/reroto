"use client";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./logout-button";
import { Pause, Play } from "lucide-react";
import { Media } from "@prisma/client";
import MediaPreview from "./media-preview";

export default function MediaCard({ media }: { media: Media }) {
  return (
    <div className="flex w-full flex-row items-center space-x-3 rounded-lg border-dashed px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
      <Link className="flex w-full flex-col" href={`/media/${media.id}`}>
        <MediaPreview url={media.url} mime={media.mime} />
        <span className="mt-4 w-full truncate text-center font-medium">
          {media.name}
        </span>
      </Link>
    </div>
  );
}
