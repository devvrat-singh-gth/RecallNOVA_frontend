"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PublicLanding from "@/components/home/PublicLanding";
import AuthenticatedHome from "@/components/home/AuthenticatedHome";
import AuthenticatedHomeShell from "@/components/home/AuthenticatedHomeShell";
import GuestLanding from "@/components/guest/GuestLanding";
import {
  useAuth,
} from "@/components/auth/AuthProvider";

export default function RootHomePage() {
const {
  user,
  loading,
} = useAuth();

const isGuest =
  user?.email?.includes("guest");
const router = useRouter();

useEffect(() => {
  if (!loading && isGuest) {
    router.replace("/guest");
  }
}, [loading, isGuest, router]);
const isRegisteredUser =
  !!user && !isGuest;
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

if (isGuest) {
  return null;
}


if (isRegisteredUser) {
  return (
    <AuthenticatedHomeShell>
      <AuthenticatedHome />
    </AuthenticatedHomeShell>
  );
}

return <PublicLanding />;
}