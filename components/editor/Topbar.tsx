import * as React from "react";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
// import FormControl from '@mui/material/FormControl';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import { cx } from "./common";
import TopbarButtons from "./TopbarButtons";

export default function Topbar({
  setWidth,
  page,
}: {
  setWidth: Function;
  page: string;
}) {
  return (
    <WithEditor>
      <div className="flex w-full flex-row justify-between border-b p-2">
        <TopbarButtons setWidth={setWidth} page={page} />
      </div>
    </WithEditor>
  );
}
