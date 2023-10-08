import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

// import {StlViewer} from "react-stl-viewer";
      
const style = {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
}

function IndexPage({location}) {

  let generalData = require('../../data/general.json')
  let currentFund = generalData.fund.lifetime;

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Layout location={location} crumbLabel="Home">
      <section>
        <div
          class="mx-auto max-w-screen-xl px-4 py-48 lg:flex  lg:items-center"
        >
          <div class="mx-auto max-w-xl text-center">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              We Build Projects,
              <strong class="font-extrabold text-active sm:block">
                &nbsp;To Help Our Community.
              </strong>
            </h1>

            <p class="mt-4 sm:text-xl sm:leading-relaxed">
              Since 2017, Georgetown Disruptive Tech has changed the way that our school interacts with computer science.
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                class="block w-full rounded bg-active px-12 py-3 text-sm font-medium text-white shadow hover:bg-active focus:outline-none focus:ring active:bg-active sm:w-auto"
                to="/join"
              >
                Join Now
              </Link>

              <Link
                class="block w-full rounded px-12 py-3 text-sm font-medium text-active shadow hover:text-active focus:outline-none focus:ring active:text-active sm:w-auto"
                to="/features"
              >
                Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}


export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />

export default IndexPage


