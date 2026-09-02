"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ATLAS_RETURN_KEY =
  "recallnova_atlas_return_path";

export default function DocAtlasPage() {
  const router = useRouter();

  useEffect(() => {
    const previousPath =
      sessionStorage.getItem(
        ATLAS_RETURN_KEY
      );

    sessionStorage.removeItem(
      ATLAS_RETURN_KEY
    );

    router.replace(
      previousPath &&
        previousPath !== "/doc-atlas"
        ? previousPath
        : "/dashboard"
    );
  }, [router]);

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div className="text-sm opacity-60">
        Redirecting...
      </div>
    </div>
  );
}