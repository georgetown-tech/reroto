import * as React from "react";
// import { GatsbyImage } from "gatsby-plugin-image"
import Link from "next/link";

function aimForCharacterCount(sentence, count) {
  let i = 0;
  let words = sentence.split(" ");
  let output = "";

  for (const word of words) {
    i += word.length;
    if (count < i) return output + "...";

    output += " " + word;
  }

  return output;
}

function Person({
  first,
  last,
  biography,
  location = "",
  crumbLabel,
}: {
  first: string;
  last: string;
  biography: string;
  location: string;
  crumbLabel: string;
}) {
  let slug = `${first}-${last}`.toLowerCase();

  const photo = `/members/${`${first} ${last}`
    .toLowerCase()
    .replace(/\s/g, "-")}.jpeg`;

  return (
    <>
      <Link className="block h-full w-full" to={`/team/${slug}`}>
        <div className="h-full rounded p-4 shadow">
          <img
            src={photo}
            loading="lazy"
            className="mb-4 aspect-square w-1/2 rounded-full object-cover"
          />
          <h3 className="text-lg font-bold">
            {first} {last}
          </h3>
          <p
            className="text-md"
            dangerouslySetInnerHTML={{
              __html: aimForCharacterCount(biography, 300) || "",
            }}
          />
        </div>
      </Link>
    </>
  );
}
export default Person;
