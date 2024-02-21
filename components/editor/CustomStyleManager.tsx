import * as React from "react";
import { StylesResultProps } from "@grapesjs/react";
// import { mdiMenuDown } from '@mdi/js';
// import Icon from '@mdi/react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
import { MAIN_BG_COLOR } from "./common";
import StylePropertyField from "./StylePropertyField";

// const accordionIcon = <Icon path={mdiMenuDown} size={0.7} />;

export default function CustomStyleManager({
  sectors,
}: Omit<StylesResultProps, "Container">) {
  return (
    <div className="gjs-custom-style-manager text-left">
      {sectors.map((sector) => (
        <details
          key={sector.getId()}
          className="group border-b [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  p-4 text-gray-900">
            <h2 className="font-medium">{sector.getName()}</h2>
            <svg
              className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="grid grid-cols-1 gap-2 p-2">
            {sector.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
