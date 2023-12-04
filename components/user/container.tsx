import React from "react";
import { useNode, Element } from "@craftjs/core";

export default function Container({ background, padding = 0, children }) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className="rounded border shadow"
      style={{ background, padding: `${padding}px` }}
    >
      {children}
    </div>
  );
}
