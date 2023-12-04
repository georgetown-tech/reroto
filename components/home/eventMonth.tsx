import * as React from "react"
import Event from "./event"

const EventMonth = ({ title, events }) => {
  
  return (
    <section key={title}>
      <div class="mx-auto max-w-screen-md px-4 py-8 mt-24">
        <h2 className="font-bold text-4xl mb-4">{title}</h2>
        <div class="grid gap-4 grid-cols-1">
          {
            events.map(i => Event(i))
          }
        </div>
      </div>
    </section>
  )
}

export default EventMonth
