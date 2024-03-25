import { DropZone } from "@measured/puck";
import Link from "next/link";
import Image from "next/image";
import { Site, User, Post } from "@prisma/client";

export default function config(siteData: Site, article: Post, author: User) {
  return {
    components: {
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
                value: "true",
              },
              {
                label: "No",
                value: "false",
              },
            ],
          },
        },
        render: ({ padding, margin, border, children }: any) => {
          return (
            <div
              style={{
                width: "100%",
                padding: padding,
                margin: margin,
                border: border == "true" ? "1px solid #dddddd" : "",
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
          children: {
            type: "text",
          },
        },
        render: ({ children }: any) => {
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
            <div
              style={{
                maxWidth: "420px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  aspectRatio: 4 / 3,
                  objectFit: "cover",
                }}
                width={400}
                height={300}
                src="https://source.unsplash.com/random"
                alt="Random Thumbnail"
              />
              <h2
                style={{
                  fontSize: "18pt",
                  fontWeight: "900",
                }}
              >
                This is an article
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                sint asperiores cumque placeat quo fugit explicabo! Quo quaerat,
                inventore sed maxime odio natus, repellat debitis atque velit
                vel doloribus? Eum.
              </p>
            </div>
          );
        },
      },
    },
  };
}
