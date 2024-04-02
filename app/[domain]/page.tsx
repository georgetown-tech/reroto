import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import BlogCard from "@/components/cards/blog-card";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import Image from "next/image";
import { compileToHtml } from "@/lib/html";
import Render from "@/components/render";
import config from "@/lib/puck";
// import { Render } from "@measured/puck/rsc";

export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
    // feel free to remove this filter if you want to generate paths for all sites
    where: {
      subdomain: "demo",
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, posts] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.us-east.aws.tinybird.co"
        data-token="p.eyJ1IjogImI0MTgwNzU2LTI1YzctNDNlMC04M2Q3LWQyN2ZhODA2NTk3YiIsICJpZCI6ICI1MTcwZTkwMi0xY2ZhLTQzZjgtODBhMi01OWM5N2ExY2FlYzEiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.buvHzH2UJTTAyvejlSA_7_DWy27IWcg4R_zHLc9zoLg"
        // @ts-ignore
        tb_domain={domain}
      />
      <header>
        <Render
          // config={config}
          siteData={data}
          data={
            // @ts-ignore
            data.siteData?.["header"] || {}
          }
        />
      </header>
      <main className="min-h-screen">
        <Render
          siteData={data}
          // config={config}
          data={
            // @ts-ignore
            data.siteData?.["home"] || {}
          }
        />
      </main>
      <footer>
        <Render
          siteData={data}
          // config={config}
          data={
            // @ts-ignore
            data.siteData?.["footer"] || {}
          }
        />
      </footer>
    </>
  );
}
