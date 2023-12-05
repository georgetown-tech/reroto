import * as React from "react";
import Link from "next/link";
const Program = ({ title, slug, description }: { title:string, slug:string, description:string }) => {
  return (
    <Link className="block h-full w-full" to={`/projects/${slug}`}>
      <div className="rounded p-4 shadow">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-md">{description || ""}</p>
      </div>
    </Link>
  );
};

export default Program;
