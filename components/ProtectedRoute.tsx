"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated
    ) {
      router.replace("/login");
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  if (loading) {
    return (
      <div
        className="
          h-screen
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
          Loading RecallNova...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}