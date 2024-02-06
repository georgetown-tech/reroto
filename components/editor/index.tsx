"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Posts from "@/components/posts";
import CreatePostButton from "@/components/create-post-button";
import Link from "next/link";
import PageEditor from "@/components/page-editor";
import {
  Computer,
  Tablet,
  Phone,
  Laptop,
  Tv,
  Tv2,
  Fullscreen,
  ArrowBigRightDash,
  ArrowBigLeftDash,
  Settings,
} from "lucide-react";

// import grapesjs, { Editor as GrapeEditor } from "grapesjs";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import TabView from "@/components/tab-view";
import type { Editor as GrapeEditor, EditorConfig } from "grapesjs";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MAIN_BORDER_COLOR } from "./common";
import CustomModal from "./CustomModal";
import CustomAssetManager from "./CustomAssetManager";
import Topbar from "./Topbar";
import RightSidebar from "./RightSidebar";
// import "./style.css";

const gjsOptions: EditorConfig = {
  height: "100vh",
  storageManager: true,
  undoManager: { trackSelection: true },
  selectorManager: { componentFirst: true },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff",
    ],
    pages: [
      {
        name: "Home page",
        component: `<h1>GrapesJS React Custom UI</h1>`,
      },
    ],
  },
};

export default function Editor({ page }: { page: string }) {
  const [width, setWidth] = useState(1000);

  // const session = await getSession();
  // if (!session) {
  //   redirect("/login");
  // }

  // const data = await prisma.site.findUnique({
  //   where: {
  //     id: session.user.siteId,
  //   },
  // });

  // if (!data) {
  //   notFound();
  // }

  // const onEditor = (editor: Editor) => {
  //   console.log("Editor loaded", { editor });
  // };

  const onEditor = (editor: GrapeEditor) => {
    (window as any).editor = editor;
  };

  return (
    <GjsEditor
      className="gjs-custom-editor"
      grapesjs="https://unpkg.com/grapesjs"
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      options={gjsOptions}
      plugins={[
        {
          id: "gjs-blocks-basic",
          src: "https://unpkg.com/grapesjs-blocks-basic",
        },
        "gjs-preset-webpage",
      ]}
      onEditor={onEditor}
    >
      <div className={`flex h-full`}>
        <div className="gjs-column-m flex flex-grow flex-col">
          <Topbar page={page} setWidth={setWidth} />
          <div className="flex w-full justify-center overflow-hidden bg-slate-50">
            <div
              className="transition-width duration-300"
              style={{ width: width == 1000 ? "100%" : width }}
            >
              <Canvas className="gjs-custom-editor-canvas relative flex-grow" />
            </div>
          </div>
        </div>
        <RightSidebar className={`gjs-column-r w-[300px] border-l`} />
      </div>
      <ModalProvider>
        {({ open, title, content, close }) => (
          <CustomModal
            open={open}
            title={title}
            // eslint-disable-next-line react/no-children-prop
            children={content}
            close={close}
          />
        )}
      </ModalProvider>
      <AssetsProvider>
        {({ assets, select, close, Container }) => (
          <Container>
            <CustomAssetManager assets={assets} select={select} close={close} />
          </Container>
        )}
      </AssetsProvider>
    </GjsEditor>
  );
}
