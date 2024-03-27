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
  // const [renderedData, setRenderedData] = useState(data);

  // useEffect(() => {
  //   (async () => {
  //     setRenderedData(
  //       // @ts-ignore
  //       await resolveAllData(data, config(siteData, article, author)),
  //     );
  //   })();
  // }, []);

  return (
    <Render
      // @ts-ignore
      config={config(siteData, article, author)}
      data={data || initialData}
    />
  );
}
