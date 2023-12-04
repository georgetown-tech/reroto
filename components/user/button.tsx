import React from "react";
import { useNode } from "@craftjs/core";

export default function Button({ size, variant, color, children }) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <button
      ref={(ref) => connect(drag(ref))}
      size={size}
      variant={variant}
      color={color}
    >
      {children}
    </button>
  );
}
