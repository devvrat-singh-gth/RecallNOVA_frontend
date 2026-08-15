"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileText,
  Layers3,
  MessageSquare,
  Network,
  Sparkles,
  Upload,
  BookOpen,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
<main
  className="
    h-[100dvh]
    w-full
    overflow-y-auto
    overflow-x-hidden
    overscroll-contain
    custom-scrollbar
    bg-[var(--bg)]
    text-[var(--text)]
  "
>
      {/* =========================
          HEADER
      ========================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[var(--border)]
          bg-[var(--bg)]/85
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-16
            w-full
            max-w-7xl
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
              shrink-0
              group
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                text-[var(--bg)]
                shadow-lg
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Sparkles size={17} />
            </div>

            <div>
              <div
                className="
                  text-base
                  font-black
                  tracking-tight
                  sm:text-lg
                "
              >
                RecallNova
              </div>

              <div
                className="
                  hidden
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  opacity-50
                  sm:block
                "
              >
                AI Learning Workspace
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav
            className="
              hidden
              items-center
              gap-7
              lg:flex
            "
          >
            <a
              href="#features"
              className="
                text-sm
                font-medium
                opacity-70
                transition
                hover:opacity-100
              "
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="
                text-sm
                font-medium
                opacity-70
                transition
                hover:opacity-100
              "
            >
              How it works
            </a>

            <a
              href="#learning"
              className="
                text-sm
                font-medium
                opacity-70
                transition
                hover:opacity-100
              "
            >
              Learning
            </a>

            <a
              href="#atlas"
              className="
                text-sm
                font-medium
                opacity-70
                transition
                hover:opacity-100
              "
            >
              Doc Atlas
            </a>
          </nav>

          {/* LOGIN */}

          <Link
            href="/login"
            className="
              inline-flex
              h-10
              items-center
              justify-center
              rounded-xl
              bg-[var(--primary)]
              px-4
              text-sm
              font-bold
              text-[var(--bg)]
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:opacity-90
              active:scale-[0.98]
              sm:px-5
            "
          >
            <span className="hidden sm:inline">
              Sign in
            </span>

            <span className="sm:hidden">
              Login
            </span>
          </Link>
        </div>
      </header>

      {/* =========================
          HERO
      ========================== */}

      <section
        className="
          relative
          overflow-hidden
        "
      >
        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-10
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[var(--primary)]
            opacity-10
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            grid
            min-h-[calc(100vh-64px)]
            w-full
            max-w-7xl
            items-center
            gap-14
            px-4
            py-16
            sm:px-6
            sm:py-20
            lg:grid-cols-2
            lg:px-8
            lg:py-24
          "
        >
          {/* LEFT */}

          <div
            className="
              max-w-3xl
            "
          >
            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border)]
                bg-[var(--card)]
                px-3
                py-1.5
                text-xs
                font-semibold
                opacity-90
              "
            >
              <Sparkles
                size={14}
                className="text-[var(--primary)]"
              />

              AI-powered learning from your documents
            </div>

            <h1
              className="
                text-4xl
                font-black
                leading-[1.02]
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Turn your PDFs into a{" "}
              <span className="text-[var(--primary)]">
                learning system.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-7
                opacity-70
                sm:text-lg
                sm:leading-8
              "
            >
              Upload your study material, ask questions directly from
              your documents, generate flashcards and quizzes, and
              understand how your knowledge connects.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <Link
                href="/login"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[var(--primary)]
                  px-6
                  text-sm
                  font-bold
                  text-[var(--bg)]
                  shadow-xl
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:opacity-90
                  active:scale-[0.98]
                "
              >
                Get started
                <ArrowRight size={17} />
              </Link>

              <a
                href="#features"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  px-6
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-white/[0.06]
                  active:scale-[0.98]
                "
              >
                Explore features
              </a>
            </div>

            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-3
                text-sm
                sm:grid-cols-3
              "
            >
              <div className="flex items-center gap-2 opacity-70">
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-[var(--primary)]"
                />
                Document-aware chat
              </div>

              <div className="flex items-center gap-2 opacity-70">
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-[var(--primary)]"
                />
                AI-generated learning
              </div>

              <div className="flex items-center gap-2 opacity-70">
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-[var(--primary)]"
                />
                Personal workspace
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}

          <div className="relative">
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-4
                shadow-2xl
                sm:p-5
              "
            >
              {/* MOCK TOPBAR */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[var(--border)]
                  pb-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-[var(--primary)]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      opacity-70
                    "
                  >
                    RecallNova Workspace
                  </span>
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-[var(--border)]
                    px-2.5
                    py-1
                    text-[10px]
                    opacity-60
                  "
                >
                  AI ready
                </div>
              </div>

              {/* MOCK CONTENT */}

              <div
                className="
                  mt-4
                  grid
                  gap-4
                  sm:grid-cols-[0.8fr_1.2fr]
                "
              >
                <div className="space-y-3">
                  <div
                    className="
                      rounded-2xl
                      border
                      border-[var(--border)]
                      p-4
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-[var(--primary)]/10
                        "
                      >
                        <FileText
                          size={17}
                          className="text-[var(--primary)]"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs font-bold">
                          Algorithms.pdf
                        </div>

                        <div className="mt-1 text-[10px] opacity-50">
                          29 pages
                        </div>
                      </div>
                    </div>
                  </div>

                  {[
                    ["AI PDF Chat", MessageSquare],
                    ["Flashcards", BookOpen],
                    ["Quiz", Brain],
                  ].map(
                    ([label, Icon]: any) => (
                      <div
                        key={label}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          border-[var(--border)]
                          p-4
                          transition
                          hover:bg-white/[0.04]
                        "
                      >
                        <div
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-[var(--primary)]/10
                          "
                        >
                          <Icon
                            size={15}
                            className="text-[var(--primary)]"
                          />
                        </div>

                        <span className="text-xs font-semibold">
                          {label}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--border)]
                    p-4
                  "
                >
                  <div
                    className="
                      text-[10px]
                      uppercase
                      tracking-widest
                      opacity-50
                    "
                  >
                    Ask your document
                  </div>

                  <div
                    className="
                      mt-4
                      rounded-2xl
                      bg-[var(--primary)]/10
                      p-4
                    "
                  >
                    <div
                      className="
                        text-xs
                        font-semibold
                      "
                    >
                      Explain the selected concept
                      using the uploaded PDF.
                    </div>
                  </div>

                  <div
                    className="
                      mt-3
                      rounded-2xl
                      border
                      border-[var(--border)]
                      p-4
                    "
                  >
                    <div
                      className="
                        text-xs
                        leading-6
                        opacity-70
                      "
                    >
                      RecallNova retrieves relevant
                      information from your document
                      and turns it into a focused
                      explanation.
                    </div>
                  </div>

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-[var(--border)]
                      px-3
                      py-2.5
                    "
                  >
                    <span className="text-[10px] opacity-50">
                      Ask another question...
                    </span>

                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-[var(--primary)]
                      "
                    >
                      <ArrowRight
                        size={13}
                        className="text-[var(--bg)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FEATURES
      ========================== */}

      <section
        id="features"
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-28
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--primary)]
              "
            >
              Everything in one workspace
            </div>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              From document to understanding.
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                opacity-65
                sm:text-base
              "
            >
              RecallNova connects the tasks students normally
              split across multiple tools into one learning
              workflow.
            </p>
          </div>

          <div
            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {[
              {
                icon: MessageSquare,
                title: "AI PDF Chat",
                text:
                  "Ask questions and receive answers grounded in your uploaded documents.",
              },
              {
                icon: BookOpen,
                title: "Flashcards",
                text:
                  "Turn study material into concise cards for faster revision.",
              },
              {
                icon: Brain,
                title: "Quizzes",
                text:
                  "Generate interactive questions and test your understanding.",
              },
              {
                icon: Network,
                title: "Doc Atlas",
                text:
                  "Explore document relationships through an evolving visual knowledge map.",
              },
            ].map(
              ({
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={title}
                  className="
                    group
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[var(--primary)]/30
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--primary)]/10
                    "
                  >
                    <Icon
                      size={22}
                      className="text-[var(--primary)]"
                    />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-bold
                    "
                  >
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
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================== */}

      <section
        id="how-it-works"
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-28
          "
        >
          <div className="text-center">
            <div
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--primary)]
              "
            >
              How it works
            </div>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              A simple learning loop.
            </h2>
          </div>

          <div
            className="
              mt-12
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-4
            "
          >
            {[
              {
                step: "01",
                icon: Upload,
                title: "Upload",
                text:
                  "Bring your PDFs into your private learning workspace.",
              },
              {
                step: "02",
                icon: MessageSquare,
                title: "Ask",
                text:
                  "Ask focused questions and retrieve context from your documents.",
              },
              {
                step: "03",
                icon: Layers3,
                title: "Learn",
                text:
                  "Generate flashcards and quizzes from the material you actually study.",
              },
              {
                step: "04",
                icon: Zap,
                title: "Improve",
                text:
                  "Practice repeatedly and use your learning progress to guide the next session.",
              },
            ].map(
              ({
                step,
                icon: Icon,
                title,
                text,
              }) => (
                <div
                  key={step}
                  className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    p-6
                  "
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[var(--primary)]/10
                      "
                    >
                      <Icon
                        size={20}
                        className="text-[var(--primary)]"
                      />
                    </div>

                    <span
                      className="
                        text-xs
                        font-black
                        opacity-25
                      "
                    >
                      {step}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-bold
                    "
                  >
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
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================
          LEARNING
      ========================== */}

      <section
        id="learning"
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-7xl
            gap-10
            px-4
            py-20
            sm:px-6
            lg:grid-cols-2
            lg:px-8
            lg:py-28
          "
        >
          <div>
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
              "
            >
              <Brain size={14} />
              Learning tools
            </div>

            <h2
              className="
                mt-5
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Study from the material you actually uploaded.
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                opacity-65
                sm:text-base
              "
            >
              RecallNova is designed around your documents instead
              of generic question banks. Your flashcards and quizzes
              are generated from your own study material.
            </p>
          </div>

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            <div
              className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-6
              "
            >
              <BookOpen
                size={22}
                className="text-[var(--primary)]"
              />

              <h3 className="mt-5 text-lg font-bold">
                Smart flashcards
              </h3>

              <p className="mt-2 text-sm leading-6 opacity-60">
                Review important concepts without manually
                preparing every card.
              </p>
            </div>

            <div
              className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-6
              "
            >
              <Brain
                size={22}
                className="text-[var(--primary)]"
              />

              <h3 className="mt-5 text-lg font-bold">
                Interactive quizzes
              </h3>

              <p className="mt-2 text-sm leading-6 opacity-60">
                Test yourself and reinforce what you've just learned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          DOC ATLAS
      ========================== */}

      <section
        id="atlas"
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-7xl
            gap-10
            px-4
            py-20
            sm:px-6
            lg:grid-cols-2
            lg:px-8
            lg:py-28
          "
        >
          <div
            className="
              order-2
              lg:order-1
            "
          >
            <div
              className="
                flex
                min-h-[320px]
                items-center
                justify-center
                rounded-[2rem]
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-6
              "
            >
              <div className="relative h-64 w-full max-w-md">
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    h-20
                    w-20
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]/15
                    ring-1
                    ring-[var(--primary)]/30
                  "
                >
                  <Network
                    size={28}
                    className="text-[var(--primary)]"
                  />
                </div>

                {[
                  "top-6 left-8",
                  "top-8 right-8",
                  "bottom-8 left-10",
                  "bottom-7 right-10",
                ].map((position, index) => (
                  <div
                    key={position}
                    className={`
                      absolute
                      ${position}
                      h-14
                      w-14
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--bg)]
                      shadow-lg
                    `}
                  >
                    <div className="flex h-full items-center justify-center">
                      <FileText
                        size={18}
                        className="text-[var(--primary)]"
                      />
                    </div>

                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        h-px
                        w-24
                        -translate-y-1/2
                        bg-[var(--primary)]/20
                      "
                      style={{
                        transform: `rotate(${index * 22 - 30}deg)`,
                        transformOrigin: "left center",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="
              order-1
              lg:order-2
            "
          >
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
              "
            >
              <Network size={14} />
              Doc Atlas
            </div>

            <h2
              className="
                mt-5
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              See how your documents connect.
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                opacity-65
                sm:text-base
              "
            >
              Doc Atlas is designed to become a visual knowledge
              layer for your documents, revealing relationships
              between concepts in an explorable 2D and 3D space.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          PRIVACY
      ========================== */}

      <section
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-20
            sm:px-6
            lg:px-8
            lg:py-24
          "
        >
          <div
            className="
              grid
              gap-6
              rounded-[2rem]
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-6
              sm:p-8
              lg:grid-cols-[1.1fr_0.9fr]
              lg:p-10
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--primary)]/10
                  "
                >
                  <ShieldCheck
                    size={21}
                    className="text-[var(--primary)]"
                  />
                </div>

                <div>
                  <div className="text-lg font-bold">
                    Built around your workspace
                  </div>

                  <div className="text-sm opacity-55">
                    Your account, documents and learning data stay
                    tied to your own authenticated workspace.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <ShieldCheck
                  size={18}
                  className="text-[var(--primary)]"
                />
                <div className="mt-3 text-sm font-bold">
                  Authenticated access
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] p-4">
                <Zap
                  size={18}
                  className="text-[var(--primary)]"
                />
                <div className="mt-3 text-sm font-bold">
                  Fast AI workflows
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================== */}

      <section
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            max-w-4xl
            px-4
            py-24
            text-center
            sm:px-6
            lg:px-8
            lg:py-32
          "
        >
          <Sparkles
            size={28}
            className="
              mx-auto
              text-[var(--primary)]
            "
          />

          <h2
            className="
              mt-5
              text-3xl
              font-black
              tracking-tight
              sm:text-5xl
            "
          >
            Your documents already contain the answers.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              opacity-65
              sm:text-base
            "
          >
            RecallNova gives you a focused workspace to ask,
            revise, practice and understand.
          </p>

          <Link
            href="/login"
            className="
              mt-8
              inline-flex
              h-12
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[var(--primary)]
              px-7
              text-sm
              font-bold
              text-[var(--bg)]
              shadow-xl
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:opacity-90
              active:scale-[0.98]
            "
          >
            Continue to RecallNova
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}

      <footer
        className="
          border-t
          border-[var(--border)]
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-col
            gap-6
            px-4
            py-8
            sm:px-6
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[var(--primary)]
                  text-[var(--bg)]
                "
              >
                <Sparkles size={14} />
              </div>

              <span className="font-bold">
                RecallNova
              </span>
            </div>

            <p className="mt-2 text-xs opacity-45">
              AI-powered learning from your documents.
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-xs
              opacity-55
            "
          >
            <a
              href="#features"
              className="transition hover:opacity-100"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:opacity-100"
            >
              How it works
            </a>

            <a
              href="#learning"
              className="transition hover:opacity-100"
            >
              Learning
            </a>

            <a
              href="#atlas"
              className="transition hover:opacity-100"
            >
              Doc Atlas
            </a>

            <Link
              href="/login"
              className="transition hover:opacity-100"
            >
              Sign in
            </Link>
          </div>

          <div className="text-xs opacity-40">
            © {new Date().getFullYear()} RecallNova
          </div>
        </div>
      </footer>
    </main>
  );
}