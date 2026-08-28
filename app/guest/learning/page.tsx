"use client";

import Link from "next/link";
import {
  Brain,
  GraduationCap,
  ArrowRight,
  Lock,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

export default function GuestLearningPage() {
  const [showQuizLock, setShowQuizLock] =
    useState(false);

  return (
    <div
      className="
        h-full
        overflow-y-auto
        overflow-x-hidden
        px-4 md:px-6
        py-6 md:py-8
        custom-scrollbar
      "
    >
      {/* HERO */}

      <div className="mb-10">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[var(--primary)]/10
            px-3
            py-1.5
            text-xs
            font-bold
            text-[var(--primary)]
            mb-4
          "
        >
          <Brain size={14} />
          Guest Learning
        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            tracking-tight
          "
        >
          Learning Hub
        </h1>

        <p
          className="
            mt-3
            text-sm
            md:text-base
            opacity-70
            max-w-2xl
          "
        >
          Transform your uploaded PDFs into
          flashcards and explore the learning
          workflow before creating an account.
        </p>
      </div>

      {/* FEATURE GRID */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >
        {/* FLASHCARDS */}

        <Link
          href="/guest/learning/flashcards"
          className="
            group
            relative
            rounded-3xl
            p-6
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
hover:border-[var(--primary)]/30
hover:bg-[var(--primary)]/5
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          <div
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              bg-lime-400/10
            "
          >
            <GraduationCap
              size={28}
              className="text-lime-400"
            />
          </div>

          <h2
            className="
              mt-5
              text-2xl
              font-bold
            "
          >
            Flashcards
          </h2>

          <p className="mt-2 opacity-70">
            Generate smart revision cards from
            your uploaded documents.
          </p>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              text-lime-400
              font-semibold
            "
          >
            Open Flashcards

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </Link>

        {/* QUIZ — LOCKED FOR GUEST */}

        <button
          type="button"
          onClick={() =>
            setShowQuizLock(true)
          }
          className="
            group
            relative
            text-left
            rounded-3xl
            p-6
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            hover:border-cyan-400/20
            hover:bg-white/[0.06]
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          <div
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
bg-[var(--primary)]/10
            "
          >
            <Brain
              size={28}
              className="text-cyan-400"
            />
          </div>

          <h2
            className="
              mt-5
              text-2xl
              font-bold
            "
          >
            Quiz
          </h2>

          <p className="mt-2 opacity-70">
            AI-generated quizzes are available
            after creating a free account.
          </p>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
text-[var(--primary)]
font-semibold
            "
          >
            <Lock size={17} />

            Sign up to unlock

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </button>
      </div>

      {/* QUIZ LOCK MODAL */}

      {showQuizLock && (
<div
  className="
    fixed
    inset-0
    z-[9999]
    flex
    items-center
    justify-center
    bg-[var(--bg)]/70
    backdrop-blur-sm
    p-4
  "
  onClick={() =>
    setShowQuizLock(false)
  }
>
<div
  className="
    w-full
    max-w-sm
    rounded-3xl
    border
    border-[var(--border)]
    bg-[var(--card)]
    text-[var(--text)]
    p-6
    shadow-2xl
  "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
<div
  className="
    mx-auto
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-2xl
    bg-[var(--primary)]/10
  "
>
<Lock
  size={26}
  className="text-[var(--primary)]"
/>
            </div>

            <h2
              className="
                mt-5
                text-xl
                font-black
                text-center
              "
            >
              Quiz Access Locked
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-center
                opacity-70
              "
            >
              Create a free RecallNova account
              to access AI-generated quizzes.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowQuizLock(false)
                }
className="
  flex-1
  rounded-xl
  border
  border-[var(--border)]
  bg-[var(--card)]
  py-3
  text-sm
  font-semibold
  text-[var(--text)]
  transition
  hover:bg-[var(--bg)]
"
              >
                Cancel
              </button>

              <Link
                href="/signup"
className="
  flex-1
  inline-flex
  items-center
  justify-center
  gap-2
  rounded-xl
  bg-[var(--primary)]
  py-3
  text-sm
  font-bold
  text-[var(--bg)]
  transition
  hover:opacity-90
"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}