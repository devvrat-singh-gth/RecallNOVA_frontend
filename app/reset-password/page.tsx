"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import {
  useSearchParams,
} from "next/navigation";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import {
  resetPassword,
} from "@/lib/api";

export default function ResetPasswordPage() {
  const searchParams =
    useSearchParams();

  const token =
    searchParams.get(
      "token"
    );

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!token) {
      setError(
        "This password reset link is invalid."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      await resetPassword(
        token,
        password
      );

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Password reset failed."
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
          {success ? (
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
                <CheckCircle2
                  size={30}
                  className="text-[var(--primary)]"
                />
              </div>

              <h1 className="mt-6 text-2xl font-black">
                Password updated
              </h1>

              <p className="mt-3 text-sm leading-6 opacity-60">
                Your RecallNova email
                account password has been
                updated. You can now sign
                in again.
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
                Sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-black">
                Set a new password
              </h1>

              <p className="mt-2 text-sm opacity-60">
                Choose a new password for
                your native RecallNova
                account.
              </p>

              {!token && (
                <div
                  className="
                    mt-5
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
                  This password reset link
                  is invalid or missing.
                </div>
              )}

              <form
                onSubmit={
                  handleSubmit
                }
                className="mt-7 space-y-4"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                    "
                  >
                    New password
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
                      onChange={(
                        event
                      ) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      autoComplete="new-password"
                      minLength={8}
                      maxLength={128}
                      required
                      className="
                        auth-input
                        h-12
                        w-full
                        rounded-xl
                        border
                        bg-[var(--card)]
                        pl-11
                        pr-11
                        outline-none
                        transition
                        border-[var(--border)]
                        focus:border-lime-400/50
                        focus:ring-2
                        focus:ring-lime-400/30
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) =>
                            !value
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
                        hover:bg-white/5
                        hover:opacity-100
                      "
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
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                    "
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
                      value={
                        confirmPassword
                      }
                      onChange={(
                        event
                      ) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      autoComplete="new-password"
                      minLength={8}
                      maxLength={128}
                      required
                      className="
                        auth-input
                        h-12
                        w-full
                        rounded-xl
                        border
                        bg-[var(--card)]
                        pl-11
                        pr-11
                        outline-none
                        transition
                        border-[var(--border)]
                        focus:border-lime-400/50
                        focus:ring-2
                        focus:ring-lime-400/30
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (value) =>
                            !value
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
                        hover:bg-white/5
                        hover:opacity-100
                      "
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="
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

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !token
                  }
                  className="
                    btn-primary
                    h-12
                    w-full
                    rounded-xl
                    font-semibold
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Updating password..."
                    : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}