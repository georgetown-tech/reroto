// @ts-nocheck
import React from "react";
import { useNode, Element } from "@craftjs/core";

export function RowChild({ children }: { children: any }) {
  const {
    connectors: { connect },
  } = useNode();

  return <div ref={connect}>{children}</div>;
}

export default function Row({
  gap = 5,
  padding = 5,
}: {
  gap: number;
  padding: number;
}) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className="flex w-full flex-row"
      style={{ gap: `${gap}px`, padding: `${padding}px` }}
    >
      <Element id="row_element" is={"div"} canvas></Element>
    </div>
  );
}
RowChild.craft = {
  props: {},
  rules: {
    canDrop: () => true,
    canDrag: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {},
};
