"use server";

import prisma from "@/lib/prisma";
import { Post, Site, User } from "@prisma/client";
import { revalidateTag } from "next/cache";
// import { withPostAuth, withSiteAuth } from "./auth";
import { lucia, validateRequest, withPostAuth, withSiteAuth } from "@/lib/auth";
import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from "@/lib/domains";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { getBlurDataURL } from "@/lib/utils";
import { render } from '@react-email/render';
import { SES } from '@aws-sdk/client-ses';
import InviteEmail from '@/emails/invite';
import { headers } from 'next/headers'
import crypto from 'crypto';

const stripe = require('stripe')(process.env.STRIPE_KEY);

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const inviteTeammate = async (formData: FormData) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }

  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  const siteData = await prisma.site.findUnique({
    where: {
      id: user.siteId
    }
  })

  const email = formData.get("email") as string;
  const role = parseInt(formData.get("role") as string);

  try {
    
    let username = email.split('@')[0]
    let hash = crypto.createHash('md5').update(email).digest("hex")
    
    let req = await fetch(`http://ip-api.com/json/${ip}`)
    let reqJson = await req.json()

    const response = await prisma.invite.create({
      data: {
        email: email,
        role: role,
        siteId: user.siteId,
        creatorId: user.id
      },
    });

    const emailContent = {
      username: username,
      userImage: `https://gravatar.com/avatar/${hash}`,
      invitedByUsername: user.displayName,
      invitedByEmail: user.email,
      teamName: siteData?.name || "",
      teamLogo: siteData?.logo || "",
      teamBanner: siteData?.image || "",
      inviteLink: `https://app.reroto.com/join/${response.id}`,
      inviteFromIp: ip,
      inviteFromLocation: `${reqJson.city}, ${reqJson.region}`,
    }

    const ses = new SES({ 
      region: process.env.AWS_SES_REGION,
     })
    const emailHtml = render(InviteEmail(emailContent));
    const emailText = render(InviteEmail(emailContent), { plainText: true });

    const params = {
      Source: 'no-reply@reroto.com',
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailHtml,
          },
          Text: {
            Charset: 'UTF-8',
            Data: emailText
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `You are invited to ${siteData?.name}`,
        },
      },
    };

    await ses.sendEmail(params);
    
    return response;
    
  } catch (error: any) {
    console.log(error)
    return {
      error: error.message,
    };
  }
};

