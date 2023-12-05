import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./logout-button";

export default async function TranscriptionCard({
  transcription,
}: {
  transcription: any;
}) {
  return <></>;

  // return (
  //   <div className="flex w-full items-center justify-between">
  //     <Link
  //       href={`/team/${user.id}`}
  //       className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
  //     >
  //       <Image
  //         src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
  //         width={80}
  //         height={80}
  //         alt={user.name ?? "User avatar"}
  //         className="h-12 w-12 rounded-full"
  //       />
  //       <div className="flex flex-col">
  //         <span className="truncate font-medium">{user.name}</span>
  //         <span className="truncate text-sm font-medium text-gray-500">
  //           {[
  //             "Owner",
  //             "Admin",
  //             "Treasurer",
  //             "Designer",
  //             "Editor",
  //             "Writer",
  //             "Part-Time Writer",
  //           ][user.role] || "Unknown Role"}
  //         </span>
  //       </div>
  //     </Link>
  //   </div>
  // );
}
