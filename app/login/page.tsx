"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "@/components/auth/AuthProvider";

import {
  loginWithEmail,
  loginWithGoogle,
} from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const {
    setAuthenticatedUser,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleEmailLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading || googleLoading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const normalizedEmail =
        email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new Error(
          "Please enter your email."
        );
      }

      if (!password) {
        throw new Error(
          "Please enter your password."
        );
      }

      const data =
        await loginWithEmail(
          normalizedEmail,
          password
        );

      setAuthenticatedUser(
        data.user,
        data.access_token
      );

      router.replace("/");
    } catch (err) {
      console.error(
        "EMAIL LOGIN ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(
    credential: string
  ) {
    if (loading || googleLoading) {
      return;
    }

    setGoogleLoading(true);
    setError("");

    try {
      const timezone =
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone ||
        "UTC";

      const data =
        await loginWithGoogle(
          credential,
          timezone
        );

      setAuthenticatedUser(
        data.user,
        data.access_token
      );

      router.replace("/");
    } catch (err) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Google sign-in failed."
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  function handleGoogleError() {
    setGoogleLoading(false);

    setError(
      "Google sign-in was cancelled or could not be completed."
    );
  }

  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        custom-scrollbar
        px-5
        py-10
        sm:py-14
      "
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-3
              text-2xl
              font-black
              transition-transform
              duration-200
              hover:scale-[1.02]
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
                shadow-lg
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

            <span>
              RecallNova
            </span>
          </Link>

          <p className="mt-3 text-sm opacity-60">
            Your AI-powered learning workspace.
          </p>
        </div>

        <div
          className="
            glass-card
            p-7
            sm:p-9
          "
        >
          <div className="mb-7">
            <h1 className="text-3xl font-black">
              Welcome back
            </h1>

            <p className="mt-2 text-sm opacity-60">
              Sign in to continue learning.
            </p>
          </div>

          <form
            onSubmit={handleEmailLogin}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
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
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                  className="
                    auth-input
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    pl-11
                    pr-4
                    text-[var(--text)]
                    outline-none
                    transition
                    focus:border-lime-400/50
                    focus:ring-2
                    focus:ring-lime-400/30
                  "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
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
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="
                    auth-input
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    pl-11
                    pr-11
                    text-[var(--text)]
                    outline-none
                    transition
                    focus:border-lime-400/50
                    focus:ring-2
                    focus:ring-lime-400/30
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    opacity-50
                    transition
                    hover:bg-white/5
                    hover:opacity-100
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                googleLoading
              }
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
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight size={18} />
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

          <div className="my-7 flex items-center gap-4">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "var(--border)",
              }}
            />

            <span className="text-xs uppercase tracking-widest opacity-40">
              or
            </span>

            <div
              className="h-px flex-1"
              style={{
                background:
                  "var(--border)",
              }}
            />
          </div>

          <div className="w-full overflow-hidden rounded-xl">
            <GoogleLogin
              onSuccess={(response) => {
                if (!response.credential) {
                  handleGoogleError();
                  return;
                }

                handleGoogleSuccess(
                  response.credential
                );
              }}
              onError={handleGoogleError}
              useOneTap={false}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
              shape="rectangular"
            />
          </div>

          {googleLoading && (
            <p className="mt-3 text-center text-xs opacity-50">
              Signing you in with Google...
            </p>
          )}

          <p className="mt-7 text-center text-xs leading-relaxed opacity-50">
            Email/password accounts use a
            separate RecallNova password.
            Google accounts continue using
            Google authentication.
          </p>

          <p className="mt-4 text-center text-xs leading-relaxed opacity-50">
            By continuing, you agree to
            RecallNova&apos;s{" "}
            <Link
              href="/terms"
              className="underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <p className="mt-6 pb-2 text-center text-sm opacity-50">
          New to RecallNova?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[var(--primary)] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}