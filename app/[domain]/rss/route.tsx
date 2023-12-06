import { type NextRequest } from "next/server";
import RSS from "rss";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { domain: string };
  },
) {
  const domain = decodeURIComponent(params.domain);

  const [data, posts] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
  ]);

  if (data == null) return new Response(new RSS({}).xml({ indent: true }));

  const site_url = data.customDomain
    ? data.customDomain
    : `https://${data.subdomain}.reroto.com`;

  const feedOptions = {
    title: data.name,
    description: data.description,
    site_url: site_url,
    feed_url: `${site_url}/rss`,
    image_url: data.logo,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${data.name}`,
  };

  const feed = new RSS(feedOptions);

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${site_url}/blog/${post.slug}`,
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "text/xml" },
  });
}
