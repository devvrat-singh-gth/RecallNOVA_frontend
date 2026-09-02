"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ATLAS_RETURN_KEY = "recallnova_atlas_return_path";

export default function DocAtlasPage() {
  const router = useRouter();

  useEffect(() => {
    const previousPath =
      sessionStorage.getItem(ATLAS_RETURN_KEY);

    sessionStorage.removeItem(ATLAS_RETURN_KEY);

    const destination =
      previousPath && previousPath !== "/doc-atlas"
        ? previousPath
        : "/dashboard";

    router.replace(destination);
  }, [router]);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <p className="text-sm opacity-60 text-center">
        Redirecting...
      </p>
    </main>
  );
}