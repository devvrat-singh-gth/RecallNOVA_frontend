"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  MessageSquare,
  Network,
  Upload,
} from "lucide-react";

export default function AuthenticatedHome() {
  return (
    <div
      className="
        h-full
        w-full
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        custom-scrollbar
        bg-[var(--bg)]
        text-[var(--text)]
      "
    >
      <div
        className="
          mx-auto
          w-full

          px-[clamp(1rem,2.5vw,4rem)]
          py-[clamp(1.25rem,2vw,2.5rem)]
        "
      >
        {/* ==================================================
            HERO
        ================================================== */}

        <section
          className="
            w-full

            rounded-3xl
            border
            border-[var(--border)]
            bg-[var(--card)]

            p-[clamp(1.25rem,2.5vw,3rem)]

            shadow-xl
          "
        >
          <div
            className="
              w-full
              max-w-4xl
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
              <MessageSquare size={14} />

              AI Learning Workspace
            </div>

            <h1
              className="
                mt-5

                text-[clamp(2rem,4vw,3.75rem)]

                font-black
                leading-[1.05]
                tracking-tight
              "
            >
              Your learning workspace is ready.
            </h1>

            <p
              className="
                mt-4

                max-w-3xl

                text-[clamp(0.875rem,1.2vw,1rem)]

                leading-7
                opacity-65
              "
            >
              Upload your documents, chat with your PDFs,
              create flashcards, test yourself with quizzes,
              and explore your knowledge through Doc Atlas.
            </p>

            <div
              className="
                mt-7

                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
              "
            >
              <Link
                href="/chat"
                className="
                  inline-flex
                  h-11

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
                  hover:opacity-90

                  active:scale-[0.98]
                "
              >
                Start chatting

                <ArrowRight size={16} />
              </Link>

              <Link
                href="/upload"
                className="
                  inline-flex
                  h-11

                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  border
                  border-[var(--border)]

                  bg-[var(--bg)]

                  px-5

                  text-sm
                  font-semibold

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-white/[0.04]

                  active:scale-[0.98]
                "
              >
                <Upload size={16} />

                Upload documents
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <section className="mt-6">
          <div
            className="
              grid
              gap-4

              sm:grid-cols-2

              xl:grid-cols-4
            "
          >
            {/* CHAT */}

            <Link
              href="/chat"
              className="
                group

                min-w-0

                rounded-3xl
                border
                border-[var(--border)]

                bg-[var(--card)]

                p-[clamp(1rem,1.5vw,1.35rem)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[var(--primary)]/30
              "
            >
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
                <MessageSquare
                  size={20}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2
                className="
                  mt-5
                  text-lg
                  font-bold
                "
              >
                AI PDF Chat
              </h2>

              <p
                className="
                  mt-2

                  text-sm
                  leading-6
                  opacity-60
                "
              >
                Ask questions grounded in your documents.
              </p>

              <div
                className="
                  mt-5

                  flex
                  items-center
                  gap-2

                  text-sm
                  font-semibold
                  text-[var(--primary)]
                "
              >
                Open chat

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </div>
            </Link>

            {/* DOCUMENTS */}

            <Link
              href="/upload"
              className="
                group

                min-w-0

                rounded-3xl
                border
                border-[var(--border)]

                bg-[var(--card)]

                p-[clamp(1rem,1.5vw,1.35rem)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[var(--primary)]/30
              "
            >
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
                <FileText
                  size={20}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2
                className="
                  mt-5
                  text-lg
                  font-bold
                "
              >
                Documents
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  opacity-60
                "
              >
                Upload and manage your study material.
              </p>

              <div
                className="
                  mt-5

                  flex
                  items-center
                  gap-2

                  text-sm
                  font-semibold
                  text-[var(--primary)]
                "
              >
                Manage files

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </div>
            </Link>

            {/* LEARNING */}

            <Link
              href="/learning"
              className="
                group

                min-w-0

                rounded-3xl
                border
                border-[var(--border)]

                bg-[var(--card)]

                p-[clamp(1rem,1.5vw,1.35rem)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[var(--primary)]/30
              "
            >
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
                <Brain
                  size={20}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2
                className="
                  mt-5
                  text-lg
                  font-bold
                "
              >
                Learning
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  opacity-60
                "
              >
                Create flashcards and challenge yourself
                with quizzes.
              </p>

              <div
                className="
                  mt-5

                  flex
                  items-center
                  gap-2

                  text-sm
                  font-semibold
                  text-[var(--primary)]
                "
              >
                Open learning

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </div>
            </Link>

            {/* DOC ATLAS */}

            <Link
              href="/doc-atlas"
              className="
                group

                min-w-0

                rounded-3xl
                border
                border-[var(--border)]

                bg-[var(--card)]

                p-[clamp(1rem,1.5vw,1.35rem)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[var(--primary)]/30
              "
            >
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
                <Network
                  size={20}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2
                className="
                  mt-5
                  text-lg
                  font-bold
                "
              >
                Doc Atlas
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  opacity-60
                "
              >
                Explore relationships between concepts
                and documents.
              </p>

              <div
                className="
                  mt-5

                  flex
                  items-center
                  gap-2

                  text-sm
                  font-semibold
                  text-[var(--primary)]
                "
              >
                Explore atlas

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </div>
            </Link>
          </div>
        </section>

        {/* ==================================================
            LEARNING PREVIEW
        ================================================== */}

        <section
          className="
            mt-6

            grid
            gap-6

            lg:grid-cols-2
          "
        >
          {/* LEARNING */}

          <div
            className="
              min-w-0

              rounded-3xl
              border
              border-[var(--border)]

              bg-[var(--card)]

              p-[clamp(1.25rem,2vw,1.75rem)]
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0

                  items-center
                  justify-center

                  rounded-xl

                  bg-[var(--primary)]/10
                "
              >
                <BookOpen
                  size={18}
                  className="text-[var(--primary)]"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold">
                  Learn from your documents
                </h3>

                <p className="text-xs opacity-50">
                  Flashcards and quizzes generated
                  from your material
                </p>
              </div>
            </div>

            <div
              className="
                mt-6

                grid
                gap-3

                sm:grid-cols-2
              "
            >
              <Link
                href="/learning/flashcards"
                className="
                  rounded-2xl
                  border
                  border-[var(--border)]

                  p-4

                  transition

                  hover:bg-white/[0.04]
                "
              >
                <div className="text-sm font-bold">
                  Flashcards
                </div>

                <div className="mt-1 text-xs opacity-55">
                  Revise key concepts quickly.
                </div>
              </Link>

              <Link
                href="/learning/quiz"
                className="
                  rounded-2xl
                  border
                  border-[var(--border)]

                  p-4

                  transition

                  hover:bg-white/[0.04]
                "
              >
                <div className="text-sm font-bold">
                  Quiz
                </div>

                <div className="mt-1 text-xs opacity-55">
                  Test your understanding interactively.
                </div>
              </Link>
            </div>
          </div>

          {/* KNOWLEDGE */}

          <div
            className="
              min-w-0

              rounded-3xl
              border
              border-[var(--border)]

              bg-[var(--card)]

              p-[clamp(1.25rem,2vw,1.75rem)]
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0

                  items-center
                  justify-center

                  rounded-xl

                  bg-[var(--primary)]/10
                "
              >
                <Network
                  size={18}
                  className="text-[var(--primary)]"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold">
                  Your document knowledge layer
                </h3>

                <p className="text-xs opacity-50">
                  Doc Atlas will become your visual
                  knowledge map
                </p>
              </div>
            </div>

            <div
              className="
                mt-6

                min-h-32

                rounded-2xl

                border
                border-[var(--border)]

                bg-[var(--bg)]

                p-4
              "
            >
              <div
                className="
                  flex
                  min-h-24
                  h-full

                  items-center
                  justify-center

                  text-center
                  text-sm

                  opacity-55
                "
              >
                Explore connected ideas across your
                uploaded documents.
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM SPACE */}

        <div className="h-8 sm:h-12" />
      </div>
    </div>
  );
}