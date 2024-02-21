import * as React from "react";
import { SelectorsResultProps } from "@grapesjs/react";
import { X, Plus } from "lucide-react";
import { MAIN_BORDER_COLOR, cx } from "./common";

export default function CustomSelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, "Container">) {
  const addNewSelector = () => {
    const next = selectors.length + 1;
    addSelector({ name: `new-${next}`, label: `New ${next}` });
  };

  const targetStr = targets.join(", ");

  return (
    <div className="gjs-custom-selector-manager flex flex-col gap-2 p-2 text-left">
      <div className="flex items-center">
        <div className="w-full flex-grow font-bold">Selectors</div>
        <select
          className="w-full rounded border border-slate-300 px-3 shadow"
          value={selectedState}
          onChange={(ev) => setState(ev.target.value)}
          // displayEmpty
        >
          <option value="">- State -</option>
          {states.map((state) => (
            <option value={state.id} key={state.id}>
              {state.getName()}
            </option>
          ))}
        </select>
      </div>
      <div
        className={cx(
          "flex min-h-[45px] flex-wrap items-center gap-2 rounded border bg-white p-2",
        )}
      >
        {targetStr ? (
          <button
            type="button"
            onClick={addNewSelector}
            className={cx("rounded border px-2 py-1")}
          >
            <Plus />
          </button>
        ) : (
          <div className="opacity-70">Select a component</div>
        )}
        {selectors.map((selector) => (
          <div
            key={selector.toString()}
            className="flex items-center gap-1 whitespace-nowrap rounded border bg-white px-2 py-1 font-bold shadow"
          >
            <div>{selector.getLabel()}</div>
            <button type="button" onClick={() => removeSelector(selector)}>
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
      {/* <div>
        Selected: <span className="opacity-70">{targetStr || "None"}</span>
      </div> */}
    </div>
  );
}
