"use client";

import { saveGrape } from "@/lib/html";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

// Create Puck component config
import config from "@/lib/puck";
import router from "next/router";
import { Post, Site, User } from "@prisma/client";

// Describe the initial data
const initialData = {
  content: [],
  root: {},
};

// Save the data to your database
const save = (page: string) => {
  return async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("components", JSON.stringify(data));
      formData.append("page", page);

      const response = await saveGrape(formData);

      router.push("/design/");
    } catch (error: unknown) {
      console.error("An error occurred:", error);
    }
  };
};

// Render Puck editor
export default function Editor({
  page,
  content,
  siteData,
  author,
  article,
}: {
  page: string;
  content: any;
  siteData: Site;
  author?: User;
  article?: Post;
}) {
  return (
    <Puck
      // @ts-ignore
      config={config(siteData, article, author)}
      data={
        // initialData
        content || initialData
      }
      onPublish={save(page)}
    />
  );
}
