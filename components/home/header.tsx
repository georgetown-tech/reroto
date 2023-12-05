import * as React from "react";
import Logo from "../../res/logo.svg";
import Link from "next/link";
import Image from "next/image";

export default function Header({}) {
  return (
    <header aria-label="Site Header" className="shadow-sm print:hidden">
      <div className="flew-row mx-auto flex max-w-screen-lg gap-4 p-0">
        <div className="flex items-center justify-center">
          <Link
            // activeClassName="m-0 p-0 mr-4"
            className="m-0 mr-4 p-0"
            href="/"
          >
            <Image
              objectFit="cover"
              className="h-20 w-max"
              src={Logo}
              alt="ReRoto Logo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 lg:gap-10">
          <nav
            aria-label="Site Nav"
            className="items-between flex w-full gap-4 text-sm font-medium md:gap-8"
          >
            <Link className="text-gray-500 no-underline" href="/features">
              Features
            </Link>
            <Link className="text-gray-500 no-underline" href="/blog">
              Blog
            </Link>
            <Link className="text-gray-500 no-underline" href="/pricing">
              Pricing
            </Link>
            {/* <Link className="text-gray-500 no-underline" to="/contact">Contact</Link> */}
          </nav>
        </div>
        <div className="w-full"></div>
        <div className="flex items-center justify-center gap-4 lg:gap-10">
          <nav
            aria-label="Site Nav"
            className="items-between flex w-full gap-4 text-sm font-medium md:gap-8"
          >
            <Link
              className="whitespace-nowrap rounded bg-primary p-3 px-8 font-bold text-white no-underline"
              // activeClassName="whitespace-nowrap"
              href="http://app.localhost:3000/login"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
