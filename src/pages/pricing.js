import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

function Plan({ name, price, benefits }) {

  return <div class="rounded-2xl border border-primary p-6 shadow-sm ring-1 ring-primary sm:order-last sm:px-8 lg:p-12">
    <div class="text-center">
      <h2 class="text-lg font-medium text-gray-900">
        {name}
        <span class="sr-only">Plan</span>
      </h2>
      <p class="mt-2 sm:mt-4">
        <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
          ${price}
        </strong>
        <span class="text-sm font-medium text-gray-700">/month</span>
      </p>
    </div>

    <ul class="mt-6 space-y-2">
      {
        (benefits || []).map(i => {

          return <li class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 text-primary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span class="text-gray-700"> {i} </span>
          </li>

        })
      }
    </ul>

    <a
      href="#"
      class="mt-8 block rounded-full border border-primary bg-primary px-12 py-3 text-center text-sm font-medium text-white hover:bg-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring active:text-primary"
    >
      Get Started
    </a>
  </div>

}

function ContactPage({location}) {

    return (
        <Layout location={location} crumbLabel="Contact">
            <section>
                <div
                class="mx-auto max-w-screen-xl px-4 pt-48 pb-16 lg:flex  lg:items-center"
                >
                    <div class="mx-auto max-w-4xl text-center">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                            Pricing and Plans
                        </h1>
                        <p className="m-2 text-xl">
                            We scale our plans so that organizations of all sizes can enjoy the benefits of ReRoto.
                        </p>
                    </div>
                </div>
            </section>
            <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center md:gap-8">
                <Plan name="College" price="120" benefits={[
                  "In-App Writing/Editing",
                  "Article Scheduling",
                  "Version Control System",
                  "Audio Transcription",
                  "Error + Bias Detection",
                ]} />
                <Plan name="Professional" price="200" benefits={[
                  "Email Management",
                  "Deep Viewer Insights",
                  "Subscriber System",
                ]} />
                <Plan name="Enterprise" price="1,000+" benefits={[
                  "24/7 On-Call Support",
                  "Enterprise API-Access",
                  "Customized Limits",
                ]} />
              </div>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title="Pricing" />

export default ContactPage
