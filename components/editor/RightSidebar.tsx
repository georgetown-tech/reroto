import * as React from "react";
import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react";
// import {
//   mdiBrush,
//   mdiLayers,
//   mdiViewGridPlus,
//   mdiTextBoxMultiple,
//   mdiCog,
// } from "@mdi/js";
// import Icon from "@mdi/react";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import CustomBlockManager from "./CustomBlockManager";
import { MAIN_BORDER_COLOR, cx } from "./common";
import CustomPageManager from "./CustomPageManager";
import CustomLayerManager from "./CustomLayerManager";
import CustomSelectorManager from "./CustomSelectorManager";
import CustomStyleManager from "./CustomStyleManager";
import CustomTraitManager from "./CustomTraitManager";
import TabView from "../tab-view";

const defaultTabProps = {
  className: "!min-w-0",
};

export default function RightSidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"gjs-right-sidebar flex w-[300px] flex-col border-l p-4"}>
      <TabView
        tabLabels={["Properties", "Layers", "Blocks"]}
        tabContents={[
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
            <TraitsProvider>
              {(props) => <CustomTraitManager {...props} />}
            </TraitsProvider>
          </>,
          <>
            <LayersProvider>
              {(props) => <CustomLayerManager {...props} />}
            </LayersProvider>
          </>,
          <>
            <BlocksProvider>
              {(props) => <CustomBlockManager {...props} />}
            </BlocksProvider>
          </>,
        ]}
      />
    </div>
  );
}
