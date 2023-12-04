import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import historyImage from "../../res/images/history.jpeg"
import partnersImage from "../../res/images/google.png"

function ContactPage({location}) {

    return (
        <Layout location={location} crumbLabel="Contact">
            <section>
                <div
                class="mx-auto max-w-screen-xl px-4 py-48 lg:flex  lg:items-center"
                >
                    <div class="mx-auto max-w-4xl text-center">
                        <h1 class="text-3xl font-extrabold sm:text-5xl">
                            About GDT
                        </h1>
                        <p className="text-xl mt-4 mb-16 max-w-2xl">Learn about Georgetown Disruptive Tech's founding, history, operations, structure, finances, and more.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-8">
                <div className="w-full md:w-2/3">
                    <h2 className="font-bold text-4xl mb-4">How It All Started.</h2>
                    <p className="mb-2 text-lg">
                        Founded by a group of three Georgetown students in 2016, Georgetown Disruptive Tech has 
                        always been at the forefront of innovation. In 2020, the group was founded as a official 
                        club in the college, allowing for greater reach and impact. Since then, GDT has worked 
                        with hundreds of clubs, organizations, and people to create projects that truly disrupt
                        our technological landscape.
                    </p>
                    <p className="mb-2 text-lg"></p>
                </div>
                <div className="w-1/3 hidden text-slate-200 md:block">
                    {
                        <img className="w-full rounded" src={historyImage} alt={"President Lucas Raskin moderating a panel hosted by GDT."} />
                    }
                </div>
                </div>
            </section>
            <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-8">
                    <div className="w-1/3 hidden text-slate-200 md:block">
                        {
                            // <img className="w-full rounded" src={partnersImage} alt={"The Google logo."} />
                        }
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="font-bold text-4xl mb-4">Our Partners in Development.</h2>
                        <p className="mb-2 text-lg">
                            By ourselves, Georgetown Disruptive Tech would not be able to accomplish a fraction of what it has. Because of this,
                            we have partnered with Google, Monday.com, Simon's Heart, the National Cherry Blossom Festival, DEShaw & Co, the National 
                            Nanotechnology Coordination Office, and so many more. Through these partnerships and connections, we have been able
                            to host events, develop new technology, and become one of the largest clubs at Georgetown.
                        </p>
                    </div>
                </div>
            </section>

            {/* <section>
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-2">
                <div className="w-full md:w-2/3">
                    <h2 className="font-bold text-4xl mb-4">From Hoyas to the Hilltop.</h2>
                    <p className="mb-2 text-lg">Georgetown Disruptive Technology is the leading technology-oriented club at Georgetown University. Our goal is to provide students with the resources they need to succeed in the ever-changing world of technology. From programming to cyber security, we offer a wide range of workshops and events to help you stay ahead of the curve.</p>
                    <p className="mb-2 text-lg">Whether it's software development, machine learning, data analytics, or graphic design, GDT is your "one stop shop" to pursue your passions and explore new interests.</p>
                </div>
                <div className="w-1/3 hidden text-slate-200 md:block">
                    {
                    // <img className="w-full rounded" src={generalData.images?.general[0].src} alt={generalData.images?.general[0].alt} />
                    }
                </div>
                </div>
            </section>
            <section className="w-full px-16 py-8 my-16">
                <div className="max-w-6xl mx-auto pb-16 px-4 flex gap-2">
                <div className="w-1/3 hidden text-slate-200 md:block">
                    {
                    // <img className="w-full rounded" src={generalData.images?.general[0].src} alt={generalData.images?.general[0].alt} />
                    }
                </div>
                <div className="w-full md:w-2/3">
                    <h2 className="font-bold text-4xl mb-4">A Community Driven Approach.</h2>
                    <p className="mb-2 text-lg">One of our main focuses is the community that we create around Georgetown. All of our members are students at the University, and all of our projects are focused around the University and the surrounding area.</p>
                    <p className="mb-2 text-lg">Whether it's a new platform for the Hoya, a machine learning project for the Cherry Blossom Festival, or a whole new, tech-driven approach for a Georgetown club, GDT is ready to create it.</p>
                </div>
                </div>
            </section> */}
        </Layout>
    )
}

export const Head = () => <Seo title="About"  />

export default ContactPage
