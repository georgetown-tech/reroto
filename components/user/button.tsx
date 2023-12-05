// @ts-nocheck

import React from "react";
import { useNode } from "@craftjs/core";

export default function Button({
  size,
  variant,
  color,
  children,
}: {
  size: string;
  variant: string;
  color: string;
  children: any;
}) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return <button ref={(ref) => connect(drag(ref))}>{children}</button>;
}
