import * as React from "react";
import { X } from "lucide-react";
import { MAIN_BG_COLOR, MAIN_TXT_COLOR, cx } from "./common";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  p: 2,
};

// interface CustomModalProps extends Omit<ModalProps, "title"> {
//   title: React.ReactNode;
//   close: () => void;
// }

export default function CustomModal({
  children,
  title,
  close,
  ...props
}: any) {
  return (
    <div>
      <div className="flex pb-3">
        <div className="flex-grow text-lg">{title}</div>
        <div onClick={close} className="cursor-pointer">
          <X />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}
