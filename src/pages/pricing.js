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
                            How to Join
                        </h1>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex flex-col">
                    <p className="text-lg">Our application for the Fall 2023 Academic semester is now live! Open until Friday September 8th at midnight.</p>
                    <div className="grid grid-cols-2 my-4 bg-black">
                        <a className="block bg-active p-4 text-center font-black text-white hover:opacity-90" href="https://docs.google.com/forms/d/e/1FAIpQLSfT5AmzBC3vNG1fN3M-l_BsgFOgLPQuek5B3jr2w8SAp7k9FQ/viewform?usp=sf_link">Join Us</a>
                        <a className="block bg-active p-4 text-center font-black text-white hover:opacity-90" href="https://docs.google.com/spreadsheets/d/1TG9QVqDaplOvoVUaFNMj4Rxs6QcFwj5Z2VpfAGURKtE/edit?usp=sharing">Coffee Chats</a>
                    </div>
                    <p className="text-lg">GDT is an open access club! If you love tech or policy, you belong with us. Certain teams (Developers + Machine Learning) are more selective, so you may not get your first choice when it comes to project teams this semester. That said, everyone gets onto a project team and will close this semester with a deliverable under their belt.</p>
                </div>
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="Join Us" />

export default ContactPage
