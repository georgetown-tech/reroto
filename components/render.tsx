"use client";

import config from "@/lib/puck";
import { Render, resolveAllData } from "@measured/puck";
import { Site, User, Post } from "@prisma/client";
import { useEffect, useState } from "react";

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
  // check if 'data == {}'
  if (Object.keys(data).length === 0) return <></>;

  return (
    <Render
      // @ts-ignore
      config={config(siteData, article, author)}
      data={data || initialData}
    />
  );
}
