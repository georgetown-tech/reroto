"use client";

import Editor from "@/components/editor/index";

export default function SitePosts({ params }: { params: { id: string } }) {
  return (
    <div className="fixed bottom-0 left-60 right-0 top-0 z-50 h-full">
      <Editor page={params.id} />
    </div>
  );
}
