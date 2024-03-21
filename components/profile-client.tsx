import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./logout-button";

export default async function Profile({
  className,
  canAccess = true,
}: {
  className: string;
  canAccess: boolean;
}) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className={`flex w-full items-center justify-between ${className}`}>
      <Link
        href={canAccess ? "/preferences" : "#"}
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
          width={40}
          height={40}
          alt={user.displayName ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">{user.displayName}</span>
      </Link>
      <LogoutButton />
    </div>
  );
}
