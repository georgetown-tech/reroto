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
        <div className="flex-grow">Selectors</div>
        {/* <FormControl size="small">
          <Select
            value={selectedState}
            onChange={(ev) => setState(ev.target.value)}
            displayEmpty
          >
            <MenuItem value="">- State -</MenuItem>
            {states.map((state) => (
              <MenuItem value={state.id} key={state.id}>
                {state.getName()}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </div>
      <div
        className={cx(
          "flex min-h-[45px] flex-wrap items-center gap-2 rounded border bg-black/30 p-2",
          MAIN_BORDER_COLOR,
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
            className="flex items-center gap-1 whitespace-nowrap rounded bg-sky-500 px-2 py-1"
          >
            <div>{selector.getLabel()}</div>
            <button type="button" onClick={() => removeSelector(selector)}>
              <X />
            </button>
          </div>
        ))}
      </div>
      <div>
        Selected: <span className="opacity-70">{targetStr || "None"}</span>
      </div>
    </div>
  );
}
