"use client";

import config from "@/lib/puck";
import { Render } from "@measured/puck";
import { Site, User, Post } from "@prisma/client";

const initialData = {
  content: [],
  root: {},
};

export default function Rendered({
  data,
  siteData,
  author,
  article,
}: {
  data: any;
  siteData: Site;
  author?: User;
  article?: Post;
}) {
  return (
    <Render
      // @ts-ignore
      config={config(siteData, article, author)}
      data={data || initialData}
    />
  );
}
