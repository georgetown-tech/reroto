// @ts-nocheck
"use client";

import React from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
// import TextComponent from "./user/text-component.tsx";

import {
  MousePointerSquare,
  Text as TextIcon,
  Container as ContainerIcon,
} from "lucide-react";

import Text from "./user/text";
import Card from "./user/card";
import Container from "./user/container";
import Button from "./user/button";
// import Canvas from "./user/canvas";
import Row, { RowChild } from "./user/row";

export function Topbar() {
  const { connectors, query } = useEditor();

  return (
    <div className="flex  flex-row gap-1 p-2">
      <button
        ref={(ref) =>
          connectors.create(ref, <Button text="Click me" size="small" />)
        }
        className="rounded border bg-white p-2 shadow"
      >
        <MousePointerSquare size={28} />
      </button>
      <button
        ref={(ref) =>
          connectors.create(ref, <Text text="Click me" size="small" />)
        }
        className="rounded border bg-white p-2 shadow"
      >
        <TextIcon size={28} />
      </button>
      <button
        ref={(ref) =>
          connectors.create(
            ref,
            <Element
              id="container"
              is={Container}
              padding={5}
              background="#fff"
              canvas
            />,
          )
        }
        className="rounded border bg-white p-2 shadow"
      >
        <ContainerIcon size={28} />
      </button>
      <button
        ref={(ref) => connectors.create(ref, <Row padding={5} gap={5} />)}
        className="rounded border bg-white p-2 shadow"
      >
        <ContainerIcon size={28} />
      </button>
    </div>
  );
}

export default function PageEditor() {
  return (
    <Editor resolver={{ Card, Button, Text, Container, Row, RowChild }}>
      <Topbar />
      <div className="rounded bg-gray-50 p-4">
        <Frame>
          <Element
            id="parent"
            is={Container}
            padding={5}
            background="#eee"
            canvas
          >
            <Container padding={5} background="#eee">
              <Element
                id="parent"
                is={Container}
                padding={5}
                background="#eee"
                canvas
              >
                <Button size="small" variant="outlined">
                  Click
                </Button>
                <Text size="small" text="Hi world!" />
                <Container padding={6} background="#fff">
                  <Text size="small" text="It's me again!" />
                </Container>
              </Element>
            </Container>
          </Element>
        </Frame>
      </div>
    </Editor>
  );
}
