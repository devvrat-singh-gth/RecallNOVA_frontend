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
  User,
} from "lucide-react";

import { GoogleLogin } from "@react-oauth/google";

import {
  signupWithEmail,
  loginWithGoogle,
} from "@/lib/api";

import { useAuth } from "@/components/auth/AuthProvider";

export default function SignupPage() {
  const router = useRouter();

  const {
    setAuthenticatedUser,
  } = useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSignup(
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

      const normalizedName =
        name.trim();

      if (!normalizedEmail) {
        throw new Error(
          "Please enter your email."
        );
      }

      if (password.length < 8) {
        throw new Error(
          "Password must contain at least 8 characters."
        );
      }

      if (
        password !==
        confirmPassword
      ) {
        throw new Error(
          "Passwords do not match."
        );
      }

      const timezone =
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone ||
        "UTC";

      const data =
        await signupWithEmail(
          normalizedEmail,
          password,
          normalizedName || undefined,
          timezone
        );

      if (!data?.access_token) {
        throw new Error(
          "Account was created, but authentication could not be completed."
        );
      }

      setAuthenticatedUser(
        data.user,
        data.access_token
      );

      router.replace("/");
    } catch (err) {
      console.error(
        "EMAIL SIGNUP ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account."
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
        "GOOGLE SIGNUP ERROR:",
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
      {/* Theme-aware background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-40 right-1/4
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
  py-4 sm:py-6 lg:py-3
"
>
        <section
className="
  my-auto grid w-full min-w-0
  overflow-hidden
  rounded-[1.5rem] sm:rounded-[1.75rem]
  border border-[var(--border)]
  bg-[var(--card)]
  shadow-[0_24px_90px_rgba(0,0,0,0.12)]
  lg:min-h-[calc(100dvh-3rem)]
  lg:grid-cols-[minmax(0,1.02fr)_minmax(440px,0.98fr)]
"
        >
          {/* DESKTOP BRAND / FEATURE PANEL */}
<aside
className="
  relative hidden min-w-0
  flex-col justify-between
  p-6
  lg:order-2
  lg:flex
  lg:p-[clamp(1.25rem,2vw,2rem)]
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
                -left-28 -top-24
                h-96 w-96 rounded-full
                border border-[var(--primary)]/10
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                -left-12 -top-10
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
                    justify-center rounded-2xl shadow-lg
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

              <div className="mt-[clamp(1.25rem,3vh,2.5rem)] max-w-2xl">
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
                  START YOUR LEARNING WORKSPACE
                </div>

                <h2
                  className="
                    mt-4 max-w-2xl
                    text-[clamp(2.5rem,4.5vw,4.75rem)]
                    font-black leading-[1.04]
                    tracking-[-0.045em]
                    text-balance
                  "
                >
                  Make room for{" "}
                  <span className="text-[var(--primary)]">
                    better learning.
                  </span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 opacity-70 xl:text-base xl:leading-7">
                  Create your workspace and bring document chat,
                  focused revision and knowledge exploration
                  into one place.
                </p>
              </div>
            </div>

            {/* SIGNUP BENEFITS */}
            <div className="relative z-10 mt-2 space-y-2">
              {[
                {
                  number: "01",
                  title: "Your documents, in context",
                  description:
                    "Ask questions grounded in the material you upload.",
                },
                {
                  number: "02",
                  title: "Practice what you learn",
                  description:
                    "Build recall with generated flashcards and quizzes.",
                },
                {
                  number: "03",
                  title: "One connected workspace",
                  description:
                    "Keep your learning tools and documents together.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="
                    flex items-start gap-4
                    rounded-2xl border
                    border-[var(--border)]
                    bg-[var(--bg)]/55
                    p-4 backdrop-blur-sm
                  "
                >
                  <span className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-xl bg-[var(--primary)]/10
                    text-xs font-black
                    text-[var(--primary)]
                  ">
                    {item.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 opacity-60">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="relative z-10 mt-3 text-xs opacity-45">
  Your next learning session starts here.
</p>
          </aside>

          {/* SIGNUP FORM PANEL */}
<div
className="
  flex min-w-0 items-center justify-center
  px-5 py-7
  sm:px-9 sm:py-9
  lg:order-1
  lg:px-[clamp(2rem,3vw,3.5rem)]
  lg:py-3
"
>
            <div className="w-full max-w-[750px]">
              {/* MOBILE BRAND */}
              <div className="mb-6 text-center lg:hidden">
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

                <p className="mt-2 text-sm opacity-60">
                  Create your learning workspace.
                </p>
              </div>

             <div className="my-4">
  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
    <h1 className="text-[clamp(1.75rem,2.5vw,2.3rem)] font-black tracking-tight">
      Create your account
    </h1>

    <div className="
      inline-flex shrink-0 items-center gap-2
      rounded-full border border-[var(--border)]
      bg-[var(--bg)] px-3 py-1.5
      text-xs font-semibold opacity-75
    ">
      <span className="
        h-1.5 w-1.5 rounded-full
        bg-[var(--primary)]
      " />
      GET STARTED
    </div>
  </div>

  <p className="mt-1.5 text-sm leading-6 opacity-60 sm:text-base">
    Set up your RecallNova workspace.
  </p>
</div>

              <form
                onSubmit={handleSignup}
                className="space-y-3.5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="
                        pointer-events-none absolute
                        left-4 top-1/2 -translate-y-1/2
                        opacity-45
                      "
                    />

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Your name"
                      autoComplete="name"
                      maxLength={100}
                      className="
                        auth-input h-11 w-full
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
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold"
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
                        auth-input h-11 w-full
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
                    className="mb-1.5 block text-sm font-semibold"
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
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      maxLength={128}
                      className="
                        auth-input h-11 w-full
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

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Confirm password
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
                      id="confirm-password"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      maxLength={128}
                      className="
                        auth-input h-11 w-full
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
                        setShowConfirmPassword(
                          (value) => !value
                        )
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
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                    >
                      {showConfirmPassword ? (
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
                    btn-primary mt-1 flex h-12 w-full
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
                  {loading ? "Creating account..." : "Create account"}

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

              <div className="my-5 flex items-center gap-4">
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

              <p className="mt-5 text-center text-xs leading-5 opacity-55">
                Your RecallNova password is separate from your
                Google password. Google authentication is handled
                directly by Google.
              </p>

              {/* <p className="mt-3 text-center text-xs leading-5 opacity-55">
                By creating an account, you agree to RecallNova&apos;s{" "}
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
              </p> */}

              <div className="
                mt-6 border-t border-[var(--border)]
                pt-4 text-center text-sm
              ">
                <span className="opacity-60">
                  Already have an account?
                </span>{" "}
                <Link
                  href="/login"
                  className="
                    font-bold text-[var(--primary)]
                    underline-offset-4 hover:underline
                  "
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}