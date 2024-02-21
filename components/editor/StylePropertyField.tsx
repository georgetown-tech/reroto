import * as React from "react";
import { useEditor } from "@grapesjs/react";
// import {
//   mdiArrowDownDropCircle,
//   mdiArrowUpDropCircle,
//   mdiClose,
//   mdiDelete,
//   mdiPlus,
// } from "@mdi/js";
// import Icon from "@mdi/react";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import MenuItem from "@mui/material/MenuItem";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import Select from "@mui/material/Select";
// import Slider from "@mui/material/Slider";
// import TextField from "@mui/material/TextField";

import type {
  Property,
  PropertyComposite,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";
import { BTN_CLS, ROUND_BORDER_COLOR, cx } from "./common";
import {
  ChevronDown,
  ChevronUp,
  Delete,
  MoveDown,
  MoveUp,
  Plus,
  X,
} from "lucide-react";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export default function StylePropertyField({
  prop,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete });
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ["image"],
      accept: "image/*",
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  // return <></>

  let inputToRender = (
    <input
      placeholder={defValue}
      value={valueString}
      onChange={onChange}
      // size="small"
      // fullWidth
      className="w-full rounded border border-slate-300 px-3 shadow"
    />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <div onChange={onChange}>
            {radioProp.getOptions().map((option) => (
              <div
                className="flex w-full flex-row items-center gap-1"
                key={radioProp.getOptionId(option)}
              >
                <input
                  type="radio"
                  name={radioProp.getName()}
                  id={radioProp.getOptionId(option)}
                  value={radioProp.getOptionId(option)}
                />
                <label
                  htmlFor={radioProp.getOptionId(option)}
                  className="text-sm capitalize"
                >
                  {radioProp.getOptionLabel(option)}
                </label>
              </div>
            ))}
          </div>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        inputToRender = (
          <select
            className="w-full rounded border border-slate-300 px-3 shadow"
            value={value}
            onChange={onChange}
          >
            {selectProp.getOptions().map((option) => (
              <option
                key={selectProp.getOptionId(option)}
                value={selectProp.getOptionId(option)}
              >
                {selectProp.getOptionLabel(option)}
              </option>
            ))}
          </select>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <div className="flex w-full flex-row overflow-hidden rounded border border-slate-300 shadow">
            <input
              type="color"
              className="m-0 aspect-square h-full cursor-pointer overflow-hidden bg-white"
              value={valueWithDef}
              onChange={(ev) => handleChange(ev.target.value)}
            />
            <input
              className="w-full border-0 px-3"
              onChange={onChange}
              value={valueString}
              placeholder={defValue}
              type="text"
            />
          </div>
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;
        inputToRender = (
          <input
            className="w-full"
            type="range"
            value={parseFloat(value)}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onChange={onChange}
          />
        );
      }
      break;
    case "file":
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="inline-block h-[50px] w-[50px] cursor-pointer rounded bg-cover bg-center"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button type="button" onClick={openAssets} className={BTN_CLS}>
              Select Image
            </button>
          </div>
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        inputToRender = (
          <div
            className={cx("flex flex-wrap rounded border border-dashed p-2")}
          >
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === "text-shadow";
        inputToRender = (
          <div className={cx("flex min-h-[54px] flex-col gap-2")}>
            {layers.map((layer) => (
              <div key={layer.getId()}>
                <div className="flex items-center gap-1 rounded border bg-white px-2 py-1">
                  <button onClick={() => layer.move(layer.getIndex() - 1)}>
                    <ChevronUp size={18} />
                  </button>
                  <button onClick={() => layer.move(layer.getIndex() + 1)}>
                    <ChevronDown size={18} />
                  </button>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className={cx(
                      "flex min-h-[17px] min-w-[17px] justify-center bg-white text-sm text-black",
                      ROUND_BORDER_COLOR,
                    )}
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && "T"}
                  </div>
                  <button onClick={() => layer.remove()}>
                    <X size={18} />
                  </button>
                </div>
                {layer.isSelected() && (
                  <div className="mt-2 flex flex-wrap border-0 border-l-2 pl-2">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
  }

  return (
    <div {...rest} className={cx("mb-3 px-1", "w-full")}>
      <div
        className={cx(
          "mb-2 flex flex-row items-center",
          canClear && "text-sky-300",
        )}
      >
        <div className="font-bold capitalize">{prop.getLabel()}</div>
        {canClear && (
          <button onClick={() => prop.clear()}>
            <X />
          </button>
        )}
        {type === "stack" && (
          <button
            className="!ml-2"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <Plus />
          </button>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
