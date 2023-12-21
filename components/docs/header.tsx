"use client"
import * as React from "react";
import Logo from "../../res/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Search } from "lucide-react"

export default function Header({}) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <header aria-label="Site Header" className="shadow-sm print:hidden bg-white dark:bg-slate-800">
      <div className="flew-row mx-auto flex gap-4 px-2">
        <div className="flex items-center justify-center">
          <Link
            // activeClassName="m-0 p-0 mr-4"
            className="m-0 mr-4 p-0"
            href="https://reroto.com"
          >
            <Image
              objectFit="cover"
              className="h-16 w-max"
              src={Logo}
              alt="ReRoto Logo"
            />
          </Link>
        </div>
        <div className="w-full p-2 flex items-center justify-center">
          <div className="border border-gray-200 rounded-xl w-full max-w-sm overflow-hidden flex flex-row items-center justify-center">
            <Search size={18} className="ml-3 text-gray-500" />
            <input className="w-full px-2 py-2 border-0 font-light" placeholder="Search docs..." />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 lg:gap-10">
          <nav
            aria-label="Site Nav"
            className="items-between flex w-full gap-4 text-sm font-medium md:gap-8"
          >
            <button
                onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
                className='bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800'>
                Toggle Mode
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
