"use client";

import {
  MessageSquare,
  Upload,
  Brain,
  LayoutDashboard,
  Network,
  X,
  Sparkles,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

import FadeUp from "./ui/FadeUp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileDrawer from "./ProfileDrawer";

const ATLAS_RETURN_KEY = "recallnova_atlas_return_path";

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

export default function Sidebar() {
  const path = usePathname();

  const [showAtlasNotice, setShowAtlasNotice] = useState(false);

  const [chatSessionCount, setChatSessionCount] = useState(0);
  const [chatHistoryOpen, setChatHistoryOpen] = useState(false);

  const isChatRoute =
    path === "/chat" ||
    path.startsWith("/chat/") ||
    path === "/guest/chat" ||
    path.startsWith("/guest/chat/");

  useEffect(() => {
    const handleSessionsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{ count: number }>;

      setChatSessionCount(
        Math.max(0, Number(customEvent.detail?.count) || 0)
      );
    };

    const handleHistoryState = (event: Event) => {
      const customEvent = event as CustomEvent<{ open: boolean }>;

      setChatHistoryOpen(Boolean(customEvent.detail?.open));
    };

    window.addEventListener(
      "recallnova:chat-sessions-updated",
      handleSessionsUpdated
    );

    window.addEventListener(
      "recallnova:chat-history-state",
      handleHistoryState
    );

    return () => {
      window.removeEventListener(
        "recallnova:chat-sessions-updated",
        handleSessionsUpdated
      );

      window.removeEventListener(
        "recallnova:chat-history-state",
        handleHistoryState
      );
    };
  }, []);

  useEffect(() => {
    if (path && path !== "/doc-atlas") {
      sessionStorage.setItem(ATLAS_RETURN_KEY, path);
    }
  }, [path]);

  useEffect(() => {
    if (!showAtlasNotice) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAtlasNotice(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showAtlasNotice]);

  return (
    <>
      <aside
        className="
          relative z-10 flex h-full w-[clamp(13.5rem,17vw,15.5rem)]
shrink-0 flex-col overflow-visible
border-r px-3 py-4
        "
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        {/* BRAND */}
        <Link
          href="/"
          aria-label="RecallNova home"
          className="
            group mb-7 flex items-center gap-3
            rounded-2xl border p-3.5
            transition-all duration-200
            hover:-translate-y-0.5
          "
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
          }}
        >
          <div
            className="
              flex h-10 w-10 shrink-0 items-center
              justify-center rounded-xl
            "
            style={{
              background: "var(--primary)",
              color: "var(--bg)",
            }}
          >
            <Sparkles size={20} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <div className="truncate text-[15px] font-extrabold tracking-tight">
              RecallNova
            </div>
            <div className="mt-0.5 truncate text-[11px] opacity-60">
              AI Learning Workspace
            </div>
          </div>
        </Link>

        {/* SECTION LABEL */}
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] opacity-45">
          Workspace
        </div>

        {/* NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-1"
        >
          {nav.map((item) => {
            const Icon = item.icon;
            const isAtlas = item.href === "/doc-atlas";
            const isActive =
              !isAtlas &&
              (path === item.href ||
                path.startsWith(`${item.href}/`));

            if (isAtlas) {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setShowAtlasNotice(true)}
                  className="
                    group flex w-full items-center gap-3
                    rounded-xl px-3.5 py-3 text-left
                    text-[13px] font-medium
                    opacity-65 transition-all duration-200
                    hover:translate-x-0.5 hover:opacity-100
                  "
                  style={{ color: "var(--text)" }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="flex-1">{item.name}</span>
                  <span
                    className="
                      rounded-md border px-1.5 py-0.5
                      text-[9px] font-semibold uppercase tracking-wide
                    "
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg)",
                    }}
                  >
                    Soon
                  </span>
                </button>
              );
            }

            const chatRouteActive =
  item.href === "/chat" &&
  (path === "/chat" ||
    path.startsWith("/chat/") ||
    path === "/guest/chat" ||
    path.startsWith("/guest/chat/"));

const active =
  item.href === "/chat"
    ? chatRouteActive
    : isActive;

return (
  <div
    key={item.name}
    className="flex items-center gap-1"
  >
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className="
        group flex min-w-0 flex-1 items-center gap-3
        rounded-xl px-3.5 py-3
        text-[13px] font-semibold
        transition-all duration-200
        hover:translate-x-0.5
      "
      style={
        active
          ? {
              background: "var(--primary)",
              color: "var(--bg)",
              boxShadow:
                "0 5px 18px color-mix(in srgb, var(--primary) 22%, transparent)",
            }
          : {
              color: "var(--text)",
            }
      }
    >
      <Icon
        size={18}
        strokeWidth={1.9}
        className={`
          shrink-0 transition-transform duration-200
          group-hover:scale-110
          ${active ? "opacity-100" : "opacity-75"}
        `}
      />

      <span className="truncate">
        {item.name}
      </span>
    </Link>

    {item.href === "/chat" &&
      isChatRoute &&
      chatSessionCount > 0 && (
        <button
          type="button"
          title={
            chatHistoryOpen
              ? "Close chat history"
              : "Open chat history"
          }
          aria-label={
            chatHistoryOpen
              ? "Close chat history"
              : "Open chat history"
          }
          aria-expanded={chatHistoryOpen}
          onClick={() => {
            window.dispatchEvent(
              new Event("recallnova:toggle-chat-history")
            );
          }}
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl border
            transition-all duration-200
            hover:bg-[var(--primary)]/10
            active:scale-95
          "
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          {chatHistoryOpen ? (
            <PanelLeftClose size={17} strokeWidth={1.9} />
          ) : (
            <PanelLeftOpen size={17} strokeWidth={1.9} />
          )}
        </button>
      )}
  </div>
);
          })}
        </nav>

        {/* WORKSPACE FOOTER */}
        <div
          className="mb-3 rounded-xl border px-3 py-2.5"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
          }}
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--primary)" }}
            />
            Your learning space
          </div>
          <p className="mt-1 text-[10px] leading-4 opacity-55">
            Your documents and learning tools, together.
          </p>
        </div>

       {/* PROFILE */}
