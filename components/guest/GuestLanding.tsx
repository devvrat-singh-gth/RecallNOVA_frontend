"use client";

import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
  Upload,
  FileText,
  BookOpen,
  Brain,
  Lock,
  UserPlus,
} from "lucide-react";

export default function GuestLanding() {
  return (
<div
  className="
    w-full
    min-w-0
    overflow-x-hidden
    text-[var(--text)]
  "
>
      <div
        className="
          mx-auto
          w-full
          min-w-0

          px-4
          py-5

          sm:px-6
          sm:py-6

          lg:px-8
          lg:py-8

          xl:max-w-[1600px]
        "
      >
        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="
            w-full
            min-w-0

            rounded-3xl

            border
            border-[var(--border)]

            bg-[var(--card)]

            p-5

            sm:p-8

            lg:p-10
          "
        >
          {/* Guest badge */}
          <div
            className="
              inline-flex
              max-w-full

              items-center
              gap-2

              rounded-full

              bg-[var(--primary)]/10

              px-3
              py-1.5

              text-xs
              font-bold

              text-[var(--primary)]
            "
          >
            <Sparkles
              size={14}
              className="shrink-0"
            />

            <span>Guest Mode</span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-5

              max-w-4xl

              text-[clamp(2rem,6vw,3rem)]
              font-black

              leading-[1.08]
              tracking-tight

              sm:text-4xl

              lg:text-5xl

              xl:text-6xl
            "
          >
            Explore RecallNova
            <br />
            before creating an account.
          </h1>

          {/* Description */}
          <p
            className="
              mt-5

              max-w-3xl

              text-sm
              leading-6

              opacity-70

              sm:text-base
              sm:leading-7
            "
          >
            Upload study material, try AI document chat,
            generate flashcards and quizzes, and experience
            the learning workflow with guest access.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-7

              grid
              w-full

              grid-cols-1

              gap-3

              sm:flex
              sm:w-auto
              sm:flex-wrap
            "
          >
            <Link
              href="/guest/chat"
              className="
                inline-flex

                h-12
                w-full

                items-center
                justify-center
                gap-2

                rounded-xl

                bg-[var(--primary)]

                px-5

                text-sm
                font-bold

                text-[var(--bg)]

                transition-all
                duration-200

                hover:-translate-y-0.5

                sm:w-auto
              "
            >
              <span>Start Exploring</span>

              <ArrowRight
                size={16}
                className="shrink-0"
              />
            </Link>

            <Link
              href="/login"
              className="
                inline-flex

                h-12
                w-full

                items-center
                justify-center
                gap-2

                rounded-xl

                border
                border-[var(--border)]

                px-5

                text-sm
                font-semibold

                transition

                hover:bg-white/[0.04]

                sm:w-auto
              "
            >
              <UserPlus
                size={16}
                className="shrink-0"
              />

              <span>Create Account</span>
            </Link>
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section className="mt-5 sm:mt-6">
          <div
            className="
              grid
              w-full
              min-w-0

              grid-cols-1

              gap-4

              sm:grid-cols-2

              xl:grid-cols-4
            "
          >
            <FeatureCard
              icon={<Upload size={22} />}
              title="Upload PDFs"
              text="Upload and analyze your study material."
            />

            <FeatureCard
              icon={<FileText size={22} />}
              title="Document Chat"
              text="Ask AI questions directly from your files."
            />

            <FeatureCard
              icon={<BookOpen size={22} />}
              title="Flashcards"
              text="Generate instant study cards."
            />

            <FeatureCard
              icon={<Brain size={22} />}
              title="Quizzes"
              text="Create AI-powered quizzes."
            />
          </div>
        </section>

        {/* =====================================================
            GUEST LIMITS
        ===================================================== */}

        <section
          className="
            mt-5
            sm:mt-6

            w-full
            min-w-0

            rounded-3xl

            border
            border-yellow-500/20

            bg-yellow-500/5

            p-5

            sm:p-6
          "
        >
          {/* Header */}
          <div
            className="
              flex
              min-w-0

              items-start
              gap-3
            "
          >
            <Lock
              size={20}
              className="
                mt-0.5
                shrink-0
                text-yellow-400
              "
            />

            <div className="min-w-0">
              <h2 className="font-bold">
                Guest Mode Limits
              </h2>

              <p className="mt-1 text-sm opacity-70">
                Current limits based on your guest plan.
              </p>
            </div>
          </div>

          {/* Limits */}
          <div
            className="
              mt-5

              grid
              w-full

              grid-cols-1

              gap-3

              sm:grid-cols-2

              lg:grid-cols-3
            "
          >
            <LimitCard
              value="10"
              label="Messages / Day"
            />

            <LimitCard
              value="2"
              label="Documents"
            />

            <LimitCard
              value="5"
              label="Chat Sessions"
            />

            <LimitCard
              value="2"
              label="Flashcards / Day"
            />

            <LimitCard
              value="2"
              label="Quizzes / Day"
            />

            <LimitCard
              value="5"
              label="Requests / Minute"
            />
          </div>

          {/* Upgrade */}
          <Link
            href="/signup"
            className="
              mt-6

              inline-flex

              h-11

              w-full

              items-center
              justify-center
              gap-2

              rounded-xl

              bg-[var(--primary)]

              px-4

              text-sm
              font-bold

              text-[var(--bg)]

              sm:w-auto
            "
          >
            <span>Unlock Full Access</span>

            <ArrowRight
              size={15}
              className="shrink-0"
            />
          </Link>
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        min-w-0

        rounded-3xl

        border
        border-[var(--border)]

        bg-[var(--card)]

        p-5

        transition-all
        duration-300

        hover:-translate-y-1
      "
    >
      <div className="text-[var(--primary)]">
        {icon}
      </div>

      <h3 className="mt-4 font-bold">
        {title}
      </h3>

      <p
        className="
          mt-2

          text-sm
          leading-6

          opacity-60
        "
      >
        {text}
      </p>
    </div>
  );
}

/* ============================================================
   LIMIT CARD
============================================================ */

function LimitCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        min-w-0

        rounded-2xl

        border
        border-yellow-500/15

        bg-black/10

        p-4
      "
    >
      <div
        className="
          text-2xl
          font-black

          text-yellow-300
        "
      >
        {value}
      </div>

      <div
        className="
          mt-1

          text-sm

          opacity-70
        "
      >
        {label}
      </div>
    </div>
  );
}