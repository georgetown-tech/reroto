import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import HoyaLogo from "@/res/hoya.svg";
import {
  Pen,
  Users,
  Focus,
  FolderKanban,
  Paintbrush,
  SearchCode,
} from "lucide-react";

// import {StlViewer} from "react-stl-viewer";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export default async function IndexPage({}) {
  const monthDate = new Date();
  monthDate.setDate(0);
  monthDate.setDate(1);

  const articleCount = await prisma.post.count();
  const monthlyCount = await prisma.post.count({
    where: {
      createdAt: {
        gte: monthDate,
      },
    },
  });
  const siteCount = await prisma.site.count();
  const sites = await prisma.site.findMany({
    take: 3,
  });

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <a
            href="/features"
            className="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="mr-3 rounded-full bg-primary-600 px-4 py-1.5 text-xs text-white">
              New
            </span>
            <span className="text-sm font-medium">
              ReRoto is out! See what&apos;s new
            </span>
            <svg
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Elevate Your Newsroom Efficiency
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            Discover seamless collaboration, streamlined workflows, and
            unparalleled editorial control&mdash; ReRoto CMS, empowering your
            newsroom.
          </p>
          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Learn more
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
            {/* <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              Watch video
            </a> */}
          </div>
          <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold uppercase text-gray-400">
              Used Daily By
            </span>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-gray-500 sm:justify-center">
              {sites.map((i, n) => (
                <a
                  key={n}
                  href={
                    i.customDomain == null
                      ? `https://${i.subdomain}.reroto.com/`
                      : `https://${i.customDomain}`
                  }
                  className="mb-5 mr-5 w-max hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0"
                >
                  <img
                    className="h-12 opacity-60 grayscale hover:opacity-80"
                    src={i.logo}
                    alt={i.name}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
          <div className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Crafted by Peers, Designed for You
            </h2>
            <p className="mb-4">
              We understand the challenges of college newspapers because
              we&apos;ve lived them. With ReRoto, experience a platform that
              resonates with your needs, streamlining workflows, enhancing
              collaboration, and empowering your editorial vision. It&apos;s
              more than software; it&apos;s a supportive ally crafted by people
              who truly get it&mdash; ensuring your success in the vibrant world
              of campus journalism.
            </p>
            <p>
              We are a humble group of writers, programmers, and artists.
              Students and teachers. Small enough to be simple and quick.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <img
              className="w-full rounded-lg opacity-80"
              src="/main2.jpg"
              alt="Georgetown University Healy Statue"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="/main1.png"
              alt="Georgetown Disruptive Tech Meeting #1"
            />
          </div>
        </div>
      </section>
      <section id="features" className="mb-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="mb-8 max-w-screen-md lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Built for newspapers like yours
            </h2>
            <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
              Here at ReRoto we build systems where technology can enhance your
              writer&apos;s experiences and grow your audience, all while
              lowering costs.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <Pen
                  width={20}
                  className="h-5 w-5 text-primary-600 dark:text-primary-300 lg:h-6 lg:w-6"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Easy Writing Tools
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Craft articles effortlessly with AI-powered editing, seamless
                image integration, versioned collaboration, and automatic
                saving.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <Users
                  width={20}
                  className="h-5 w-5 text-primary-600 dark:text-primary-300 lg:h-6 lg:w-6"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Know Your Readers
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Discover detailed insights on your readership: who they are,
                where they&apos;re from, and what stories resonate the most.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <Focus
                  width={20}
                  className="h-5 w-5 text-primary-600 dark:text-primary-300 lg:h-6 lg:w-6"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Picture Perfect
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Effortlessly access a diverse image library, including
                contributions from your photographers, while ensuring copyright
                compliance.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <FolderKanban
                  width={20}
                  className="h-5 w-5 text-primary-600 dark:text-primary-300 lg:h-6 lg:w-6"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Teams & Scheduling
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Streamline teamwork with a searchable teammate directory and a
                powerful planning system for scheduling hundreds of writers.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <Paintbrush
                  width={20}
                  className="h-5 w-5 text-primary-600 dark:text-primary-300 lg:h-6 lg:w-6"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Design & Customization
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Craft stunning pages, customize branding, and personalize your
                newspaper with easy drag-and-drop tools.
              </p>
            </div>
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <SearchCode
                  width={20}
                  className="h-5 w-5 text-primary-600 dark:text-primary-300 lg:h-6 lg:w-6"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Boost Your Visibility
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Maximize visibility with integrated SEO tools and optimizations
                to elevate your website&apos;s search ranking effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary p-4">
        <div className="mx-auto flex max-w-3xl flex-row justify-between">
          <div className="flex flex-col items-center">
            <h2 className="font-bold uppercase text-white">In 2023</h2>
            <p className="text-4xl font-black text-white">
              {articleCount.toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 1,
                minimumFractionDigits: 0,
                useGrouping: true,
                notation: "compact",
              })}
            </p>
            <p className="font-bold uppercase text-white">Articles On ReRoto</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-bold uppercase text-white">Every Month</h2>
            <p className="text-4xl font-black text-white">
              {monthlyCount.toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 1,
                minimumFractionDigits: 0,
                useGrouping: true,
                notation: "compact",
              })}
            </p>
            <p className="font-bold uppercase text-white">New Articles Added</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-bold uppercase text-white">Trusted By</h2>
            <p className="text-4xl font-black text-white">
              {siteCount.toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 1,
                minimumFractionDigits: 0,
                useGrouping: true,
                notation: "compact",
              })}
            </p>
            <p className="font-bold uppercase text-white">Newspapers</p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <Image className="mx-auto h-12" src={HoyaLogo} width={200} alt="" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                expedita voluptas culpa sapiente alias molestiae. Numquam
                corrupti in laborum sed rerum et corporis.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Chris Delaney</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">Chief Technical Officer</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section>
        <hr />
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-48">
          <h2 className="mb-8 text-2xl font-extrabold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="flow-root">
            <div className="-my-8 divide-y divide-gray-100">
              {[
                {
                  question:
                    "Will ReRoto continue to get updated on a consistent basis?",
                  answer:
                    "We understand that an important aspect in choosing a CMS is that it will be updated consistently. Because of this, we have a public roadmap of new features that we are looking to add to ReRoto, as well as the dates when they will be implemented.",
                },
              ].map((data, i) => (
                <details
                  key={i}
                  className="group py-8 [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between text-gray-900">
                    <h2 className="text-lg font-medium">{data.question}</h2>

                    <span className="relative h-5 w-5 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    {data.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
