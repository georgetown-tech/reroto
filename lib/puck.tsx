/* eslint-disable react-hooks/rules-of-hooks */
import { DropZone } from "@measured/puck";
import Link from "next/link";
import Image from "next/image";
import { Site, User, Post } from "@prisma/client";
import Render from "@/components/render";
import MDX from "@/components/mdx";
import { useEffect, useState } from "react";

export default function config(
  siteData: Site,
  article?: Post & { mdxSource: any },
  author?: User,
) {
  return {
    categories: {
      basic: {
        components: ["Heading", "Text", "Margins"],
      },
      article: {
        components: [
          "Article Title",
          "Article Content",
          "Article Description",
          "Article Thumbnail",
          "Article Grid",
        ],
      },
    },
    components: {
      "Article Title": {
        fields: {
          size: {
            type: "select",
            options: [
              { label: "Main Heading", value: "h1" },
              { label: "Secondary Heading", value: "h2" },
              { label: "Third Heading", value: "h3" },
              { label: "Small Section Heading", value: "h4" },
              { label: "Sub-section Heading", value: "h5" },
            ],
          },
        },
        render: ({ padding, margin, border, children }: any) => {
          return (
            <h1 className="w-full text-3xl font-black">
              {article?.title || "Article Title."}
            </h1>
          );
        },
      },
      "Article Description": {
        fields: {
          size: {
            type: "select",
            options: [
              { label: "Main Heading", value: "h1" },
              { label: "Secondary Heading", value: "h2" },
              { label: "Third Heading", value: "h3" },
              { label: "Small Section Heading", value: "h4" },
              { label: "Sub-section Heading", value: "h5" },
            ],
          },
        },
        render: ({ padding, margin, border, children }: any) => {
          return (
            <p className="w-full text-lg">
              {article?.description || "This is an article description."}
            </p>
          );
        },
      },
      "Article Grid": {
        fields: {
          articles: {
            type: "external",
            fetchList: async () => {
              // const articles = await fetch(
              //   `/api/s/${
              //     siteData.customDomain ||
              `${siteData.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
              //   }/posts`,
              // );
              // const articleData = await articles.json();
              return [];
            },
          },
        },
        resolveData: async ({ props }: any, { changed }: any) => {
          if (!props.articles) return {};

          // Don't query unless `data` has changed since resolveData was last run
          if (!changed.articles) return { props };

          const articles = await fetch(
            `/api/s/${
              siteData.customDomain ||
              `${siteData.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
            }/posts`,
          );
          const articleData = articles.json();
          return {
            props: {
              // Update the value for `data`
              articles: articleData,
            },
          };
        },
        render: ({}: any) => {
          // @ts-ignore
          const [articles, setArticles] = useState([]);

          // @ts-ignore
          useEffect(() => {
            (async () => {
              const articlesReq = await fetch(
                `/api/s/${
                  siteData.customDomain ||
                  `${siteData.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
                }/posts`,
              );
              setArticles(await articlesReq.json());
            })();
          }, []);

          return (
            <div className="grid w-full grid-cols-3">
              {(articles || []).map((i: Post, n: number) => (
                <Render
                  key={n}
                  siteData={siteData}
                  article={i}
                  // config={config}
                  data={
                    JSON.parse(siteData.siteData?.toString() || "{}")["article"]
                  }
                />
              ))}
            </div>
          );
        },
      },
      "Article Thumbnail": {
        fields: {
          size: {
            type: "select",
            options: [
              { label: "Main Heading", value: "h1" },
              { label: "Secondary Heading", value: "h2" },
              { label: "Third Heading", value: "h3" },
              { label: "Small Section Heading", value: "h4" },
              { label: "Sub-section Heading", value: "h5" },
            ],
          },
        },
        render: ({ padding, margin, border, children }: any) => {
          return (
            <Image
              width={400}
              height={300}
              src={article?.image || ""}
              alt={article?.title || ""}
            />
          );
        },
      },
      "Article Content": {
        fields: {},
        render: ({ padding, margin, border, children }: any) => {
          return article?.mdxSource != undefined ? (
            <MDX source={article?.mdxSource} />
          ) : (
            <>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt repudiandae animi commodi excepturi soluta odit culpa
                voluptatum molestiae non cumque nesciunt molestias similique eum
                perspiciatis, vel nostrum ut voluptas expedita?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt repudiandae animi commodi excepturi soluta odit culpa
                voluptatum molestiae non cumque nesciunt molestias similique eum
                perspiciatis, vel nostrum ut voluptas expedita?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt repudiandae animi commodi excepturi soluta odit culpa
                voluptatum molestiae non cumque nesciunt molestias similique eum
                perspiciatis, vel nostrum ut voluptas expedita?
              </p>
            </>
          );
        },
      },
      Container: {
        fields: {
          padding: {
            type: "number",
          },
          margin: {
            type: "number",
          },
          border: {
            type: "select",
            options: [
              {
                label: "Yes",
                value: "yes",
              },
              {
                label: "No",
                value: "no",
              },
            ],
          },
        },
        render: ({ padding, margin, border, children }: any) => {
          return (
            <div
              style={{
                // width: "100%",
                padding: padding,
                margin: margin,
                border: border == "yes" ? "1px solid #dddddd" : "",
              }}
            >
              <DropZone zone="content" />
            </div>
          );
        },
      },
      Header: {
        fields: {
          children: {
            type: "text",
          },
          size: {
            type: "select",
            options: [
              { label: "Main Heading", value: "h1" },
              { label: "Secondary Heading", value: "h2" },
              { label: "Third Heading", value: "h3" },
              { label: "Small Section Heading", value: "h4" },
              { label: "Sub-section Heading", value: "h5" },
            ],
          },
        },
        render: ({ children }: any) => {
          return <h1 className="w-full text-5xl font-black">{children}</h1>;
        },
      },
      Text: {
        fields: {
          children: {
            type: "text",
          },
        },
        render: ({ children }: any) => {
          return <p className="">{children}</p>;
        },
      },
      Logo: {
        fields: {
          type: {
            type: "select",
            options: [
              {
                label: "Normal",
                value: "default",
              },
              {
                label: "Light",
                value: "light",
              },
              {
                label: "Dark",
                value: "dark",
              },
            ],
          },
        },
        render: ({ type }: any) => {
          if (type == "light")
            return (
              <Image
                style={{
                  height: 60,
                  width: "min-content",
                  objectFit: "cover",
                  filter: "brightness(0) invert(1)",
                }}
                width={400}
                height={300}
                src={siteData.logo || ""}
                alt={`Logo for ${siteData.name}`}
              />
            );
          if (type == "dark")
            return (
              <Image
                style={{
                  height: 60,
                  width: "min-content",
                  objectFit: "cover",
                  filter: "brightness(0)",
                }}
                width={400}
                height={300}
                src={siteData.logo || ""}
                alt={`Logo for ${siteData.name}`}
              />
            );
          return (
            <Image
              style={{
                height: 60,
                width: "min-content",
                objectFit: "cover",
              }}
              width={400}
              height={300}
              src={siteData.logo || ""}
              alt={`Logo for ${siteData.name}`}
            />
          );
        },
      },
      Date: {
        fields: {
          format: {
            type: "text",
          },
        },
        render: ({ format }: any) => {
          let out = format || "";
          out = out.replace(/m/g, new Date().getMonth());
          out = out.replace(
            /M/g,
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ][new Date().getMonth()],
          );
          out = out.replace(/Y/g, new Date().getFullYear());
          out = out.replace(
            /y/g,
            new Date().getFullYear().toString().slice(2, 4),
          );
          out = out.replace(
            /D/g,
            [
              "0th",
              "1st",
              "2nd",
              "3rd",
              "4th",
              "5th",
              "6th",
              "7th",
              "8th",
              "9th",
              "10th",
              "11th",
              "12th",
              "13th",
              "14th",
              "15th",
              "16th",
              "17th",
              "18th",
              "19th",
              "20th",
              "21st",
              "22nd",
              "23rd",
              "24th",
              "25th",
              "26th",
              "27th",
              "28th",
              "29th",
              "30th",
              "31st",
            ][new Date().getDate()],
          );
          out = out.replace(/d/g, new Date().getDate());

          return <span>{out}</span>;
        },
      },
      Link: {
        fields: {
          children: {
            type: "text",
          },
          url: {
            type: "text",
          },
        },
        render: ({ children, url }: any) => {
          return (
            <Link href={url || ""} className="underline hover:no-underline">
              {children}
            </Link>
          );
        },
      },
      Flex: {
        fields: {
          spacing: {
            type: "number",
          },
          direction: {
            type: "select",
            options: [
              {
                label: "Horizontal",
                value: "row",
              },
              {
                label: "Vertical",
                value: "column",
              },
            ],
          },
          vertical: {
            type: "select",
            options: [
              {
                label: "Top",
                value: "flex-start",
              },
              {
                label: "Center",
                value: "center",
              },
              {
                label: "Bottom",
                value: "flex-end",
              },
              {
                label: "Between",
                value: "space-between",
              },
            ],
          },
          horizontal: {
            type: "select",
            options: [
              {
                label: "Left",
                value: "flex-start",
              },
              {
                label: "Center",
                value: "center",
              },
              {
                label: "Right",
                value: "flex-end",
              },
              {
                label: "Between",
                value: "space-between",
              },
            ],
          },
        },
        render: ({
          direction,
          spacing,
          horizontal,
          vertical,
          children,
        }: any) => {
          return (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: direction,
                gap: spacing,
                padding: spacing,
                alignItems: vertical,
                justifyContent: horizontal,
              }}
            >
              <DropZone zone="content" />
            </div>
          );
        },
      },
      Margins: {
        fields: {
          size: {
            type: "select",
            options: [
              {
                label: "Small",
                value: "640px",
              },
              {
                label: "Medium",
                value: "768px",
              },
              {
                label: "Large",
                value: "1024px",
              },
              {
                label: "Extra Large",
                value: "1280px",
              },
              {
                label: "Grande",
                value: "1536px",
              },
            ],
          },
        },
        render: ({ size }: any) => {
          return (
            <div
              style={{
                maxWidth: size,
                margin: "0px auto",
                padding: 15,
              }}
            >
              <DropZone zone="content" />
            </div>
          );
        },
      },
      Article: {
        fields: {},
        render: ({ size }: any) => {
          return (
            <Render
              siteData={siteData}
              // config={config}
              data={
                JSON.parse(siteData.siteData?.toString() || "{}")["article"]
              }
            />
          );
        },
      },
    },
  };
}
