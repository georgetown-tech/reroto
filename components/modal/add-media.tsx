"use client";

import { toast } from "sonner";
import { createMedia } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import AudioUploader from "../audio-uploader";
import { useEffect, useState } from "react";
import FileUploader from "../file-uploader";

export default function CreateMediaModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const [url, setUrl] = useState<string>("");

  return (
    <form
      action={async (data: FormData) =>
        createMedia(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Uploaded Media");
            const { id } = res;
            modal?.hide();
            router.refresh();
            router.push(`/transcribe/${id}`);
            toast.success(`Media Uploaded.`);
          }
        })
      }
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">Upload Media</h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Upload Any File You Would Like...
          </label>
          <FileUploader url={url} setUrl={setUrl} />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <AddMediaFormButton disabled={url == ""} />
      </div>
    </form>
  );
}

function AddMediaFormButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none disabled:opacity-60",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending || disabled}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Upload Media</p>}
    </button>
  );
}
