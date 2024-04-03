"use client";

import { useTransition } from "react";
import { createPost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
import { Plus } from "lucide-react";

export default function CreatePostButton({ id }: { id: any }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const post = await createPost(null, id, null);
          va.track("Created Post");
          router.refresh();
          router.push(`/posts/${post.id}`);
        })
      }
      className={cn(
        "flex h-8 w-40 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
        isPending
          ? "cursor-not-allowed border-primary-200 bg-primary-100 text-primary-400 dark:border-primary-700 dark:bg-primary-800 dark:text-primary-300"
          : "border border-primary bg-primary text-white hover:bg-white hover:text-primary active:bg-primary-100 dark:border-primary-700 dark:hover:border-primary-200 dark:hover:bg-primary dark:hover:text-white dark:active:bg-primary-800",
      )}
      disabled={isPending}
    >
      {isPending ? (
        <LoadingDots color="#808080" />
      ) : (
        <p className="block flex flex-row items-center justify-center gap-1 whitespace-nowrap">
          <Plus size={18} />
          Create New Post
        </p>
      )}
    </button>
  );
}
