"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Settings,
  FileCode,
  Bird,
  Github,
  Users,
  ChevronDown,
  KanbanSquare,
  LibraryBig,
  Wrench,
  ListMusic,
  Code,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getSiteFromPostId } from "@/lib/actions";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "post" && id) {
      return [
        {
          name: "Back to All Posts",
          href: `/posts`,
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Settings",
          href: `/post/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Overview",
        href: `/`,
        isActive: segments.length === 0,
        icon: <Bird width={18} />,
      },
      {
        name: "Posts",
        href: `/posts`,
        isActive: segments.includes("posts"),
        icon: <Newspaper width={18} />,
      },
      {
        name: "My Team",
        href: `/team`,
        isActive: segments.includes("team"),
        icon: <Users width={18} />,
      },
      {
        name: "Planning",
        href: `/plan`,
        isActive: segments.includes("plan"),
        icon: <KanbanSquare width={18} />,
      },
      {
        name: "Tools",
        children: [
          {
            name: "Design",
            href: `/design`,
            isActive: segments.includes("design"),
            icon: <Code width={18} />,
          },
          {
            name: "Transcribe",
            href: `/transcribe`,
            isActive: segments.includes("transcribe"),
            icon: <ListMusic width={18} />,
          },
          {
            name: "Media Library",
            href: `/media`,
            isActive: segments.includes("media"),
            icon: <LibraryBig width={18} />,
          },
        ],
        icon: <Wrench width={24} />,
      },
      {
        name: "Analytics",
        href: `/analytics`,
        isActive: segments.includes("analytics"),
        icon: <BarChart3 width={18} />,
      },
      {
        name: "Settings",
        href: `/settings`,
        isActive: segments.includes("settings"),
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <img
                src={
                  // @ts-ignore
                  session?.user?.logo || ""
                }
                alt="Logo"
                // objectFit="cover"
                className="h-8 w-full dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />
            </Link>
          </div>
          <div className="grid gap-1">
            {
              // @ts-ignore
              tabs.map(({ name, href, isActive, icon, children }) =>
                children == undefined ? (
                  <Link
                    key={name}
                    href={href || ""}
                    className={`flex items-center space-x-3 ${
                      isActive
                        ? "bg-stone-200 text-black dark:bg-stone-700"
                        : ""
                    } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
                  >
                    {icon}
                    <span className="text-sm font-medium">{name}</span>
                  </Link>
                ) : (
                  <details
                    key={name}
                    className="group [&_summary::-webkit-details-marker]:hidden"
                    open
                  >
                    <summary
                      className={`flex items-center space-x-3 ${
                        isActive
                          ? "bg-stone-200 text-black dark:bg-stone-700"
                          : ""
                      } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:cursor-pointer hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
                    >
                      {icon}
                      <span className="w-full text-sm font-medium">{name}</span>
                      <ChevronDown width={18} />
                    </summary>
                    <div className="border-l-2 pl-2">
                      {children.map(
                        ({
                          name,
                          href,
                          isActive,
                          icon,
                        }: {
                          name: string;
                          href: string;
                          isActive: boolean;
                          icon: string;
                        }) => (
                          <Link
                            key={name}
                            href={href || ""}
                            className={`flex items-center space-x-3 ${
                              isActive
                                ? "bg-stone-200 text-black dark:bg-stone-700"
                                : ""
                            } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
                          >
                            {icon}
                            <span className="text-sm font-medium">{name}</span>
                          </Link>
                        ),
                      )}
                    </div>
                  </details>
                ),
              )
            }
          </div>
        </div>
        <div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
