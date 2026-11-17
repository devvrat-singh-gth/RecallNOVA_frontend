
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./auth/AuthProvider";

type ProtectedRouteProps = {
  children: React.ReactNode;
  access: "registered" | "guest";
};

export default function ProtectedRoute({
  children,
  access,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    loading,
    isAuthenticated,
    isGuest,
    isRegisteredUser,
  } = useAuth();

  const allowed =
    access === "guest"
      ? isAuthenticated && isGuest
      : isAuthenticated && isRegisteredUser;

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace(access === "guest" ? "/" : "/login");
      return;
    }

    if (access === "guest" && !isGuest) {
      router.replace("/");
      return;
    }

    if (access === "registered" && !isRegisteredUser) {
      router.replace("/guest");
    }
  }, [
    loading,
    isAuthenticated,
    isGuest,
    isRegisteredUser,
    access,
    router,
  ]);

  if (loading || !allowed) {
    return (
      <div
        className="flex h-[100dvh] w-full items-center justify-center"
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

  return <>{children}</>;
}
