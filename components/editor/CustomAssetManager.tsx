import * as React from "react";
import { AssetsResultProps, useEditor } from "@grapesjs/react";
import { X } from "lucide-react";
import type { Asset } from "grapesjs";
import { BTN_CLS } from "./common";

export type CustomAssetManagerProps = Pick<
  AssetsResultProps,
  "assets" | "close" | "select"
>;

export default function CustomAssetManager({
  assets,
  select,
}: CustomAssetManagerProps) {
  const editor = useEditor();

  const remove = (asset: Asset) => {
    editor.Assets.remove(asset);
  };

  return (
    <div className="grid grid-cols-3 gap-2 pr-2">
      {assets.map((asset) => (
        <div
          key={asset.getSrc()}
          className="group relative overflow-hidden rounded"
        >
          <img className="display-block" src={asset.getSrc()} />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-end bg-zinc-700/75 p-5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              className={BTN_CLS}
              onClick={() => select(asset, true)}
            >
              Select
            </button>
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => remove(asset)}
            >
              <X />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
