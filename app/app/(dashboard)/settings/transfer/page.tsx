// @ts-nocheck

import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";

export default async function SiteSettingsDomains({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await prisma.site.findUnique({
    where: {
      id: session.user.siteId,
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Import Website"
        description="Import using a WXR, RSS, or JSON file."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "importFile",
          defaultValue: "",
        }}
        handleSubmit={async (_data, _id, name) => {
          "use server";

          const rawText = _data.get("textFileSrc");

          const parser = new XMLParser({
            ignoreAttributes: false,
          });
          let xmlData = parser.parse(rawText);

          let rss = xmlData["rss"];

          if (rss == undefined)
            return { error: "Not an RSS feed or WXR file." };

          let channels = [];

          if (Array.isArray(rss["channel"])) channels = rss["channel"];
          else channels = [rss["channel"]];

          const channel = channels[0];

          const title = channel["title"] || data.title;
          const description = channel["description"] || data.description;
          const domain =
            channel["link"].replace(/(http:\/\/|https:\/\/)/, "") ||
            data.customDomain;
          const articles = channel["item"] || [];

          console.dir(channel, { depth: null });
          console.log(`title: ${title}`);
          console.log(`description: ${description}`);
          console.log(`domain: ${domain}`);

          for (let article of articles) {
            const builder = new XMLBuilder({ ignoreAttributes: false });

            const mdx = NodeHtmlMarkdown.translate(
              typeof article["content:encoded"] == "string"
                ? article["content:encoded"]
                : builder.build(article["content:encoded"] || {}),
            );

            console.log(article);
            console.log(mdx);

            await prisma.post.create({
              data: {
                title: article.title,
                content: mdx,
                description: "",
                slug:
                  article["wp:post_name"] ||
                  article.title.toLowerCase().replace(/\s/g, "-"),
                published: article["wp:status"] == "publish",
                siteId: session.user.siteId,
                userId: session.user.id,
              },
            });
          }

          return {};
        }}
      />
      <Form
        title="Export Website"
        description="Download all of the site data in the WXR format."
        helpText="Please select the data you want to export."
        inputAttrs={{
          name: "customDomain",
          type: "date",
          defaultValue: data?.customDomain!,
          placeholder: "yourdomain.com",
          maxLength: 64,
          pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={async (_data, _id, name) => {
          "use server";
        }}
      />
    </div>
  );
}
