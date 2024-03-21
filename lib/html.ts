"use server";

import prisma from "@/lib/prisma";
// import { getSession, withSiteAuth } from "@/lib/auth";
// import {ite } from "@prisma/client";
import grapesjs from "grapesjs";
import { validateRequest } from "./auth";

export const compileToHtml = (siteData: any, url:string) => {
  let ui = JSON.parse(siteData.siteData)

  return JSON.stringify(ui['footer'])

  // const editor = grapesjs.init({ headless: true });
  
  // if (ui == null) return ""

  // if (url == "/") {

  //   return [
  //     grapeToHtml(ui['footer'] || null, editor),
  //     // grapeToHtml(ui['home'] || null, editor),
  //   ].join('')

  // }

  // return ""

}

export const grapeToHtml = (nodes:any[], editor:any):string => {

  if (nodes == null) return ""

  return ""

}

export const grapesToStored = (grapes:any) => {



}

export const bindingToBlockConfig = (binding:any) => {

  return {
    label: binding.name,
    category: binding.category,
  }

}

export const saveGrape = async (_: FormData) => {
    const { user } = await validateRequest();
    if (!user) {
      return {
        error: "Not authenticated",
      };
    }
    if (!user.siteId) {
      return {
        error: "No site",
      };
    }
    
    let siteId = user.siteId

    const siteData = await prisma.site.findFirst({
        where: {
            id: siteId
        }
    });

    let data = JSON.parse(siteData?.siteData?.toString() || "{}") || {}

    console.log(data)

    if (data == null) data = {}

    data[_.get("page")?.toString() || ""] = JSON.parse(_.get("components")?.toString() || "");

    console.log("AFTER")
    console.log(data)

    await prisma.site.update({
        where: {
            id: siteId
        },
        data: {
          siteData: JSON.stringify(data)
        }
    });

    // JSON.stringify(editor.getComponents());
      
}