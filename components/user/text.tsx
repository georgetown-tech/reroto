// @ts-nocheck
import React from "react";
import { useNode } from "@craftjs/core";

export default function Text({
  text,
  fontSize,
}: {
  text: string;
  fontSize: number;
}) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <p>{text}</p>
    </div>
  );
}
