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
import LogoutButton from "./logout-button";
import { MessagesSquare, MoreHorizontal, Pencil } from "lucide-react";
import { User } from "@prisma/client";

export default async function InvoiceCard({ invoice }: { invoice: any }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg px-2 transition-all duration-150 ease-in-out hover:bg-stone-50 active:bg-stone-100 dark:text-white dark:hover:bg-stone-900 dark:active:bg-stone-950">
      <Link
        href={`${invoice.hosted_invoice_url}`}
        className="flex w-full flex-1 items-center gap-4 space-x-3 px-2 py-1.5"
      >
        <div className="flex flex-col items-center">
          <span className="truncate text-xl font-medium text-red-500">
            ${invoice.amount_due.toFixed(2)}
          </span>
          <span className="truncate text-lg font-medium text-green-500">
            -${invoice.amount_paid.toFixed(2)}
          </span>
        </div>
        <div className="w-full">
          <span className="truncate text-2xl font-medium">
            {invoice.description || "Unlabeled invoice."}
          </span>
        </div>
        <div>
          <span className="truncate text-lg font-medium">
            {new Date(invoice.created * 1000).getDate()}/
            {new Date(invoice.created * 1000).getMonth() + 1}/
            {new Date(invoice.created * 1000).getFullYear()}
          </span>
        </div>
      </Link>
    </div>
  );
}
