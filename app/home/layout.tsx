/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";

import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
// import { Breadcrumb } from "gatsby-plugin-breadcrumb";

export default function Layout({
  children,
  location = "",
  crumbLabel,
}: {
  children: Array<any>;
  location: string;
  crumbLabel: string;
}) {
  return (
    <>
      <Header />
      {/* <Breadcrumb location={location} crumbLabel={crumbLabel} /> */}
      <main>{children}</main>
      <script
        async
        src="https://tag.clearbitscripts.com/v1/pk_74ced819abd90c7984657761b2cc93ee/tags.js"
        referrerPolicy="strict-origin-when-cross-origin"
      ></script>
      <Footer />
    </>
  );
}
