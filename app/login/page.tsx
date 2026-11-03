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
  relative isolate
  h-[100dvh] min-h-0 w-full
  overflow-x-hidden overflow-y-auto
  overscroll-y-contain touch-pan-y
  [-webkit-overflow-scrolling:touch]
  custom-scrollbar
  px-4 py-4
  sm:px-6 sm:py-6
  lg:px-8 lg:py-5
"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Subtle theme-aware background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-40 left-1/4
          h-80 w-80 rounded-full
          bg-[var(--primary)] opacity-[0.07]
          blur-3xl
        "
      />

<div
  className="
    relative mx-auto flex
    min-h-full w-full max-w-[1600px]
    flex-col
    py-4 sm:py-6 lg:py-5
  "
>
        <section
className="
  my-auto grid w-full min-w-0
  overflow-hidden
  rounded-[1.75rem] sm:rounded-[2rem]
  border border-[var(--border)]
  bg-[var(--card)]
  shadow-[0_24px_90px_rgba(0,0,0,0.12)]
  lg:min-h-[calc(100dvh-5rem)]
  lg:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)]
"
        >
          {/* DESKTOP BRAND / FEATURE PANEL */}
          <aside
className="
  relative hidden min-w-0
  flex-col justify-between
  p-6
  lg:flex
  lg:p-[clamp(1.5rem,2.5vw,2.5rem)]
