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
        h-[100dvh]
        w-full
        overflow-hidden
        bg-[var(--bg)]
      "
    >
      {/* Header — desktop + mobile */}
      <div className="w-full shrink-0">
        <Header />
      </div>

      {/* Home content */}
      <main
        className="
          h-[calc(100dvh-4rem)]
          min-h-0
          min-w-0
          w-full
          overflow-hidden
        "
      >
        {children}
      </main>
    </div>
  );
}