export const createTranscript = async (formData: FormData) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const src = formData.get("audioSrc") as string;

  try {
    const res = await fetch("https://api.deepgram.com/v1/listen?model=nova&punctuate=true&diarize=true", {
    method: "POST",  
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${process.env.DEEPGRAM_API_KEY}`
      },
      body: JSON.stringify({
        url: src
      })
    });
    const json = await res.json()

    const response = await prisma.transcription.create({
      data: {
        name,
        description,
        url: src,
        seconds: 40 * 60,
        userId: user.id,
        transcription: json,
        siteId: user.siteId
      },
    });

    // console.log(response);

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createMedia = async (formData: FormData) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }
  const src = formData.get("fileSrc") as string;
  const name = formData.get("name") as string;
  const mime = formData.get("mime") as string;

  try {
    const response = await prisma.media.create({
      data: {
        name,
        meta: JSON.stringify({}),
        url: src,
        size: 0,
        mime,
        userId: user.id,
        siteId: user.siteId
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createSite = async (formData: FormData):Promise<Site | Error> => {
  const { user } = await validateRequest();
  if (!user) {
    return new Error("Not authenticated");
  }
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  console.log(
    `Generating ${type} website with name: "${name}", subdomain: ${subdomain}`,
  );

  try {
    const response = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
      },
    });
    const _user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        siteId: response.id,
        role: 0,
      },
    });

    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return new Error(`This subdomain is already taken`);
    } else {
      return new Error(error.message);
    }
  }
};

export const updateSiteAppearance = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {

    try {

      const value = formData.get(key) as string;

      const siteData:any = site.siteData || {}

      if (siteData['design'] == undefined) siteData['design'] = {}
      siteData['design'][key] = value

      await prisma.site.update({
        where: {
          id: site.id
        },
        data: {
          siteData
        }
      })

      // console.log(JSON.stringify(siteData, null, 4))

      return { message: `Successfully updated ${key}.` }

    } catch (error:any) { 

      return { error: error.toString() }

    }

  });

export const updateSiteBilling = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {

    try {

      const value = formData.get(key) as string;
      const response = await stripe.customers.update(
        site.stripeId,
        {
          [key]: value
        }
      );

      return { message: `Successfully updated ${key}.` }

    } catch (error) {

      return { error: "Error updating billing information." }

    }

  });

// TODO: Add back site auth
export const updateSite = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "customDomain") {
        if (value.includes("vercel.pub")) {
          return {
            error: "Cannot use vercel.pub subdomain as your custom domain",
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: value,
            },
          });
          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === "") {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);

          /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other sites
          const apexDomain = getApexDomain(`https://${site.customDomain}`);
          const domainCount = await prisma.site.count({
            where: {
              OR: [
                {
                  customDomain: apexDomain,
                },
                {
                  customDomain: {
                    endsWith: `.${apexDomain}`,
                  },
                },
              ],
            },
          });

          // if the apex domain is being used by other sites
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(site.customDomain);
          } else {
            // this is the only site using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              site.customDomain
            );
          }
          
          */
        }
      } else if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = key === "image" ? await getBlurDataURL(url) : null;

        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          },
        });
      } else {
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: value,
          },
        });
      }
      console.log(
        "Updated site data! Revalidating tags: ",
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${site.customDomain}-metadata`,
      );
      await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      site.customDomain &&
        (await revalidateTag(`${site.customDomain}-metadata`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  });

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
  try {
    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    response.customDomain &&
      (await revalidateTag(`${site.customDomain}-metadata`));
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: Site) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.post.create({
    data: {
      siteId: site.id,
      userId: user.id,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

  return response;
});

export const setupBilling = withSiteAuth(async (_: FormData, site: Site) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }
  
  if (site.stripeId != null) return {
    error: "Billing Already Set Up"
  }

  const addressLine1 = _.get("addressLine1")
  const addressLine2 = _.get("addressLine2")
  const state = _.get("state")
  const city = _.get("city")
  const zip = _.get("zip")

  const customer = await stripe.customers.create({
    name: `${site.name} (${site.customDomain != undefined ? site.customDomain : `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` })`,
    email: user.email,
    address: {
      city: city,
      line1: addressLine1,
      line2: addressLine2,
      state: state,
      postal_code: zip
    },
    shipping: {
      name: `${user.displayName} (${site.name})`,
      address: {
      city: city,
      line1: addressLine1,
      line2: addressLine2,
      state: state,
      postal_code: zip
      }
    }, 
    description: site.description
  });

  let response = await prisma.site.update({
    where: {
      id: site.id
    },
    data: {
      stripeId: customer.id
    }
  })

  return response;
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Post) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!post) {
    return {
      error: "Post not found",
    };
  }
  if (post.userId != user.id) {
    return {
      error: "You don't own this post",
    };
  }
  try {
    const response = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: { 
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

// TODO: Add back post auth
export const updatePostMetadata = withPostAuth(
  async (
    formData: FormData,
    post: Post & {
      site: Site;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      await revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      post.site?.customDomain &&
        (await revalidateTag(`${post.site?.customDomain}-posts`),
        await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  });

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
    const response = await prisma.post.delete({
      where: {
        id: post.id,
      },
      select: {
        siteId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const deleteAccount = async (
  formData: FormData,
  _id: unknown,
  key: string):Promise<User | Error> => {
    const { user } = await validateRequest();
    if (!user) {
      return new Error("Not authenticated");
    }

  try {
    const response = await prisma.user.delete({
      where: {
        id: user.id,
      }
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const { user } = await validateRequest();
  if (!user) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    if (key === "image") {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return {
          error:
            "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
        };
      }

      console.log(key)
      console.log(value)
      
      const file = formData.get(key) as File;
      const filename = `${nanoid()}.${file.type.split("/")[1]}`;

      const { url } = await put(filename, file, {
        access: "public",
      });

      const response = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          "image": url,
          // ...(blurhash && { imageBlurhash: blurhash }),
        },
      });
      return response;
    } else {
      const response = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          [key]: value,
        },
      });
      return response;
    }
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}
