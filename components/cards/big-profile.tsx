import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "../logout-button";
import { MessagesSquare, MoreHorizontal, Pencil } from "lucide-react";
import { User } from "@prisma/client";

export interface CardUserData {
  displayName: string | null;
  email: string | null;
  image: string | null;
  role: number | null;
  id: string;
}

export default async function BigProfile({ user }: { user: CardUserData }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg px-2 transition-all duration-150 ease-in-out hover:bg-stone-50 active:bg-stone-100 dark:text-white dark:hover:bg-stone-900 dark:active:bg-stone-950">
      <Link
        href={`/team/${user.id}`}
        className="flex w-full flex-1 items-center space-x-3 px-2 py-1.5"
      >
        <Image
          src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
          width={80}
          height={80}
          alt={user.displayName ?? "User avatar"}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="truncate font-medium">{user.displayName}</span>
          <span className="truncate text-sm font-medium text-gray-500">
            {[
              "Owner",
              "Admin",
              "Treasurer",
              "Designer",
              "Editor",
              "Writer",
              "Part-Time Writer",
            ][user.role == null ? 0 : user.role] || "Unknown Role"}
          </span>
        </div>
      </Link>
      {/* TODO: Implement quick edit for admins. */}
      <Button variant="outline" size="icon" disabled>
        <Pencil />
      </Button>
      {/* TODO: Implement chats. */}
      <Button variant="outline" size="icon" disabled>
        <MessagesSquare />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" disabled>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              Articles
              {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              Statistics
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Manage
              {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>Quick Chat</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Group Chats</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled>Create New Chat</DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    Find Existing Chats
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Website Page</DropdownMenuItem>
          <DropdownMenuItem>Change Role</DropdownMenuItem>
          <DropdownMenuItem>Delete User</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
