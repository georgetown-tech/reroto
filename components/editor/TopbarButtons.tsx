import * as React from "react";
import { useEditor } from "@grapesjs/react";
// import {
//   mdiArrowULeftTop,
//   mdiArrowURightTop,
//   mdiBorderRadius,
//   mdiFullscreen,
//   mdiXml,
// } from '@mdi/js';
// import Icon from '@mdi/react';
import { useEffect, useState } from "react";
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from "./common";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Fullscreen,
  Laptop,
  Tablet,
  Tv2,
} from "lucide-react";
import { saveGrape } from "@/lib/html";
import { useRouter } from "next/router";

interface CommandButton {
  id: string;
  iconPath?: string;
  options?: Record<string, any>;
  disabled?: () => boolean;
}

export default function TopbarButtons({
  className,
  setWidth,
  page,
}: {
  className?: string;
  setWidth: Function;
  page: string;
}) {
  const editor = useEditor();
  const [, setUpdateCounter] = useState(0);
  const { UndoManager, Commands } = editor;
  // const router = useRouter();

  useEffect(() => {
    const cmdEvent = "run stop";
    const updateEvent = "update";
    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id: string) => {
      // cmdButtons.find((btn) => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, []);

  const save = async () => {
    try {
      const formData = new FormData();
      formData.append("components", JSON.stringify(editor.getComponents()));
      formData.append("page", page);

      const response = await saveGrape(formData);

      // router.push("/design/" + page);
    } catch (error: unknown) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => {
            setWidth(1000);
          }}
        >
          <Tv2 />
        </button>
        <button
          onClick={() => {
            setWidth(700);
          }}
        >
          <Laptop />
        </button>
        <button
          onClick={() => {
            setWidth(360);
          }}
        >
          <Tablet />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <button
          onClick={() =>
            Commands.isActive("core:undo")
              ? Commands.stop("core:undo")
              : Commands.run("core:undo", {})
          }
          disabled={!UndoManager.hasUndo()}
        >
          <ArrowBigLeftDash />
        </button>
        <button
          onClick={() =>
            Commands.isActive("core:redo")
              ? Commands.stop("core:redo")
              : Commands.run("core:redo", {})
          }
          disabled={!UndoManager.hasRedo()}
        >
          <ArrowBigRightDash />
        </button>
        <button>
          <Fullscreen
            onClick={() =>
              Commands.isActive("core:fullscreen")
                ? Commands.stop("core:fullscreen")
                : Commands.run("core:fullscreen", { target: "#root" })
            }
            // disabled={disabled?.()}
          />
        </button>
        <button
          onClick={() => {
            save();
          }}
          className="w-min rounded bg-slate-800 px-4 font-bold text-slate-50"
        >
          Save
        </button>
      </div>
    </>
  );

  // return (
  //   <div className={cx("flex gap-3", className)}>
  //     {cmdButtons.map(({ id, iconPath, disabled, options = {} }) => (
  //       <button
  //         key={id}
  //         type="button"
  //         className={cx(
  //           BTN_CLS,
  //           MAIN_BORDER_COLOR,
  //           Commands.isActive(id) && "text-sky-300",
  //           disabled?.() && "opacity-50",
  //         )}
  // onClick={() =>
  //   Commands.isActive(id)
  //     ? Commands.stop(id)
  //     : Commands.run(id, options)
  // }
  // disabled={disabled?.()}
  //       >
  //         {/* <Icon path={iconPath} size={1} />
  //          */}
  //         A
  //       </button>
  //     ))}
  //   </div>
  // );
}
