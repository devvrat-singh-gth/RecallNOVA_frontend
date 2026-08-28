"use client";

import Header from "@/components/Header";

export default function AuthenticatedHomeShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        h-[100dvh]
        w-full
        min-h-0
        flex-col
        overflow-hidden
        bg-[var(--bg)]
      "
    >
      <div className="w-full shrink-0">
        <Header />
      </div>

      <main
        className="
          min-h-0
          min-w-0
          w-full
          flex-1
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          custom-scrollbar
        "
      >
        {children}
      </main>
    </div>
  );
}