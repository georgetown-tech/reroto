import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import HoyaLogo from "@/res/hoya.svg";
import {
  Pen,
  Users,
  Focus,
  FolderKanban,
  Paintbrush,
  SearchCode,
} from "lucide-react";
import crypto from "crypto";
import InviteEmail from "@/emails/invite";
import { render } from "@react-email/render";
import { downloadWordpressArticleSegment } from "@/lib/transfer";

// import {StlViewer} from "react-stl-viewer";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export default async function IndexPage({}) {
  let result = await downloadWordpressArticleSegment({
    domain: "https://rmusentrymedia.com/",
    host: "",
    page: 2,
  });

  return (
    <pre
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(result, null, 4)
          .replace(/\</g, "&lt;")
          .replace(/\>/g, "&gt;"),
      }}
    ></pre>
  );

  // let email = "wpm45@georgetown.edu";
  // let role = 4;
  // let username = email.split("@")[0];
  // let hash = crypto.createHash("md5").update(email).digest("hex");

  // const ip = "141.161.163.250";

  // let req = await fetch(`http://ip-api.com/json/${ip}`);
  // let reqJson = await req.json();

  // const siteData = {
  //   name: "Disruptive News",
  //   logo: "https://zgaeanxdtt34dafb.public.blob.vercel-storage.com/8M1l2FM-rrMvEfLDfTF3MQZmCd6crsj1wMX8lm.png",
  //   banner:
  //     "https://zgaeanxdtt34dafb.public.blob.vercel-storage.com/zRIvmjj-HC75lbGgZ9SH28ggE2dpPHp1kQDiwi.png",
  // };

  // const inviter = {
  //   name: "William McGonagle",
  //   email: "wpmcgonagle@gmail.com",
  // };

  // const emailContent = {
  //   username: username,
  //   userImage: `https://gravatar.com/avatar/${hash}`,
  //   invitedByUsername: inviter.name,
  //   invitedByEmail: inviter.email,
  //   teamName: siteData?.name || "",
  //   teamLogo: siteData?.logo || "",
  //   teamBanner: siteData?.banner || "",
  //   inviteLink: "https://reroto.com",
  //   inviteFromIp: ip,
  //   inviteFromLocation: `${reqJson.city}, ${reqJson.region}`,
  // };

  // const emailHtml = render(InviteEmail(emailContent));
  // return <div dangerouslySetInnerHTML={{ __html: emailHtml }}></div>;
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
