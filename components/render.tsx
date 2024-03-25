"use client";

import { config } from "@/lib/puck";
import { Render } from "@measured/puck";

const initialData = {
  content: [],
  root: {},
};

export default function Rendered({ data }: { data: any }) {
  return (
    <Render
      // @ts-ignore
      config={config}
      data={data || initialData}
    />
  );
}
