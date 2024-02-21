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

import Row from "@/components/user/row";
import { bindingToBlockConfig } from "@/lib/html";

const gjsOptions: EditorConfig = {
  height: "100vh",
  // storageManager: {
  //   autosave: false,
  //   setStepsBeforeSave: 1,
  //   type: "remote",
  //   // urlStore: 'http://cimailer.dev/templates/template',
  //   // urlLoad: 'http://cimailer.dev/templates/template',
  //   contentTypeJson: true,
  // },
  storageManager: false,
  undoManager: { trackSelection: true },
  selectorManager: { componentFirst: true },
};

export default function Editor({
  page,
  content,
}: {
  page: string;
  content: any;
}) {
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

    const projectData = editor.getProjectData();
    console.log(projectData);

    // console.log(content);

    editor.setComponents(content);

    console.log(editor.getComponents());

    // editor.load();

    // console.log(content);
    //   try {

    //   editor.Blocks.add(bindingToBlockConfig(Row));

    // } catch (e) {

    //   console.log(e)

    // }
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
        // "gjs-preset-webpage",
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
