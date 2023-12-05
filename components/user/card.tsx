// @ts-nocheck
import React from "react";
import Text from "./text";
import Button from "./button";
import Container from "./container";

export default function Card({
  background,
  padding = 20,
}: {
  background: String;
  padding: number;
}) {
  return (
    <Container background={background} padding={padding}>
      <div className="text-only">
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </div>
      <div className="buttons-only">
        <Button
          size="small"
          text="Learn more"
          variant="contained"
          color="primary"
        />
      </div>
    </Container>
  );
}
