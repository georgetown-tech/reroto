"use server"

import { TransferObject } from "./types";

function getMarkdown(item:{rendered:string}):string {

    return item.rendered || ""

}

export async function downloadWordpress(params: { domain:string; host:string; }) {

    const metadataReq = await fetch(`${params.domain}/wp-json/`)
    const metadataData = await metadataReq.json()

    const name = metadataData.name
    const description = metadataData.description
    const domain = new URL(metadataData.url || metadataData.home).hostname

    let page = 1
    let tapReq = await fetch(`${params.domain}/wp-json/wp/v2/posts?per_page=100&page=${page}`)
    let articleCount = parseInt(tapReq.headers.get('X-Wp-Total') || "0")
    
    return {
        name,
        description,
        domain,
        articleCount
    }

}

export async function objectToQuery(transfer:TransferObject, siteId:string):Promise<string> {

    return [
        `Update "Site" SET "name" = '${transfer.name}', "description" = '${transfer.description}', "logo" = '${transfer.logo}', "customDomain" = '${transfer.domain}' WHERE "id"='${siteId}'`,
    ].join('; ') + ';'

}

export async function downloadWordpressArticleSegment(params: { domain:string; host:string; page:number; }) {

    let tapReq = await fetch(`${params.domain}/wp-json/wp/v2/posts?per_page=100&page=${params.page}`)
    let tapData = await tapReq.json()

    // console.log(tapData[0].id)

    return tapData.map((i:any) => {

        return {
            title: getMarkdown(i.title),
            description: getMarkdown(i.excerpt),
            content: getMarkdown(i.content),
            slug: i.slug,
            createdAt: new Date(i.date),
            updatedAt: new Date(i.modified),
            image: "",
            imageBlurhash: "",
            published: true,
        }

    })

}

export async function findWebsiteHost(formData:FormData) {

    let domain:string = formData.get("domain")?.toString() || "";
    let url = new URL(domain)

    try {

        const baseReq = await fetch(`https://${url.hostname}/`, {
            mode: 'no-cors'
        })
        const baseText = await baseReq.text()

        const metaReq = await fetch(`https://api.microlink.io/?url=${encodeURI(domain)}&palette=true&audio=false&video=false&iframe=false`)
        const metadata = await metaReq.json()

        if (baseText.includes("http://snosites.com")) {

            return {
                ...metadata,
                host: "SNO Sites",
                domain: `https://${url.hostname}`
            }

        }

        if (baseText.includes("http://getsnworks.com")) {

            return {
                ...metadata,
                host: "SNWorks",
                domain: `https://${url.hostname}`
            }

        }

        return {
            ...metadata,
            host: "Unknown",
            domain: `https://${url.hostname}`
        }

    } catch (error:any) {

        return {
            error: error.message
        }

    }


}