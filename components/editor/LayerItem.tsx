import * as React from "react";
import { useEditor } from "@grapesjs/react";
// import { mdiEyeOffOutline, mdiEyeOutline, mdiMenuDown } from '@mdi/js';
// import Icon from '@mdi/react';
import { Eye, EyeOff, ArrowDown } from "lucide-react";
import type { Component } from "grapesjs";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { MAIN_BORDER_COLOR, cx } from "./common";

export declare interface LayerItemProps
  extends React.HTMLProps<HTMLDivElement> {
  component: Component;
  level: number;
  draggingCmp?: Component;
  dragParent?: Component;
}

const itemStyle = { maxWidth: `100%` };

export default function LayerItem({
  component,
  draggingCmp,
  dragParent,
  ...props
}: LayerItemProps) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef<HTMLDivElement>(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join("-");
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      (layerRef.current as any).__cmp = component;
    }
  }, [component]);

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        key={cmp.getId()}
        component={cmp}
        level={level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ));
  }, [cmpHash, draggingCmp, dragParent]);

  const toggleOpen = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev: MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event: MouseEvent) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered: boolean) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  const wrapperCls = cx(
    "layer-item flex flex-col",
    selected && "bg-sky-50",
    (!visible || isDragging) && "opacity-50",
  );

  return (
    <div className={wrapperCls}>
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className="group max-w-full"
        data-layer-item
        ref={layerRef}
      >
        <div
          className={cx(
            "flex items-center gap-1 border-b p-1 pr-2 hover:cursor-pointer",
            level === 0 && "border-t",
            MAIN_BORDER_COLOR,
            isHovered && "bg-sky-100",
            selected && "bg-sky-100",
          )}
        >
          <div
            style={{ marginLeft: `${level * 10}px` }}
            className={cx(
              "cursor-pointer",
              !components.length && "pointer-events-none opacity-0",
            )}
            onClick={toggleOpen}
          >
            <ArrowDown
              className="transition-transform duration-300"
              style={{ rotate: `${open ? 0 : -90}deg` }}
            />
          </div>
          <div className="flex-grow truncate" style={itemStyle}>
            {name}
          </div>
          <div
            className={cx(
              "cursor-pointer group-hover:opacity-100",
              visible ? "opacity-0" : "opacity-100",
            )}
            onClick={toggleVisibility}
          >
            {visible ? <Eye /> : <EyeOff />}
          </div>
        </div>
      </div>
      {!!(open && components.length) && (
        <div className={cx("max-w-full", !open && "hidden")}>{cmpToRender}</div>
      )}
    </div>
  );
}
