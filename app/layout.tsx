import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/auth";

const title = "ReRoto – Elevate Your Newsroom Efficiency";
const description =
  "Discover seamless collaboration, streamlined workflows, and unparalleled editorial control— ReRoto CMS, empowering your newsroom.";
const image = "https://reroto.com/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://reroto.com/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@reroto",
  },
  metadataBase: new URL("https://reroto.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await validateRequest();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        {/* <SessionProvider value={session}> */}
        <Providers>
          {children}
          <Analytics />
        </Providers>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
