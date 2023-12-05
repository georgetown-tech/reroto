"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";
import { Plus } from "lucide-react";

export default function AddTranscriptionButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <button
      onClick={() => modal?.show(children)}
      className="flex items-center justify-center gap-1 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      <Plus size={18} />
      Add Transcription
    </button>
  );
}
