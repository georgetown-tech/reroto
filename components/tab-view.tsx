// @ts-nocheck
"use client";

import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, random } from "@/lib/utils";
import { Post, Site } from "@prisma/client";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TabView({
  tabLabels,
  tabContents,
}: {
  tabLabels: Array<string>;
  tabContents: Array<ReactElement>;
}) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <div>
        <div className="sm:hidden">
          <label for="Tab" className="sr-only">
            Tab
          </label>

          <select onChange={(e) => {

            setIndex(e.target.value);

          }} id="Tab" className="w-full rounded-md border-gray-200">
            {
              tabLabels.map((i, n) => (
                <option key={n} value={n} selected={n == index ? true : false}>{i}</option>
              ))
            }
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              {tabLabels.map((i, n) => (
                <button
                  key={n}
                  onClick={() => {
                    setIndex(n);
                  }}
                  className={
                    n == index
                      ? "shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600"
                      : "shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }
                >
                  {i}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {tabContents[index]}
    </>
  );
}
