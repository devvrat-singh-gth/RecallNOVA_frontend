"use client";

import { useState } from "react";
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

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

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

        {/* DESKTOP NAV */}

        {/*
        <nav
          className="
            ml-8
            hidden
            items-center
            gap-1
            md:flex
          "
        >
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  hover:bg-white/5
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
                {item.name}
              </Link>
            );
          })}
        </nav>
        */}

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
            w-72

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

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={`
                    group

                    flex
                    items-center
                    gap-3

                    px-4
                    py-3

                    mb-2

                    rounded-xl

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
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}