<div
  className="relative z-[1000] border-t pt-3"
  style={{ borderColor: "var(--border)" }}
>
  <FadeUp>
    <ProfileDrawer placement="sidebar" />
  </FadeUp>
</div>
      </aside>

      {/* DOC ATLAS NOTICE */}
      {showAtlasNotice && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAtlasNotice(false);
            }
          }}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black/55 p-4 backdrop-blur-md
          "
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="atlas-notice-title"
            className="
              relative w-full max-w-[420px]
              overflow-hidden rounded-[1.75rem]
              border p-6 shadow-2xl sm:p-8
            "
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div
              className="
                pointer-events-none absolute -right-16 -top-20
                h-48 w-48 rounded-full opacity-15 blur-3xl
              "
              style={{ background: "var(--primary)" }}
            />

            <button
              type="button"
              aria-label="Close notification"
              onClick={() => setShowAtlasNotice(false)}
              className="
                absolute right-4 top-4 z-10
                flex h-9 w-9 items-center justify-center
                rounded-xl opacity-60 transition
                hover:bg-black/5 hover:opacity-100
                dark:hover:bg-white/10
              "
            >
              <X size={18} />
            </button>

            <div className="relative">
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                "
                style={{
                  background:
                    "color-mix(in srgb, var(--primary) 14%, transparent)",
                  color: "var(--primary)",
                }}
              >
                <Network size={23} />
              </div>

              <div
                className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--primary)" }}
              >
                Coming soon
              </div>

              <h2
                id="atlas-notice-title"
                className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl"
              >
                Doc Atlas is on its way
              </h2>

              <p className="mt-3 text-sm leading-6 opacity-65">
                We’re building a visual knowledge layer to help you
                explore connections across your learning materials.
                It will be available in a future update.
              </p>

              <button
                type="button"
                onClick={() => setShowAtlasNotice(false)}
                className="
                  mt-7 w-full rounded-xl px-5 py-3
                  text-sm font-bold transition-all duration-200
                  hover:-translate-y-0.5 hover:opacity-90
                  active:translate-y-0
                "
                style={{
                  background: "var(--primary)",
                  color: "var(--bg)",
                }}
              >
                Got it
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}