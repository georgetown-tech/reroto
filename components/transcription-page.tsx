"use client";

// import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus, BadgeCheck, Play, Pause } from "lucide-react";
import BigProfile from "@/components/cards/big-profile";
import Image from "next/image";
import PostCard from "@/components/cards/post-card";
import TabView from "@/components/tab-view";
import useTranscription from "@/lib/hooks/use-transcription";
import { Transcription } from "@prisma/client";
import { useRef, useEffect } from "react";

export default function TranscriptionPage({
  transcript,
}: {
  transcript: Transcription;
}) {
  const [playing, toggle, time, setTime] = useTranscription(transcript!);

  return (
    <>
      <div className="flex items-center justify-center border-b sm:justify-start">
        <div className="mt-12 flex flex-row gap-2 py-4">
          <div className="flex content-center items-center">
            <button
              onClick={() => {
                // @ts-ignore
                toggle();
              }}
              className="aspect-square w-min rounded-full bg-primary p-4 text-white transition-shadow duration-300 hover:shadow-lg"
            >
              {playing ? <Pause /> : <Play />}
            </button>
          </div>
          <div>
            <h1 className="mt-4 font-cal text-xl font-bold dark:text-white sm:text-3xl">
              {transcript.name}
            </h1>
            <p className="flex flex-row gap-2 text-lg dark:text-white">
              {transcript?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-full p-3 text-lg">
          {// @ts-ignore
          transcript.transcription?.results?.channels[0].alternatives[0].words.map(
            (i: any, n: number) => (
              <button
                key={n}
                className={
                  time > i.start && time < i.end
                    ? "inline bg-primary-100"
                    : "inline bg-primary-50 hover:bg-primary-100"
                }
                onClick={() => {
                  // @ts-ignore
                  setTime(i.start);
                }}
              >
                {i.punctuated_word}&nbsp;
              </button>
            ),
          )}
        </div>
        <div className="w-1/3 border-l p-3">
          <h2 className="text-lg font-bold">Statistics</h2>
          <p>
            Word Count:{" "}
            {
              // @ts-ignore
              transcript.transcription?.results.channels[0].alternatives[0]
                .words.length
            }{" "}
            words
          </p>
          <p>
            Audio Length: {(transcript?.seconds || 0) / 60}m{" "}
            {(transcript?.seconds || 0) % 60}s
          </p>
        </div>
      </div>
    </>
  );
}
