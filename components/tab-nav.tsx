// @ts-nocheck
"use client";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import { Post, Site } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TabView({
  navItems,
}: {
  navItems: Array<{ name: string; href: string; segment: string | null }>;
}) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "rounded-md px-2 py-1 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
            segment === item.segment
              ? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800",
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}
