import { type NextRequest } from "next/server";
import RSS from "rss";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

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

  const builder = new XMLBuilder({ ignoreAttributes: false });

  return new Response(
    builder.build({
      "?xml": {
        "@version": "1.0",
        "@encoding": "UTF-8",
      },
      urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
        url: {},
      },
    }),
  );
}
