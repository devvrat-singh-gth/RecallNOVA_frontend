"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  MessageSquare,
  Upload,
  Brain,
  Sparkles,
} from "lucide-react";

import ProfileDrawer from "../ProfileDrawer";
import FadeUp from "../ui/FadeUp";

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

export default function GuestSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      {/* MOBILE HEADER */}
      <header
        className="
          fixed inset-x-0 top-0 z-50
          flex h-16 items-center justify-between
          border-b px-4 backdrop-blur-xl md:hidden
        "
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl border transition
          "
          style={{ borderColor: "var(--border)" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          href="/guest"
          className="flex items-center gap-2.5"
          aria-label="RecallNova guest home"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{
              background: "var(--primary)",
              color: "var(--bg)",
            }}
          >
            <Sparkles size={17} />
          </span>
          <span className="text-[15px] font-extrabold tracking-tight">
            RecallNova
          </span>
        </Link>

        <div className="flex min-w-10 justify-end">
          <ProfileDrawer placement="header" />
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-[55] bg-black/50
            backdrop-blur-[2px] md:hidden
          "
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        className={`
          fixed bottom-0 left-0 top-16 z-[60]
          flex w-[min(19rem,85vw)] flex-col
          border-r p-4 shadow-2xl
          transition-transform duration-300 ease-out
          md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        <div className="mb-6 px-2">
          <div className="text-sm font-bold">Guest workspace</div>
          <p className="mt-1 text-xs opacity-55">
            Explore your learning tools
          </p>
        </div>

        <nav aria-label="Guest navigation" className="flex-1 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive =
              path === item.href || path.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="
                  flex items-center gap-3 rounded-xl
                  px-3.5 py-3 text-[13px] font-semibold
                  transition-all duration-200
                  hover:translate-x-0.5
                "
                style={
                  isActive
                    ? {
                        background: "var(--primary)",
                        color: "var(--bg)",
                      }
                    : { color: "var(--text)" }
                }
              >
                <Icon size={18} strokeWidth={1.9} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div
          className="rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
          }}
        >
          <p className="text-xs font-semibold">Guest mode</p>
          <p className="mt-1 text-[11px] leading-4 opacity-55">
            Create an account to keep your learning progress.
          </p>
        </div>
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          fixed bottom-0 left-0 top-0 z-40
          hidden w-60 flex-col border-r p-4
          md:flex
        "
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        <Link
          href="/guest"
          className="
            mb-7 flex items-center gap-3 rounded-2xl
            border p-3.5 transition-all duration-200
            hover:-translate-y-0.5
          "
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
          }}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "var(--primary)",
              color: "var(--bg)",
            }}
          >
            <Sparkles size={20} />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-[15px] font-extrabold tracking-tight">
              RecallNova
            </span>
            <span className="mt-0.5 block truncate text-[11px] opacity-55">
              Guest workspace
            </span>
          </span>
        </Link>

        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] opacity-45">
          Explore
        </div>

        <nav aria-label="Guest navigation" className="flex-1 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive =
              path === item.href || path.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="
                  group flex items-center gap-3 rounded-xl
                  px-3.5 py-3 text-[13px] font-semibold
                  transition-all duration-200
                  hover:translate-x-0.5
                "
                style={
                  isActive
                    ? {
                        background: "var(--primary)",
                        color: "var(--bg)",
                        boxShadow:
                          "0 5px 18px color-mix(in srgb, var(--primary) 22%, transparent)",
                      }
                    : { color: "var(--text)" }
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.9}
                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div
          className="mb-3 rounded-xl border p-3"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
          }}
        >
          <p className="text-xs font-semibold">Trying RecallNova?</p>
          <p className="mt-1 text-[11px] leading-4 opacity-55">
            Sign up to unlock your full learning workspace.
          </p>
        </div>

        <div
          className="border-t pt-3"
          style={{ borderColor: "var(--border)" }}
        >
          <FadeUp>
            <ProfileDrawer />
          </FadeUp>
        </div>
      </aside>

      {/* MOBILE PROFILE DRAWER IS PROVIDED BY THE HEADER */}
    </>
  );
}