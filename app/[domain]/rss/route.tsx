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

  if (data == null) return Response.error();

  const site_url = data.customDomain
    ? data.customDomain
    : `https://${data.subdomain}.reroto.com`;

  const feed = new RSS({
    title: data.name || "Unnamed Website",
    description: data.description || "This website has no description.",
    site_url: site_url || domain,
    feed_url: `${site_url}/rss` || domain,
    image_url: data.logo || "https://reroto.com/logo.png",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${data.name}`,
  });

  posts.map((post) => {
    feed.item({
      title: post.title || "Untitled Post",
      description: post.description || "This post has no description.",
      url: `${site_url}/${post.slug}`,
      date: post.createdAt || new Date(),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "text/xml" },
  });
}
