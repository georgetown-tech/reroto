import * as React from "react";
import { TraitsResultProps } from "@grapesjs/react";
import TraitPropertyField from "./TraitPropertyField";

export default function CustomTraitManager({
  traits,
}: Omit<TraitsResultProps, "Container">) {
  return (
    <div className="gjs-custom-style-manager mt-3 p-1 text-left">
      {!traits.length ? (
        <div></div>
      ) : (
        <details className="group border-b [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  p-4 text-gray-900">
            <h2 className="font-medium">Traits</h2>
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
            {traits.map((trait) => (
              <TraitPropertyField key={trait.getId()} trait={trait} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