"
            style={{
  background: `
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--primary) 17%, var(--card)),
      color-mix(in srgb, var(--card) 94%, var(--bg))
    )
  `,
}}
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                -right-28 -top-24
                h-96 w-96 rounded-full
                border border-[var(--primary)]/10
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                -right-12 -top-10
                h-64 w-64 rounded-full
                border border-[var(--primary)]/10
              "
            />

            <div className="relative z-10">
              <Link
                href="/"
                className="
                  inline-flex items-center gap-3
                  rounded-xl outline-none
                  transition-opacity hover:opacity-80
                  focus-visible:ring-2
                  focus-visible:ring-[var(--primary)]
                "
              >
                <span
                  className="
                    flex h-11 w-11 items-center
                    justify-center rounded-2xl
                    shadow-lg
                  "
                  style={{
                    background: "var(--primary)",
                    color: "var(--bg)",
                  }}
                >
                  <Sparkles size={20} />
                </span>

                <span className="text-2xl font-black tracking-tight">
                  RecallNova
                </span>
              </Link>

              <div className="mt-[clamp(3rem,9vh,7rem)] max-w-2xl">
                <div
                  className="
                    inline-flex items-center gap-2
                    rounded-full border
                    border-[var(--border)]
                    bg-[var(--bg)]/50
                    px-3 py-2 text-xs font-semibold
                  "
                >
                  <Sparkles
                    size={14}
                    className="text-[var(--primary)]"
                  />
                  YOUR PERSONAL LEARNING WORKSPACE
                </div>

                <h2
                  className="
                    mt-7 max-w-2xl
                    text-[clamp(2.5rem,4.5vw,4.75rem)]
                    font-black leading-[1.04]
                    tracking-[-0.045em]
                    text-balance
                  "
                >
                  Pick up where your{" "}
                  <span className="text-[var(--primary)]">
                    curiosity
                  </span>{" "}
                  left off.
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 opacity-70 xl:text-lg">
                  Bring your documents, questions and ideas
                  together. Continue learning with a workspace
                  built around the material that matters to you.
                </p>
              </div>
            </div>

            {/* FEATURE PREVIEW */}
            <div className="relative z-10 mt-12 grid gap-3 xl:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Document chat",
                  description: "Ask questions from your PDFs.",
                },
                {
                  number: "02",
                  title: "Active recall",
                  description: "Revise with flashcards and quizzes.",
                },
                {
                  number: "03",
                  title: "Doc Atlas",
                  description: "Explore connected concepts.",
                },
              ].map((feature) => (
                <div
                  key={feature.number}
                  className="
                    rounded-2xl border
                    border-[var(--border)]
                    bg-[var(--bg)]/55
                    p-4 backdrop-blur-sm
                  "
                >
                  <span className="text-xs font-bold text-[var(--primary)]">
                    {feature.number}
                  </span>

                  <h3 className="mt-3 text-sm font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 opacity-60">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="relative z-10 mt-8 text-xs opacity-45">
              Learn with context. Revise with purpose.
            </p>
          </aside>

          {/* LOGIN FORM PANEL */}
          <div className="
  flex min-w-0 items-center justify-center
  px-5 py-8
  sm:px-9 sm:py-10
  lg:px-[clamp(2rem,4vw,4.5rem)]
  lg:py-5
">
            <div className="w-full max-w-[820px]">
              {/* MOBILE BRAND */}
              <div className="mb-8 text-center lg:hidden">
                <Link
                  href="/"
                  className="
                    inline-flex items-center gap-3
                    text-2xl font-black tracking-tight
                  "
                >
                  <span
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-2xl shadow-lg
                    "
                    style={{
                      background: "var(--primary)",
                      color: "var(--bg)",
                    }}
                  >
                    <Sparkles size={19} />
                  </span>
                  RecallNova
                </Link>

                <p className="mt-3 text-sm opacity-60">
                  Your AI-powered learning workspace.
                </p>
              </div>

              <div className="mb-7">
                <div className="
                  mb-3 inline-flex items-center gap-2
                  rounded-full border border-[var(--border)]
                  bg-[var(--bg)] px-3 py-1.5
                  text-xs font-semibold opacity-75
                ">
                  <span className="
                    h-1.5 w-1.5 rounded-full
                    bg-[var(--primary)]
                  " />
                  Welcome back
                </div>

                <h1 className="
                  text-[clamp(1.9rem,3vw,2.6rem)]
                  font-black tracking-tight
                ">
                  Sign in to RecallNova
                </h1>

                <p className="mt-2 text-sm leading-6 opacity-60 sm:text-base">
                  Continue your learning journey.
                </p>
              </div>

              <form
                onSubmit={handleEmailLogin}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="
                        pointer-events-none absolute
                        left-4 top-1/2 -translate-y-1/2
                        opacity-45
                      "
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      required
                      className="
                        auth-input h-12 w-full
                        rounded-xl border
                        border-[var(--border)]
                        bg-[var(--bg)]
                        pl-11 pr-4
                        text-[var(--text)]
                        outline-none transition
                        focus:border-[var(--primary)]
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                      "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="
                        pointer-events-none absolute
                        left-4 top-1/2 -translate-y-1/2
                        opacity-45
                      "
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="
                        auth-input h-12 w-full
                        rounded-xl border
                        border-[var(--border)]
                        bg-[var(--bg)]
                        pl-11 pr-12
                        text-[var(--text)]
                        outline-none transition
                        focus:border-[var(--primary)]
                        focus:ring-2
                        focus:ring-[var(--primary)]/20
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="
                        absolute right-3 top-1/2
                        -translate-y-1/2 rounded-lg p-2
                        opacity-50 transition
                        hover:bg-[var(--primary)]/10
                        hover:opacity-100
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[var(--primary)]
                      "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
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
                  disabled={loading || googleLoading}
                  className="
                    btn-primary flex h-12 w-full
                    items-center justify-center gap-2
                    rounded-xl font-bold
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:brightness-105
                    active:translate-y-0
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading ? "Signing in..." : "Sign in"}

                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              {error && (
                <div
                  role="alert"
                  className="
                    mt-4 rounded-xl border
                    border-red-500/20 bg-red-500/10
                    px-4 py-3 text-sm text-red-500
                  "
                >
                  {error}
                </div>
              )}

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="
                  text-[11px] font-semibold uppercase
                  tracking-[0.18em] opacity-40
                ">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <div className="
                flex min-h-12 w-full
                items-center justify-center
                overflow-hidden rounded-xl
                border border-[var(--border)]
                bg-white px-2 py-1
              ">
                <GoogleLogin
                  onSuccess={(response) => {
                    if (!response.credential) {
                      handleGoogleError();
                      return;
                    }

                    handleGoogleSuccess(response.credential);
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
                <p className="mt-3 text-center text-xs opacity-55">
                  Signing you in with Google...
                </p>
              )}

              <p className="mt-6 text-center text-xs leading-6 opacity-55">
                Email/password accounts use a separate RecallNova
                password. Google accounts continue using Google
                authentication.
              </p>

              <p className="mt-3 text-center text-xs leading-6 opacity-55">
                By continuing, you agree to RecallNova&apos;s{" "}
                <Link
                  href="/terms"
                  className="
                    font-semibold underline underline-offset-4
                    decoration-[var(--primary)]/50
                    hover:opacity-100
                  "
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="
                    font-semibold underline underline-offset-4
                    decoration-[var(--primary)]/50
                    hover:opacity-100
                  "
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="
                mt-7 border-t border-[var(--border)]
                pt-5 text-center text-sm
              ">
                <span className="opacity-60">
                  New to RecallNova?
                </span>{" "}
                <Link
                  href="/signup"
                  className="
                    font-bold text-[var(--primary)]
                    underline-offset-4 hover:underline
                  "
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}