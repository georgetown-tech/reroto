import * as React from "react";
import * as fs from "fs";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import HoyaLogo from "@/res/hoya.svg";
import DocsPage from "@/components/docs/page";
import {
  Pen,
  Users,
  Focus,
  FolderKanban,
  Paintbrush,
  SearchCode,
} from "lucide-react";

export function getSections() {

  const docs = fs.readdirSync('./res/docs/')
  const docsData = docs.map(i => {

    const lines = fs.readFileSync('./res/docs/' + i, 'utf-8').split('\n')
    const title = lines.filter(line => line.startsWith('title:'))[0]
    const category = lines.filter(line => line.startsWith('category:'))[0]

    return {
      name: title.slice(6).trim(),
      category: category.slice(9).trim(),
      slug: i.replace('.mdx', '')
    }

  })
  
  let hash:Array<any>;
  let newData;

  // @ts-ignore
  hash = docsData.reduce((p,c) => (p[c.category] ? p[c.category].push(c) : p[c.category] = [c],p) ,{}),
  // @ts-ignore
  newData = Object.keys(hash).map(k => ({name: k, content: hash[k]}));
  
  console.log(newData)

  return newData;

}

export default async function IndexPage({}) {

  const fileData = fs.readFileSync('./res/docs/new-college-paper.mdx', 'utf-8')

  // const sections = [
  //   {
  //     name: "Introduction",
  //     content: [
  //       {
  //         name: "Creating a College Newspaper",
  //         slug: "/new-college-paper"
  //       },
  //       {
  //         name: "Adding Billing Information",
  //         slug: "/setup-billing-information"
  //       },
  //     ]
  //   },
  //   {
  //     name: "Introduction",
  //     content: [
  //       {
  //         name: "Creating a College Newspaper",
  //         slug: "/new-college-paper"
  //       },
  //       {
  //         name: "Adding Billing Information",
  //         slug: "/setup-billing-information"
  //       },
  //     ]
  //   }
  // ]

  const sections = getSections();

  return (
    <DocsPage sections={sections} source={fileData} />
  );

}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
