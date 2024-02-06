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
  Check,
  X,
} from "lucide-react";

// import {StlViewer} from "react-stl-viewer";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export default async function IndexPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams == undefined || searchParams.domain == undefined)
    return (
      <form
        action="/estimate"
        method="GET"
        className="flex h-screen w-screen flex-col items-center justify-center gap-2"
      >
        <div className="w-80">
          <label
            htmlFor="domain"
            className="block text-xs font-medium text-gray-700"
          >
            Domain
          </label>

          <input
            type="text"
            name="domain"
            placeholder="thehoya.com"
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>
        <input
          className="inline-block w-80 rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          type="submit"
          value="Create Estimate"
        />
      </form>
    );

  const webData = await fetch(`https://${searchParams.domain.toString()}`);

  const provider = (webData.headers.get("server") || "unknown").toLowerCase();
  let schema: {
    title: String;
    server: String;
    logo: String;
    articleCount: number;
    features: Array<{
      name: String;
      plans: Array<boolean>;
    }>;
    plans: Array<{
      name: String;
      important: boolean;
      price: number;
      time: String;
    }>;
  } = {
    title: "",
    server: "",
    logo: "",
    articleCount: 0,
    features: [],
    plans: [],
  };

  if (provider == "squarespace") {
    const coreDataReq = await fetch(
      `https://${searchParams.domain.toString()}/blog?format=json`,
    );
    const coreData = await coreDataReq.json();

    schema.title = coreData.website.siteTitle;
    schema.server = "Squarespace";
    schema.logo = coreData.website.logoImageUrl;
    schema.articleCount = coreData.collection.itemCount;

    schema.plans.push({
      name: "ReRoto College",
      important: false,
      price: 120,
      time: "Charging $1,440 per year",
    });
    schema.plans.push({
      name: "Squarespace",
      important: false,
      price: 65,
      time: "Charging $780 per year",
    });

    schema.features.push({
      name: "Article Publishing",
      plans: [true, true],
    });
    schema.features.push({
      name: "Page Customization",
      plans: [true, true],
    });
    schema.features.push({
      name: "RSS Feeds",
      plans: [true, true],
    });
    schema.features.push({
      name: "Search Engine Optimization",
      plans: [true, true],
    });
    schema.features.push({
      name: "Real-Time Analytics and Insights",
      plans: [true, false],
    });
    schema.features.push({
      name: "Team & Workflow Management",
      plans: [true, false],
    });
    schema.features.push({
      name: "GPT-4 Writing",
      plans: [true, false],
    });
    schema.features.push({
      name: "Built-in Advertisements and Subscriptions",
      plans: [true, false],
    });
    schema.features.push({
      name: "Integration with Google News, MSN, Yahoo News",
      plans: [true, false],
    });
  } else return <h2>{searchParams.domain} is hosted by an Unknown Provider</h2>;

  return (
    <>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16">
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mb-4 h-24 rounded-xl bg-slate-500"
              src={schema.logo.toString()}
              alt={`Logo for ${schema.title}`}
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Why Should {schema.title} Switch to ReRoto?
            </h1>
          </div>
          <div className="hidden sm:mt-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Currently, {schema.title} uses {schema.server}.
            </div>
          </div>
        </div>
      </div>
      <section id="plans" className="body-font overflow-hidden text-gray-700">
        <div className="container mx-auto flex flex-wrap px-5 py-24">
          <div className="mt-48 hidden lg:block lg:w-1/4">
            <div className="mt-px overflow-hidden rounded-bl-lg rounded-tl-lg border-b border-l border-t border-gray-300">
              <div className="-mt-px">
                {schema.features.map((i, n) => (
                  <p
                    key={n}
                    className={`flex h-16 items-center justify-start ${
                      n % 2 == 0 ? "bg-gray-100" : ""
                    } px-4 text-left text-gray-900`}
                  >
                    {i.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap rounded-lg rounded-bl-none border-gray-300 lg:w-3/4 lg:border">
            {schema.plans.map((i, n) => (
              <div
                key={n}
                className={`${
                  i.important
                    ? "border-2 border-primary-500"
                    : "border-2 border-gray-300 lg:rounded-none lg:border-none"
                } relative mb-10 w-full rounded-lg lg:mb-0 lg:mt-px lg:w-1/2`}
              >
                {i.important ? (
                  <span className="absolute right-0 top-0 rounded-bl bg-primary-500 px-3 py-1 text-xs tracking-widest text-white">
                    POPULAR
                  </span>
                ) : (
                  <></>
                )}
                <div className="flex h-48 flex-col items-center justify-center px-2 text-center">
                  <h3 className="uppercase tracking-widest">{i.name}</h3>
                  <h2 className="mb-4 mt-2 text-5xl font-medium leading-none text-gray-900">
                    {typeof i.price == "string" ? (
                      i.price
                    ) : (
                      <>
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumSignificantDigits: 3,
                        })
                          .format(i.price)
                          .toString()}
                        <span className="ml-1 text-base text-gray-600">
                          /mo
                        </span>
                      </>
                    )}
                  </h2>
                  <span className="text-sm text-gray-600">{i.time}</span>
                </div>
                <div className="-mt-px border-t border-gray-300">
                  {schema.features.map((j, m) => (
                    <p
                      key={m}
                      className={`flex h-16 items-center justify-center ${
                        m % 2 == 0 ? "bg-gray-100" : ""
                      } ${
                        m == 0 ? "-mb-px" : ""
                      } px-2 text-center text-gray-600`}
                    >
                      {typeof j.plans[n] == "string" ? (
                        j.plans[n]
                      ) : j.plans[n] ? (
                        <Check className="text-green-500" />
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
