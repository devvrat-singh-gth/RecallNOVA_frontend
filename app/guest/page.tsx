"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import GuestLanding from "@/components/guest/GuestLanding";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

export default function GuestPage() {
  const {
    loading,
    isGuest,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !isGuest) {
      router.replace("/");
    }
  }, [
    loading,
    isGuest,
    router,
  ]);

  if (loading) return null;

  if (!isGuest) return null;

  return <GuestLanding />;
}