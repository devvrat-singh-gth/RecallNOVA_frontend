"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDrawer from "./ProfileDrawer";
import {
  Menu,
  X,
  MessageSquare,
  Upload,
  Brain,
  LayoutDashboard,
  Network,
} from "lucide-react";

const ATLAS_RETURN_KEY =
  "recallnova_atlas_return_path";

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [showAtlasNotice, setShowAtlasNotice] =
    useState(false);

  /*
   * Keep track of the last valid app route.
   * /doc-atlas is intentionally excluded.
   */
  useEffect(() => {
    if (
      pathname &&
      pathname !== "/doc-atlas" &&
      !pathname.startsWith("/doc-atlas/")
    ) {
      sessionStorage.setItem(
        ATLAS_RETURN_KEY,
        pathname
      );
    }
  }, [pathname]);

  /*
   * Close notification with Escape.
   */
  useEffect(() => {
    if (!showAtlasNotice) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setShowAtlasNotice(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showAtlasNotice]);

  const openAtlasNotice = () => {
    /*
     * Save the page the user was actually on
     * before opening the notice.
     */
    if (
      pathname &&
      pathname !== "/doc-atlas" &&
      !pathname.startsWith("/doc-atlas/")
    ) {
      sessionStorage.setItem(
        ATLAS_RETURN_KEY,
        pathname
      );
    }

    setOpen(false);
    setShowAtlasNotice(true);
  };

  const closeAtlasNotice = () => {
    setShowAtlasNotice(false);
  };

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
      <header
        className="
          relative
          z-50
          h-16
          w-full
          shrink-0
          border-b
          border-[var(--border)]
          bg-[var(--bg)]
        "
      >
        {/* TOP BAR */}

        <div
          className="
            flex
            h-16
            w-full
            items-center
            px-4
          "
        >
          {/* MENU BUTTON — MOBILE ONLY */}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-white/5
              md:hidden
            "
            aria-label={
              open
                ? "Close navigation"
                : "Open navigation"
            }
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          {/* LOGO */}

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="
              ml-3
              whitespace-nowrap
              font-black
              text-lg
              md:ml-0
              transition-all
              duration-300
              hover:opacity-100
            "
            style={{
              textShadow:
                "0 0 10px rgba(163,230,53,.18), 0 0 22px rgba(163,230,53,.10)",
            }}
          >
            RecallNova
          </Link>

          {/* PROFILE */}

          <div className="ml-auto">
            <ProfileDrawer placement="header" />
          </div>
        </div>

        {/* MOBILE DRAWER */}

        {open && (
          <div
            className="
              absolute
              left-0
              top-16
              z-40
              h-[calc(100dvh-4rem)]
              w-[min(18rem,85vw)]
              overflow-y-auto
              border-r
              md:hidden
            "
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="p-4">
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(
                    `${item.href}/`
                  );

                /*
                 * Doc Atlas is temporarily disabled.
                 */
                if (
                  item.href === "/doc-atlas"
                ) {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={openAtlasNotice}
                      className="
                        group
                        mb-2
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-left
                        font-medium
                        opacity-70
                        transition-all
                        duration-300
                        hover:translate-x-1
                        hover:scale-[1.02]
                        hover:bg-white/5
                        active:scale-[0.98]
                      "
                      aria-haspopup="dialog"
                    >
                      <item.icon
                        size={18}
                        className="
                          shrink-0
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />

                      <span className="truncate">
                        {item.name}
                      </span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setOpen(false)
                    }
                    className={`
                      group
                      mb-2
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      font-medium
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:scale-[1.02]

                      ${
                        active
                          ? ""
                          : "hover:bg-white/5"
                      }
                    `}
                    style={
                      active
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
                    <item.icon
                      size={18}
                      className="
                        shrink-0
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    />

                    <span className="truncate">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

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
            overflow-y-auto
            bg-black/60
            px-4
            py-6
            backdrop-blur-sm
            sm:px-6
          "
          onMouseDown={(event) => {
            /*
             * Clicking outside the card closes it.
             */
            if (
              event.target ===
              event.currentTarget
            ) {
              closeAtlasNotice();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-notice-title"
            aria-describedby="atlas-notice-description"
            className="
              relative
              w-full
              max-w-[min(92vw,28rem)]
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              border
              p-5
              shadow-2xl
              sm:p-7
              md:p-8
            "
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={closeAtlasNotice}
              aria-label="Close notification"
              className="
                absolute
                right-3
                top-3
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
                active:scale-95
                sm:right-4
                sm:top-4
                sm:h-10
                sm:w-10
              "
            >
              <X size={18} />
            </button>

            {/* ICON */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                sm:h-12
                sm:w-12
              "
              style={{
                background:
                  "color-mix(in srgb, var(--primary) 12%, transparent)",
                color: "var(--primary)",
              }}
            >
              <Network
                size={21}
                className="sm:h-6 sm:w-6"
              />
            </div>

            {/* CONTENT */}

            <div className="mt-5 pr-5 sm:pr-8">
              <h2
                id="atlas-notice-title"
                className="
                  text-xl
                  font-black
                  tracking-tight
                  sm:text-2xl
                "
              >
                Doc Atlas is coming soon
              </h2>

              <p
                id="atlas-notice-description"
                className="
                  mt-3
                  text-sm
                  leading-6
                  opacity-65
                  sm:text-base
                "
              >
                This feature is currently under
                development. We’re building a
                visual knowledge layer to help you
                explore connections between your
                documents and learning activity.
              </p>

              <button
                type="button"
                onClick={closeAtlasNotice}
                className="
                  mt-6
                  w-full
                  rounded-2xl
                  px-5
                  py-3
                  text-sm
                  font-bold
                  transition-all
                  hover:opacity-90
                  active:scale-[0.98]
                  sm:py-3.5
                  sm:text-base
                "
                style={{
                  background:
                    "var(--primary)",
                  color:
                    "var(--bg)",
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}