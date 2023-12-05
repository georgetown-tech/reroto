import * as React from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "Page Customization",
    plans: [true, true, true, true],
  },
  {
    name: "In-App Writing/Editing",
    plans: [true, true, true, true],
  },
  {
    name: "Article Scheduling",
    plans: [true, true, true, true],
  },
  // {
  //   name: "Version Control System",
  //   plans: [true, true, true, true]
  // },
  {
    name: "Team Members",
    plans: ["up to 5", "up to 200", "up to 1000", "∞"],
  },
  {
    name: "Custom Domain",
    plans: [false, true, true, true],
  },
  {
    name: "Audio Transcription",
    plans: [false, "$1.00/hr", "$0.98/hr", "$0.96/hr"],
  },
  {
    name: "Error + Bias Detection",
    plans: [false, true, true, true],
  },
  {
    name: "Email Management",
    plans: [false, false, true, true],
  },
  {
    name: "Deep Viewer Insights",
    plans: [false, false, true, true],
  },
];

const plans = [
  {
    name: "Start",
    price: "Free",
    time: "For Forever",
  },
  {
    name: "College",
    price: 120.0,
    time: "Charging $1,440 per year",
    important: true,
  },
  {
    name: "Professional",
    price: 200.0,
    time: "Charging $2,400 per year",
  },
];

function Plan({ name, price, benefits }) {
  return (
    <div className="rounded-2xl border border-primary p-6 shadow-sm ring-1 ring-primary sm:order-last sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
          {name}
          <span className="sr-only">Plan</span>
        </h2>
        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ${price}
          </strong>
          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {(benefits || []).map((i, n) => {
          return (
            <li key={n} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-primary"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700"> {i} </span>
            </li>
          );
        })}
      </ul>

      <a
        href="#plans"
        className="mt-8 block rounded-full border border-primary bg-primary px-12 py-3 text-center text-sm font-medium text-white hover:bg-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring active:text-primary"
      >
        See More
      </a>
    </div>
  );
}

export default function PricingPage({}) {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 pb-16 pt-48 lg:flex  lg:items-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Pricing and Plans
            </h1>
            <p className="m-2 text-xl">
              We scale our plans so that organizations of all sizes can enjoy
              the benefits of ReRoto.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center md:gap-8">
          <Plan
            name="College"
            price="120"
            benefits={[
              "In-App Writing/Editing",
              "Article Scheduling",
              "Version Control System",
              "Audio Transcription",
              "Error + Bias Detection",
            ]}
          />
          <Plan
            name="Professional"
            price="200"
            benefits={[
              "Email Management",
              "Deep Viewer Insights",
              "Subscriber System",
            ]}
          />
          <Plan
            name="Enterprise"
            price="1,000+"
            benefits={[
              "24/7 On-Call Support",
              "Enterprise API-Access",
              "Customized Limits",
            ]}
          />
        </div>
      </div>
      <section className="border-t border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 pt-16 sm:pt-32 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              What features does each plan unlock?
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Discover the ideal plan that matches your needs and ambitions.
              Explore our range of customizable options below, each crafted to
              unlock unique features and support your growth journey. Choose the
              perfect plan and unleash your potential today.
            </p>
            <a
              href="#plans"
              className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              See Features
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
      <section id="plans" className="body-font overflow-hidden text-gray-700">
        <div className="container mx-auto flex flex-wrap px-5 py-24">
          <div className="mt-48 hidden lg:block lg:w-1/4">
            <div className="mt-px overflow-hidden rounded-bl-lg rounded-tl-lg border-b border-l border-t border-gray-300">
              <div className="-mt-px">
                {features.map((i, n) => (
                  <p
                    key={n}
                    className={`flex h-12 items-center justify-start ${
                      n % 2 == 0 ? "bg-gray-100" : ""
                    } px-4 text-center text-gray-900`}
                  >
                    {i.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-wrap rounded-lg border-gray-300 lg:w-3/4 lg:border">
            {plans.map((i, n) => (
              <div
                key={n}
                className={`${
                  i.important
                    ? "border-2 border-primary-500"
                    : "border-2 border-gray-300 lg:rounded-none lg:border-none"
                } relative mb-10 w-full rounded-lg lg:mb-0 lg:mt-px lg:w-1/3`}
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
                  {features.map((j, m) => (
                    <p
                      key={m}
                      className={`flex h-12 items-center justify-center ${
                        m % 2 == 0 ? "bg-gray-100" : ""
                      } ${
                        m == 0 ? "-mb-px" : ""
                      } px-2 text-center text-gray-600`}
                    >
                      {typeof j.plans[n] == "string" ? (
                        j.plans[n]
                      ) : j.plans[n] ? (
                        <Check />
                      ) : (
                        <X />
                      )}
                    </p>
                  ))}
                </div>
                <div className="rounded-bl-lg border-t border-gray-300 p-6 text-center">
                  <Link
                    href="https://app.reroto.com/login"
                    className="mt-auto flex w-full items-center rounded border-0 bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none"
                  >
                    Get ReRoto
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="ml-auto h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <p className="mt-3 text-xs text-gray-500">
                    Billing is done at the each month&apos;s start for plans.
                    Metered services will appear on the next month&apos;s bill.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
