"use client";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./logout-button";
import { Pause, File } from "lucide-react";

export default function MediaPreview({
  url,
  mime,
}: {
  url: string | null;
  mime: string | null;
}) {
  const fileExtension = url?.split(".")[url?.split(".").length - 1];

  if (url == null || mime == null) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="flex aspect-square w-32 flex-col items-center justify-center gap-2 rounded border bg-white shadow">
          <File color="black" size={48} />
          <span className="text-lg font-bold uppercase text-black">?</span>
        </div>
      </div>
    );
  }

  if (mime?.toUpperCase().startsWith("VIDEO")) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex aspect-square w-32 flex-col items-center justify-center gap-2 overflow-hidden rounded">
          <video className="h-full w-full  ">
            <source src={url} type={mime} />
          </video>
        </div>
      </div>
    );
  }

  if (mime?.toUpperCase().startsWith("AUDIO")) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex aspect-square w-32 flex-col items-center justify-center gap-2">
          <audio className="block h-full w-full" controls>
            <source src={url} type={mime} />
          </audio>
        </div>
      </div>
    );
  }
  if (mime?.toUpperCase().startsWith("IMAGE")) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex aspect-square w-32 flex-col items-center justify-center gap-2">
          <img className="h-full w-full" src={url} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex aspect-square w-32 flex-col items-center justify-center gap-2 rounded border bg-white shadow">
        <File color="black" size={48} />
        <span className="text-lg font-bold uppercase text-black">
          .{fileExtension}
        </span>
      </div>
    </div>
  );
}
