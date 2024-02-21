import * as React from "react";
import { useEditor } from "@grapesjs/react";
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import type { PropertyRadio, PropertySelect, Trait } from "grapesjs";
import { ROUND_BORDER_COLOR, cx } from "./common";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({
  trait,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    trait.setValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get("command");
    if (command) {
      typeof command === "string"
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== "undefined" ? value : defValue;

  let inputToRender = (
    <input
      placeholder={defValue}
      value={value}
      onChange={onChange}
      // size="small"
      // fullWidth
      className="w-full rounded border border-slate-300 px-3 shadow"
    />
  );

  switch (type) {
    case "select":
      {
        inputToRender = (
          <select
            className="w-full rounded border border-slate-300 px-3 shadow"
            value={value}
            onChange={onChange}
          >
            {trait.getOptions().map((option) => (
              <option
                key={trait.getOptionId(option)}
                value={trait.getOptionId(option)}
              >
                {trait.getOptionLabel(option)}
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
              value={value}
              placeholder={defValue}
              type="text"
            />
          </div>
        );
      }
      break;
    case "checkbox":
      {
        inputToRender = (
          <div>
            <input
              type="checkbox"
              value={value}
              onChange={(ev) => trait.setValue(ev.target.checked)}
            />
          </div>
        );
      }
      break;
    case "button":
      {
        inputToRender = (
          <button className="w-full" onClick={handleButtonClick}>
            {trait.getLabel()}
          </button>
        );
      }
      break;
  }

  return (
    <div {...rest} className={cx("mb-3 w-full px-1")}>
      <div className={cx("mb-2 flex items-center")}>
        <div className="flex-grow font-bold capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  );
}
