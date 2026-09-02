"use client";

import {
  MessageSquare,
  Upload,
  Brain,
  LayoutDashboard,
  Network,
  X,
} from "lucide-react";

import FadeUp from "./ui/FadeUp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileDrawer from "./ProfileDrawer";

const ATLAS_RETURN_KEY =
  "recallnova_atlas_return_path";

export default function Sidebar() {
  const path = usePathname();

  const [showAtlasNotice, setShowAtlasNotice] =
    useState(false);

  /*
   * Remember the last valid application route.
   * This lets /doc-atlas return the user to
   * wherever they came from.
   */
  useEffect(() => {
    if (
      path &&
      path !== "/doc-atlas"
    ) {
      sessionStorage.setItem(
        ATLAS_RETURN_KEY,
        path
      );
    }
  }, [path]);

  const nav = [
    {
      name: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      name: "Upload",
      href: "/upload",
      icon: Upload,
    },
    {
      name: "Learning",
      href: "/learning",
      icon: Brain,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Doc Atlas",
      href: "/doc-atlas",
      icon: Network,
    },
  ];

  return (
    <>
      <div
        className="
          w-56
          h-full
          border-r
          flex
          flex-col
          p-4
        "
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
            block
            mb-8
            p-4
            rounded-2xl
            border
            border-white/5
            hover:border-lime-400/20
            hover:bg-white/5
            transition-all
            duration-300
          "
        >
          <div className="font-bold text-xl">
            RecallNova
          </div>

          <div className="text-xs opacity-60">
            AI Learning Workspace
          </div>
        </Link>

        {/* NAV */}

        <div className="flex-1">
          {nav.map((item) => {
            const Icon = item.icon;

            const isActive =
              path.startsWith(item.href);

            /*
             * Temporarily disabled Doc Atlas.
             */
            if (item.href === "/doc-atlas") {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setShowAtlasNotice(true)
                  }
                  className="
                    group
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    font-medium
                    text-left
                    opacity-70
                    transition-all
                    duration-300
                    hover:bg-white/5
                    hover:translate-x-1
                    hover:scale-[1.02]
                  "
                >
                  <Icon
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span>{item.name}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  font-medium
                  transition-all
                  duration-300
                  hover:translate-x-1
                  hover:scale-[1.02]

                  ${
                    isActive
                      ? ""
                      : "hover:bg-white/5"
                  }
                `}
                style={
                  isActive
                    ? {
                        background:
                          "var(--primary)",
                        color:
                          "var(--bg)",
                        boxShadow:
                          "0 0 20px rgba(132,204,22,.25)",
                      }
                    : {}
                }
              >
                <Icon
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* PROFILE */}

        <div
          className="
            border-t
            pt-3
            mt-3
          "
        >
          <FadeUp>
            <ProfileDrawer />
          </FadeUp>
        </div>
      </div>

      {/* DOC ATLAS NOTICE */}

      {showAtlasNotice && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            p-4
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowAtlasNotice(false);
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-6
              sm:p-8
              shadow-2xl
            "
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Close notification"
              onClick={() =>
                setShowAtlasNotice(false)
              }
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                opacity-60
                transition
                hover:bg-white/5
                hover:opacity-100
              "
            >
              <X size={18} />
            </button>

            <div className="pr-10">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--primary)]/10
                  text-[var(--primary)]
                "
              >
                <Network size={23} />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  sm:text-2xl
                  font-black
                  tracking-tight
                "
              >
                Doc Atlas is coming soon
              </h2>

              <p
                className="
                  mt-3
                  text-sm
                  sm:text-base
                  leading-6
                  opacity-65
                "
              >
                This feature is currently under
                further development. We’re building
                the visual knowledge layer and it
                will be available in a future update.
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowAtlasNotice(false)
                }
                className="
                  mt-6
                  w-full
                  rounded-2xl
                  bg-[var(--primary)]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-[var(--bg)]
                  transition
                  hover:opacity-90
                  active:scale-[0.98]
                "
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}