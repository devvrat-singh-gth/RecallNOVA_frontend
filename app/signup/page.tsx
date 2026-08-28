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
                color: "var(--bg)",
              }}
            >
              <Sparkles size={19} />
            </span>

            <span>RecallNova</span>
          </Link>

          <p className="mt-3 text-sm opacity-60">
            Create your private learning workspace.
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
              Create your account
            </h1>

            <p className="mt-2 text-sm opacity-60">
              Create a RecallNova email
              account or continue with Google.
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Name
              </label>

              <div className="relative">
                <User
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
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={100}
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
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={128}
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

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
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
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={128}
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
                    setShowConfirmPassword(
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
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>
          </form>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-xl p-3 text-sm"
              style={{
                background:
                  "rgba(239,68,68,.10)",
                color: "#f87171",
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
            Your RecallNova password is
            separate from your Google password.
            Google authentication is handled
            directly by Google.
          </p>

          <p className="mt-4 text-center text-xs leading-relaxed opacity-50">
            By creating an account, you agree to
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--primary)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}