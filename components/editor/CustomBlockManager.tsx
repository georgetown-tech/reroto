import * as React from "react";
import { BlocksResultProps } from "@grapesjs/react";
import { MAIN_BORDER_COLOR, cx } from "./common";

export type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>;

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) {
  return (
    <div className="gjs-custom-block-manager text-left">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <div key={category}>
          <details
            open
            className="group border-b [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  p-4 text-gray-900">
              <h2 className="font-medium">{category} Blocks</h2>

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
            <div className="grid grid-cols-2 gap-2 p-2">
              {blocks.map((block) => (
                <div
                  key={block.getId()}
                  draggable
                  className={cx(
                    "flex cursor-pointer flex-col items-center rounded border px-5 py-2 transition-colors",
                  )}
                  onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                  onDragEnd={() => dragStop(false)}
                >
                  <div
                    className="h-10 w-10"
                    dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                  />
                  <div
                    className="w-full text-center text-sm"
                    title={block.getLabel()}
                  >
                    {block.getLabel()}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
