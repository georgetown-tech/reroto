import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getPostData, getSiteData } from "@/lib/fetchers";
import BlogCard from "@/components/cards/blog-card";
import BlurImage from "@/components/blur-image";
import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import Render from "@/components/render";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getPostData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
    // Optional: Set canonical URL to custom domain if it exists
    ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      siteData.customDomain && {
        alternates: {
          canonical: `https://${siteData.customDomain}/article/${params.slug}`,
        },
      }),
  };
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const [post, site] = await Promise.all([
    getPostData(domain, slug),
    getSiteData(domain),
  ]);

  if (!post) {
    notFound();
  }
  if (site == null) {
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
      <Render
        // config={config}
        siteData={site}
        data={
          // @ts-ignore
          site.siteData?.["header"] || {}
        }
      />
      <Render
        siteData={site}
        article={post}
        // config={config}
        data={
          // @ts-ignore
          site.siteData?.["article_page"] || {}
        }
      />
      <Render
        siteData={site}
        // config={config}
        data={
          // @ts-ignore
          site.siteData?.["footer"] || {}
        }
      />
      {/* <script>
        { JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": data.title,
        "image": [
          "https://example.com/photos/1x1/photo.jpg",
          "https://example.com/photos/4x3/photo.jpg",
          "https://example.com/photos/16x9/photo.jpg"
         ],
        "datePublished": "2015-02-05T08:00:00+08:00",
        "dateModified": "2015-02-05T09:20:00+08:00",
        "author": [{
            "@type": "Person",
            "name": "Jane Doe",
            "url": "https://example.com/profile/janedoe123"
          },{
            "@type": "Person",
            "name": "John Doe",
            "url": "https://example.com/profile/johndoe123"
        }]
      }) }
      </script> */}
    </>
  );
}
