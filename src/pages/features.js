import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

function ContactPage({location}) {

    return (
        <Layout location={location} crumbLabel="Contact">
            <section>
                <div
                class="mx-auto max-w-screen-xl px-4 py-48 lg:flex  lg:items-center"
                >
                    <div class="mx-auto max-w-4xl text-center">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                            Features
                        </h1>
                        <p>

                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="Join Us" />

export default ContactPage
