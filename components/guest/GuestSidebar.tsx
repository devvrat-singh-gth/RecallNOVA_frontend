"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  MessageSquare,
  Upload,
  Brain,
} from "lucide-react";

import ProfileDrawer from "../ProfileDrawer";
import FadeUp from "../ui/FadeUp";

export default function GuestSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    {
      name: "Chat",
      href: "/guest/chat",
      icon: MessageSquare,
    },
    {
      name: "Upload",
      href: "/guest/upload",
      icon: Upload,
    },
    {
      name: "Learning",
      href: "/guest/learning",
      icon: Brain,
    },
  ];

  return (
    <>
      {/* =====================================================
          MOBILE HEADER
          Visible only below md
      ===================================================== */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-50

          flex
          h-16
          w-full
          items-center

          border-b
          border-[var(--border)]

          bg-[var(--bg)]

          md:hidden
        "
      >
        <div
          className="
            flex
            h-full
            w-full
            items-center
            px-4
          "
        >
          {/* Menu button */}
          <button
            type="button"
            aria-label={
              open
                ? "Close navigation"
                : "Open navigation"
            }
            onClick={() => setOpen((value) => !value)}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              transition

              hover:bg-white/5
              active:bg-white/10
            "
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          {/* Logo */}
          <Link
            href="/guest"
            className="
              ml-3
              min-w-0

              truncate

              text-lg
              font-black
            "
          >
            RecallNova
          </Link>

          {/* Profile */}
          <div className="ml-auto shrink-0">
            <ProfileDrawer placement="header" />
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[60]

            md:hidden
          "
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            className="
              absolute
              inset-0
              h-full
              w-full

              cursor-default

              bg-black/60
            "
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <aside
            className="
              absolute
              left-0
              top-0

              flex
              h-full
              w-[min(18rem,85vw)]
              flex-col

              overflow-y-auto

              border-r
              border-[var(--border)]

              bg-[var(--card)]

              shadow-2xl
            "
          >
            <div className="p-4">
              {/* Drawer logo */}
              <Link
                href="/guest"
                onClick={() => setOpen(false)}
                className="
                  mb-8
                  block

                  rounded-2xl

                  border
                  border-white/5

                  p-4

                  transition

                  hover:bg-white/5
                "
              >
                <div className="text-xl font-bold">
                  RecallNova
                </div>

                <div className="mt-1 text-xs opacity-60">
                  Guest Workspace
                </div>
              </Link>

              {/* Navigation */}
              <nav>
                {nav.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(
                      `${item.href}/`
                    );

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        mb-2
                        flex
                        items-center
                        gap-3

                        rounded-xl

                        px-4
                        py-3

                        font-medium

                        transition-all
                        duration-200
                      "
                      style={
                        active
                          ? {
                              background:
                                "var(--primary)",
                              color:
                                "var(--bg)",
                            }
                          : undefined
                      }
                    >
                      <Icon size={18} />

                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* =====================================================
          DESKTOP SIDEBAR
          Visible only at md and above
      ===================================================== */}

      <aside
        className="
          fixed
          bottom-0
          left-0
          top-0
          z-40

          hidden
          w-60
          shrink-0

          border-r
          border-[var(--border)]

          bg-[var(--card)]

          md:flex
          md:flex-col

          p-4
        "
      >
        {/* Logo */}
        <Link
          href="/guest"
          className="
            mb-8
            block

            rounded-2xl

            border
            border-white/5

            p-4

            transition-all
            duration-300

            hover:bg-white/5
          "
        >
          <div className="text-xl font-bold">
            RecallNova
          </div>

          <div className="mt-1 text-xs opacity-60">
            Guest Workspace
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
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
                "
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
                    : undefined
                }
              >
                <Icon size={18} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div
          className="
            mt-3

            border-t
            border-[var(--border)]

            pt-3
          "
        >
          <FadeUp>
            <ProfileDrawer />
          </FadeUp>
        </div>
      </aside>
    </>
  );
}