import * as React from "react";
import Event from "./event";

const EventMonth = ({
  title,
  events,
}: {
  title: string;
  events: Array<any>;
}) => {
  return (
    <section key={title}>
      <div className="mx-auto mt-24 max-w-screen-md px-4 py-8">
        <h2 className="mb-4 text-4xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 gap-4">
          {events.map((i) => Event(i))}
        </div>
      </div>
    </section>
  );
};

export default EventMonth;
