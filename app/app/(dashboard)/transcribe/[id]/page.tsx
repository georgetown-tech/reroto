import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Search, Plus, BadgeCheck, Play, Pause } from "lucide-react";
import BigProfile from "@/components/cards/big-profile";
import Image from "next/image";
import PostCard from "@/components/cards/post-card";
import TabView from "@/components/tab-view";
import useTranscription from "@/lib/hooks/use-transcription";
import TranscriptionPage from "@/components/transcription-page";

export default async function TranscriptionPageServer({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  const transcript = await prisma.transcription.findUnique({
    where: {
      id: params.id,
    },
  });

  if (transcript == null) notFound();

  return <TranscriptionPage transcript={transcript} />;
}
