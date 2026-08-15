"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";

import {
  forgotPassword,
} from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await forgotPassword(
        email.trim().toLowerCase()
      );

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to process your request."
      );
    } finally {
      setLoading(false);
    }
  }

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
            p-7
            sm:p-9
          "
        >
          {!sent ? (
            <>
              <h1 className="text-3xl font-black">
                Forgot your password?
              </h1>

              <p className="mt-2 text-sm leading-6 opacity-60">
                This recovery flow is for
                native RecallNova email
                accounts. Google accounts
                should continue using Google
                sign-in.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                    "
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        opacity-45
                      "
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(
                        event
                      ) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="
                        auth-input
                        h-12
                        w-full
                        rounded-xl
                        border
                        bg-[var(--card)]
                        pl-11
                        pr-4
                        outline-none
                        transition
                        border-[var(--border)]
                        focus:border-lime-400/50
                        focus:ring-2
                        focus:ring-lime-400/30
                      "
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    btn-primary
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    font-semibold
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Sending..."
                    : "Send reset email"}

                  {!loading && (
                    <Send size={17} />
                  )}
                </button>
              </form>

              {error && (
                <div
                  role="alert"
                  className="
                    mt-4
                    rounded-xl
                    p-3
                    text-sm
                  "
                  style={{
                    background:
                      "rgba(239,68,68,.10)",
                    color:
                      "#f87171",
                  }}
                >
                  {error}
                </div>
              )}

              <Link
                href="/login"
                className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[var(--primary)]
                  hover:underline
                "
              >
                <ArrowLeft size={15} />
                Back to sign in
              </Link>
            </>
          ) : (
            <div className="text-center">
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
                <Mail
                  size={28}
                  className="text-[var(--primary)]"
                />
              </div>

              <h1 className="mt-6 text-2xl font-black">
                Check your inbox
              </h1>

              <p className="mt-3 text-sm leading-6 opacity-60">
                If a native RecallNova
                account exists for that
                address, a password reset
                link has been sent.
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
                Return to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}