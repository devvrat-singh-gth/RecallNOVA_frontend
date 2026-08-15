"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  CheckCircle2,
  Loader2,
  MailCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

import {
  verifyEmail,
} from "@/lib/api";

export default function VerifyEmailPage() {
  const searchParams =
    useSearchParams();

  const [status, setStatus] =
    useState<
      "loading" |
      "success" |
      "error" |
      "pending"
    >("loading");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const token =
      searchParams.get(
        "token"
      );

    const explicitStatus =
      searchParams.get(
        "status"
      );

    if (
      explicitStatus ===
      "pending"
    ) {
      setStatus("pending");
      setMessage(
        "Check your inbox for the RecallNova verification email."
      );
      return;
    }

    if (
      explicitStatus ===
      "success"
    ) {
      setStatus("success");
      setMessage(
        "Your email has been verified successfully."
      );
      return;
    }

    if (
      explicitStatus ===
      "error"
    ) {
      setStatus("error");
      setMessage(
        "This verification link is invalid or expired."
      );
      return;
    }

    if (!token) {
      setStatus("error");
      setMessage(
        "No verification token was provided."
      );
      return;
    }

    let cancelled = false;

    const verify = async () => {
      try {
        await verifyEmail(
          token
        );

        if (!cancelled) {
          setStatus("success");
          setMessage(
            "Your email has been verified successfully."
          );
        }
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "Email verification failed."
          );
        }
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <main
      className="
        flex
        min-h-[100dvh]
        w-full
        items-center
        justify-center
        overflow-y-auto
        px-5
        py-10
      "
      style={{
        background:
          "var(--bg)",
        color:
          "var(--text)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-3
              text-2xl
              font-black
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                background:
                  "var(--primary)",
                color:
                  "var(--bg)",
              }}
            >
              <Sparkles size={19} />
            </span>

            <span className="drop-shadow-[0_0_12px_rgba(132,204,22,.24)]">
              RecallNova
            </span>
          </Link>
        </div>

        <div
          className="
            glass-card
            p-8
            text-center
            sm:p-10
          "
        >
          {status ===
            "loading" && (
            <>
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]/10
                "
              >
                <Loader2
                  size={28}
                  className="
                    animate-spin
                    text-[var(--primary)]
                  "
                />
              </div>

              <h1 className="mt-6 text-2xl font-black">
                Verifying email
              </h1>

              <p className="mt-3 text-sm opacity-60">
                Please wait while we
                verify your email address.
              </p>
            </>
          )}

          {status ===
            "pending" && (
            <>
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]/10
                "
              >
                <MailCheck
                  size={28}
                  className="text-[var(--primary)]"
                />
              </div>

              <h1 className="mt-6 text-2xl font-black">
                Check your inbox
              </h1>

              <p className="mt-3 text-sm leading-6 opacity-60">
                {message}
              </p>

              <Link
                href="/login"
                className="
                  btn-primary
                  mt-7
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-xl
                  px-5
                  text-sm
                  font-semibold
                "
              >
                Back to sign in
              </Link>
            </>
          )}

          {status ===
            "success" && (
            <>
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]/10
                "
              >
                <CheckCircle2
                  size={30}
                  className="text-[var(--primary)]"
                />
              </div>

              <h1 className="mt-6 text-2xl font-black">
                Email verified
              </h1>

              <p className="mt-3 text-sm leading-6 opacity-60">
                {message}
              </p>

              <Link
                href="/login"
                className="
                  btn-primary
                  mt-7
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-xl
                  px-5
                  text-sm
                  font-semibold
                "
              >
                Continue to sign in
              </Link>
            </>
          )}

          {status ===
            "error" && (
            <>
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500/10
                "
              >
                <XCircle
                  size={30}
                  className="text-red-400"
                />
              </div>

              <h1 className="mt-6 text-2xl font-black">
                Verification failed
              </h1>

              <p className="mt-3 text-sm leading-6 text-red-300/80">
                {message}
              </p>

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:justify-center
                "
              >
                <Link
                  href="/login"
                  className="
                    btn-primary
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    px-5
                    text-sm
                    font-semibold
                  "
                >
                  Sign in
                </Link>

                <Link
                  href="/signup"
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[var(--border)]
                    px-5
                    text-sm
                    font-semibold
                  "
                >
                  Create account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}