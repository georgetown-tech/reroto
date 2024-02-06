"use client";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./logout-button";
import useTranscription from "@/lib/hooks/use-transcription";
import { Pause, Play } from "lucide-react";

export default function TranscriptionCard({
  transcription,
}: {
  transcription: any;
}) {
  const [playing, toggle] = useTranscription(transcription!);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full flex-row items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800">
        <button
          onClick={() => {
            // @ts-ignore
            toggle();
          }}
          className="aspect-square w-min rounded-full bg-primary p-4 text-white transition-shadow duration-300 hover:shadow-lg"
        >
          {playing ? <Pause /> : <Play />}
        </button>
        <Link
          className="flex w-full flex-col"
          href={`/transcribe/${transcription.id}`}
        >
          <span className="truncate font-medium">{transcription.name}</span>
          <span className="truncate text-sm font-medium text-gray-500">
            {transcription.description}
          </span>
        </Link>
      </div>
    </div>
  );
}
