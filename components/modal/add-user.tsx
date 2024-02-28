"use client";

import { toast } from "sonner";
import { inviteTeammate } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";

export default function CreateTeammateModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState({
    name: "",
    subdomain: "",
    description: "",
    email: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  return (
    <form
      action={async (data: FormData) =>
        inviteTeammate(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Invited User");
            const { id } = res;
            router.refresh();
            router.push(`/team`);
            modal?.hide();
            toast.success(`Successfully invited teammate!`);
          }
        })
      }
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">Invite Teammate</h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="subdomain"
            className="text-sm font-medium text-stone-500"
          >
            Email
          </label>
          <div className="flex w-full max-w-md">
            <input
              name="email"
              type="email"
              placeholder="jane.doe@reroto.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              autoCapitalize="off"
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="role" className="text-sm font-medium text-stone-500">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4
          py-2 text-sm text-stone-600 placeholder:text-stone-400
          focus:border-black focus:outline-none focus:ring-black
          dark:border-stone-600 dark:bg-black dark:text-white
          dark:placeholder-stone-700 dark:focus:ring-white"
          >
            <option value="1">Admin</option>
            <option value="2">Treasurer</option>
            <option value="3">Designer</option>
            <option value="4">Editor</option>
            <option value="5">Writer</option>
            <option value="6">Part-time Writer</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <AddTeammateFormButton />
      </div>
    </form>
  );
}
function AddTeammateFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Send Invite</p>}
    </button>
  );
}
