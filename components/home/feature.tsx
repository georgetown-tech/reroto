import { Editor as NovelEditor } from "novel";
import {
  AreaChart,
  BarList,
  Button,
  Bold,
  Card,
  Flex,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";
import * as React from "react";

export default function Feature({
  title,
  description,
  children,
  side,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  side: "left" | "right";
}) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div
        className={`mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:py-16 ${
          side == "left" ? "lg:flex-row" : "lg:flex-row-reverse"
        } lg:px-6 xl:gap-16`}
      >
        <div className="w-full">{children}</div>
        <div className="mt-4 w-full md:mt-0">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            {description}
          </p>
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Use cases
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
