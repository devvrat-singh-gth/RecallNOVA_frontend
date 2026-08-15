"use client";

import Link from "next/link";
import {
  Brain,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function LearningPage() {
  return (
<div
  className="
    h-full
    overflow-y-auto
    overflow-x-hidden

 px-4 md:px-6 py-6 md:py-8

    custom-scrollbar
  "
>
      {/* HERO */}

      <div className="mb-10">

        <h1 className="
          text-4xl
          md:text-5xl
          font-black
          tracking-tight
        ">
          Learning Hub
        </h1>

        <p className="
          mt-3
          text-sm
          md:text-base
          opacity-70
          max-w-2xl
        ">
          Transform your PDFs into flashcards and quizzes
          for faster learning and long-term retention.
        </p>

      </div>

      {/* FEATURE GRID */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">

        {/* FLASHCARDS */}

        <Link
          href="/learning/flashcards"
          className="
            group
            relative

            rounded-3xl
            p-6

            border
            border-white/10

            bg-white/[0.04]
            backdrop-blur-xl

            hover:border-lime-400/20
            hover:bg-white/[0.06]

            transition-all
            duration-300

            hover:-translate-y-1
          "
        >

          <div className="
            w-14
            h-14

            rounded-2xl

            flex
            items-center
            justify-center

            bg-lime-400/10
          ">
            <GraduationCap
              size={28}
              className="text-lime-400"
            />
          </div>

          <h2 className="
            mt-5
            text-2xl
            font-bold
          ">
            Flashcards
          </h2>

          <p className="
            mt-2
            opacity-70
          ">
            Generate smart revision cards from your
            uploaded documents.
          </p>

          <div className="
            mt-6
            flex
            items-center
            gap-2

            text-lime-400
            font-semibold
          ">
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

        {/* QUIZ */}

        <Link
          href="/learning/quiz"
          className="
            group
            relative

            rounded-3xl
            p-6

            border
            border-white/10

            bg-white/[0.04]
            backdrop-blur-xl

            hover:border-lime-400/20
            hover:bg-white/[0.06]

            transition-all
            duration-300

            hover:-translate-y-1
          "
        >

          <div className="
            w-14
            h-14

            rounded-2xl

            flex
            items-center
            justify-center

            bg-cyan-400/10
          ">
            <Brain
              size={28}
              className="text-cyan-400"
            />
          </div>

          <h2 className="
            mt-5
            text-2xl
            font-bold
          ">
            Quiz
          </h2>

          <p className="
            mt-2
            opacity-70
          ">
            Challenge yourself with AI-generated quizzes
            from your study material.
          </p>

          <div className="
            mt-6
            flex
            items-center
            gap-2

            text-cyan-400
            font-semibold
          ">
            Start Quiz

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

      </div>

    </div>
  );
}