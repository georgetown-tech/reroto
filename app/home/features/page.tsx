"use client";

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

const users = [
  {
    name: "Conor McFlow",
    role: "Editor",
    nextArticle: "1d",
    articleCount: 41,
  },
  {
    name: "Lena Mayer",
    role: "Treasurer",
    nextArticle: "3d",
    articleCount: 5,
  },
  {
    name: "Paul String",
    role: "Designer",
    nextArticle: "now",
    articleCount: 8,
  },
  {
    name: "John Done",
    role: "Writer",
    nextArticle: "3hr",
    articleCount: 21,
  },
  {
    name: "Donald Blake",
    role: "Editor",
    nextArticle: "4hr",
    articleCount: 15,
  },
];

const chartdata = [
  {
    date: "Jan 23",
    Visitors: 2890,
    Advertisements: 2890 * 0.32,
    Memberships: 389 * 5,
  },
  {
    date: "Feb 23",
    Visitors: 2756,
    Advertisements: 2756 * 0.42,
    Memberships: 432 * 5,
  },
  {
    date: "Mar 23",
    Visitors: 3322,
    Advertisements: 3322 * 0.35,
    Memberships: 408 * 5,
  },
  {
    date: "Apr 23",
    Visitors: 3470,
    Advertisements: 3470 * 0.38,
    Memberships: 438 * 5,
  },
  {
    date: "May 23",
    Visitors: 3475,
    Advertisements: 3475 * 0.35,
    Memberships: 452 * 5,
  },
  {
    date: "Jun 23",
    Visitors: 3129,
    Advertisements: 3129 * 0.42,
    Memberships: 472 * 5,
  },
].map((i) => {
  return { ...i, Revenue: i.Advertisements + i.Memberships };
});

export default function ContactPage({}) {
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:py-32 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h2 class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              What does ReRoto Have to Offer?
            </h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Try the ReRoto&apos;s free plan with no credit card required.
            </p>
            <a
              href="/pricing"
              class="mb-2 mr-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              See Pricing Plans
            </a>
          </div>
        </div>
      </section>
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <div>
            <Card>
              <Title>Visitors in the Last Six Months</Title>
              <AreaChart
                className="mt-4 h-72"
                data={chartdata}
                index="date"
                categories={["Visitors"]}
                colors={["indigo"]}
              />
            </Card>
          </div>
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Real-Time Analytics and Insights
            </h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Understanding reader engagement and article performance is crucial
              for optimizing content strategies. ReRoto provides a custom
              analytics platform powered by the cloud, offering in-depth
              insights into audience behavior and article impact.
            </p>
            <a
              href="#"
              class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Use cases
              <svg
                class="-mr-1 ml-2 h-5 w-5"
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
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Advertisements and Subscriptions
            </h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Monetization is integral to sustaining a newspaper&apos;s
              operations. ReRoto offers comprehensive support for both
              advertisement integration and subscription management,
              facilitating revenue generation and content monetization
              strategies.
            </p>
            <a
              href="#"
              class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Use cases
              <svg
                class="-mr-1 ml-2 h-5 w-5"
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
          <div>
            <Card>
              <Title>Earnings for the Last Six Months</Title>
              <AreaChart
                className="mt-4 h-72"
                data={chartdata}
                index="date"
                categories={["Revenue", "Memberships", "Advertisements"]}
                colors={["green", "blue", "pink"]}
                valueFormatter={(number: number) =>
                  Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                    .format(number)
                    .toString()
                }
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Second Two Sections */}
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <div>
            <Card>
              {/* <Title>Teammates for The West Coast Tribune</Title> */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>User</TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Role
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Due Date
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Article #
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">
                        <Text>{item.role}</Text>
                      </TableCell>
                      <TableCell className="text-right">
                        <Text>{item.nextArticle}</Text>
                      </TableCell>
                      <TableCell className="text-right">
                        <Text>{item.articleCount}</Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Team & Workflow Management
            </h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              At ReRoto, we focus on making it easy for editorial teams to work
              together smoothly. Our system ensures safety with logins, gives
              different permissions based on roles, and helps manage tasks
              effectively. It&apos;s all about better teamwork and getting
              things done efficiently.
            </p>
            <a
              href="#"
              class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Use cases
              <svg
                class="-mr-1 ml-2 h-5 w-5"
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
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Simplified Writing Experience
            </h2>
            <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              ReRoto simplifies content creation with an intuitive editor for
              easy writing and publishing. Collaborative editing allows editors
              to work together on the same article with version Control to track
              changes. To manage the collaboration, our content calendar enables
              visually scheduling articles.
            </p>
            <a
              href="#"
              class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Use cases
              <svg
                class="-mr-1 ml-2 h-5 w-5"
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
          <div>
            <Card>
              <NovelEditor
                completionApi={false}
                className="relative block"
                defaultValue={
                  "### Simple Editing\n\nClick here to see how easy it is to start editing. You can even drag images in or copy and paste them instantly. This demo does not show off our AI-autocompletion."
                }
                // onUpdate={(editor) => {
                //   setData((prev) => ({
                //     ...prev,
                //     content: editor?.storage.markdown.getMarkdown(),
                //   }));
                // }}
                // onDebouncedUpdate={() => {
                //   if (
                //     data.title === post.title &&
                //     data.description === post.description &&
                //     data.content === post.content
                //   ) {
                //     return;
                //   }
                //   startTransitionSaving(async () => {
                //     await updatePost(data);
                //   });
                // }}
              />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
