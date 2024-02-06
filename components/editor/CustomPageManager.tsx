import * as React from "react";
import { PagesResultProps } from "@grapesjs/react";
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from "./common";
import { Delete } from "lucide-react";

export default function CustomPageManager({
  pages,
  selected,
  add,
  select,
  remove,
}: PagesResultProps) {
  const addNewPage = () => {
    const nextIndex = pages.length + 1;
    add({
      name: `New page ${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1>`,
    });
  };

  return (
    <div className="gjs-custom-page-manager">
      <div className="p-2">
        <button type="button" className={BTN_CLS} onClick={addNewPage}>
          Add new page
        </button>
      </div>
      {pages.map((page, index) => (
        <div
          key={page.getId()}
          className={cx(
            "flex items-center border-b px-4 py-2",
            index === 0 && "border-t",
            MAIN_BORDER_COLOR,
          )}
        >
          <button
            type="button"
            className="flex-grow text-left"
            onClick={() => select(page)}
          >
            {page.getName() || "Untitled page"}
          </button>
          {selected !== page && (
            <button type="button" onClick={() => remove(page)}>
              <Delete />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
