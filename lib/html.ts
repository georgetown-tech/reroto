"use server";

import prisma from "@/lib/prisma";
import { getSession, withSiteAuth } from "@/lib/auth";
// import {ite } from "@prisma/client";

export const compilePage = (siteData: any, url:string) => {

  let ui = JSON.parse(siteData.siteData)

  if (url == "/") {

    return [
      arrayToHtml(ui['topbar']),
      arrayToHtml(ui['home'])
    ].join('')

  }

}

export const arrayToHtml = (nodes:any[]):string => {

  if (nodes == undefined) return ""

  return nodes.map(toHtml).join('')

}

export const toHtml = (node:any) => {

  if (node.type == "textnode") return node.content;
  if (node.type == "link") return `<a href="${node.href}">${node.content}</a>`

  if (node.name == "Row") return `<div class="flex flex-row w-full">${arrayToHtml(node.components)}</div>`
  if (node.name == "Cell") return `<div class="w-full h-full">${arrayToHtml(node.components)}</div>`

  return `<${node.tagName}>${arrayToHtml(node.components)}</${node.tagName}>`

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
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    if (!session?.user.siteId) {
      return {
        error: "No site",
      };
    }
    
    let siteId = session?.user.siteId

    const siteData = await prisma.site.findFirst({
        where: {
            id: siteId
        }
    });

    let data = JSON.parse(siteData?.siteData?.toString() || "") || {}

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