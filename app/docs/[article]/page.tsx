import * as React from "react";
import { useRouter } from 'next/navigation'
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

import { getSections } from "../page";

export default async function IndexPage({
  params,
}: {
  params: { article: string };
}) {
  
  const fileData = fs.readFileSync(`./res/docs/${params.article.replace(/[\/\.]/g, '')}.mdx`, 'utf-8')

  const sections = getSections()

  return (
    <DocsPage sections={sections} source={fileData} />
  );

}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
