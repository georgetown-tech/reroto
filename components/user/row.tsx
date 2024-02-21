export const id = "row";
export const name = "Row";
export const description = "This is a row element, cells can sit inside of it.";
export const category = "Basic";

export const parameters = {
  padding: "vec4",
  margin: "vec4",
};

export default async function render({
  children,
  padding,
  margin,
}: {
  children: any[];
  padding: string;
  margin: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding,
        margin,
      }}
    >
      {children}
    </div>
  );
}
