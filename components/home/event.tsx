import Link from "next/link";
import * as React from "react";

const Event = ({
  title,
  startTime,
  location,
  slug,
  image,
}: {
  title: string;
  startTime: Date;
  location: string;
  slug: string;
  image: string;
}) => {
  const suffix = [
    "",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "st",
    "nd",
    "rd",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "th",
    "st",
  ];

  const date = new Date(Date.parse(startTime));

  return (
    <Link to={`/events/${slug}`} className="transition-shadow hover:shadow-lg ">
      <article className="relative flex h-32 w-full flex-col justify-center overflow-hidden rounded-lg bg-slate-700 p-4">
        <img
          className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full object-cover opacity-40"
          src={image}
          alt={`Image for the '${title}' event.`}
        />
        <h3 className="z-20 font-bold text-white">{title}</h3>
        <p className="z-20 text-sm font-light text-white">{location}</p>
        <span className="absolute right-4 top-4 z-30 text-white">
          {date.getDate()}
          {suffix[date.getDate()]}
        </span>
      </article>
    </Link>
  );
};

export default Event;
