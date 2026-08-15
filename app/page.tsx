"use client";

import PublicLanding from "@/components/home/PublicLanding";
import AuthenticatedHome from "@/components/home/AuthenticatedHome";
import AuthenticatedHomeShell from "@/components/home/AuthenticatedHomeShell";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RootHomePage() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div
        className="
          flex
          h-[100dvh]
          w-full
          items-center
          justify-center
          bg-[var(--bg)]
          text-[var(--text)]
        "
      >
        <div className="text-sm opacity-60">
          Loading RecallNova...
        </div>
      </div>
    );
  }

  if (!user) {
    return <PublicLanding />;
  }

  return (
    <AuthenticatedHomeShell>
      <AuthenticatedHome />
    </AuthenticatedHomeShell>
  );
}