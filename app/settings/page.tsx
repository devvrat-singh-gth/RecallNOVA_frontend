"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Palette,
  BookOpen,
  Timer,
  Layers3,
  UserCircle,
  Save,
} from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/components/auth/AuthProvider";

const themes = [
  "light",
  "dark",
  "mint",
  "neon",
] as const;

type ThemeName = (typeof themes)[number];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const { user } = useAuth();

  const [imageFailed, setImageFailed] =
    useState(false);

  const [quizTimer, setQuizTimer] =
    useState(30);

  const [quizCount, setQuizCount] =
    useState(5);

  const [flashcardCount, setFlashcardCount] =
    useState(10);

const [saved, setSaved] =
  useState(false);

/* -------------------------------------------------------
   VALUE LIMITS
------------------------------------------------------- */

const clamp = (
  value: number,
  min: number,
  max: number
) =>
  Math.min(
    max,
    Math.max(min, value)
  );

  /* -------------------------------------------------------
     PROFILE IMAGE
  ------------------------------------------------------- */

  useEffect(() => {
    setImageFailed(false);
  }, [user?.picture]);

  /* -------------------------------------------------------
     LOAD SETTINGS
  ------------------------------------------------------- */

  useEffect(() => {
    const savedTimer =
      localStorage.getItem("quiz_timer");

    const savedQuizCount =
      localStorage.getItem("quiz_count");

    const savedFlashCount =
      localStorage.getItem(
        "flashcard_count"
      );

    if (savedTimer) {
      setQuizTimer(
        Number(savedTimer)
      );
    }

    if (savedQuizCount) {
      setQuizCount(
        Number(savedQuizCount)
      );
    }

    if (savedFlashCount) {
      setFlashcardCount(
        Number(savedFlashCount)
      );
    }
  }, []);

  /* -------------------------------------------------------
     SAVE
  ------------------------------------------------------- */

  const saveSettings = () => {
    localStorage.setItem(
      "quiz_timer",
      quizTimer.toString()
    );

    localStorage.setItem(
      "quiz_count",
      quizCount.toString()
    );

    localStorage.setItem(
      "flashcard_count",
      flashcardCount.toString()
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /* -------------------------------------------------------
     DISPLAY DATA
  ------------------------------------------------------- */

  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "User";

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (part) => part[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <main
      className="
        h-[100dvh]
        w-full
        overflow-y-auto
        overflow-x-hidden
        custom-scrollbar
        bg-[var(--bg)]
        text-[var(--text)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
          lg:py-10
        "
      >
        {/* -------------------------------------------------
            HEADER
        ------------------------------------------------- */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-2
            sm:mb-10
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[var(--primary)]/10
              "
            >
              <Palette
                size={20}
                className="text-[var(--primary)]"
              />
            </div>

            <div>
              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  sm:text-4xl
                "
              >
                Settings
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  opacity-60
                  sm:text-base
                "
              >
                Customize your RecallNova
                experience.
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            CONTENT
        ------------------------------------------------- */}

        <div className="grid gap-6">

          {/* -------------------------------------------------
              PROFILE
          ------------------------------------------------- */}

          <section
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              shadow-sm
            "
          >
            <div
              className="
                border-b
                border-[var(--border)]
                px-5
                py-4
                sm:px-6
              "
            >
              <div className="flex items-center gap-3">
                <UserCircle
                  size={19}
                  className="text-[var(--primary)]"
                />

                <div>
                  <h2 className="font-bold">
                    Profile
                  </h2>

                  <p className="text-xs opacity-50">
                    Your RecallNova account
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                gap-5
                p-5
                sm:flex-row
                sm:items-center
                sm:p-6
              "
            >
              {/* AVATAR */}

              {user?.picture &&
              !imageFailed ? (
                <img
                  src={user.picture}
                  alt={displayName}
                  onError={() =>
                    setImageFailed(true)
                  }
                  className="
                    h-20
                    w-20
                    shrink-0
                    rounded-full
                    border
                    border-[var(--border)]
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-20
                    w-20
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-lime-400
                    text-xl
                    font-black
                    text-black
                  "
                >
                  {initials}
                </div>
              )}

              {/* DETAILS */}

              <div className="min-w-0">
                <p
                  className="
                    break-words
                    text-xl
                    font-black
                  "
                >
                  {displayName}
                </p>

                <p
                  className="
                    mt-1
                    break-all
                    text-sm
                    opacity-60
                  "
                >
                  {user?.email ||
                    "No email available"}
                </p>

                <div className="mt-3">
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-[var(--border)]
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      capitalize
                    "
                  >
                    {user?.plan ||
                      "free"}{" "}
                    plan
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------
              APPEARANCE
          ------------------------------------------------- */}

          <section
            className="
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-5
              sm:p-6
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]/10
                "
              >
                <Palette
                  size={18}
                  className="text-[var(--primary)]"
                />
              </div>

              <div>
                <h2 className="font-bold">
                  Appearance
                </h2>

                <p className="text-xs opacity-50">
                  Choose your workspace theme.
                </p>
              </div>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-4
              "
            >
              {themes.map((item) => {
                const active =
                  theme === item;

                return (
            <button
  key={item}
  type="button"
  onClick={() =>
    setTheme(item as ThemeName)
  }
  className={`
    relative
    flex
    min-h-16
    items-center
    justify-center
    rounded-2xl
    border
    px-4
    py-3
    text-sm
    font-semibold
    capitalize
    transition-all
    duration-200
    hover:-translate-y-0.5

    ${
      active
        ? "btn-primary border-transparent"
        : `
          border-[var(--border)]
          hover:bg-white/[0.04]
        `
    }
  `}
>
  {item}

  {active && (
    <Check
      size={15}
      className="absolute right-3 top-3"
    />
  )}
</button>
                );
              })}
            </div>
          </section>

          {/* -------------------------------------------------
              LEARNING PREFERENCES
          ------------------------------------------------- */}

          <section
            className="
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              p-5
              sm:p-6
            "
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
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

              <div>
                <h2 className="font-bold">
                  Learning Preferences
                </h2>

                <p className="text-xs opacity-50">
                  Set your default learning behavior.
                </p>
              </div>
            </div>

            <div
              className="
                grid
                gap-4
                md:grid-cols-3
              "
            >
              {/* QUIZ TIMER */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--border)]
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Timer
                    size={17}
                    className="text-[var(--primary)]"
                  />

                  <label
                    htmlFor="quizTimer"
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Quiz Timer
                  </label>
                </div>
<input
  id="quizTimer"
  type="number"
  min={1}
  value={quizTimer}
  onChange={(e) =>
    setQuizTimer(
      Math.max(
        1,
        Number(
          e.target.value
        ) || 1
      )
    )
  }
  className="
    input
    mt-3
    w-full
  "
/>

                <p
                  className="
                    mt-2
                    text-xs
                    opacity-40
                  "
                >
                  Time allowed per quiz session.
                </p>
              </div>

              {/* QUIZ QUESTIONS */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--border)]
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <BookOpen
                    size={17}
                    className="text-[var(--primary)]"
                  />

                  <label
                    htmlFor="quizCount"
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Quiz Questions
                  </label>
                </div>

                <input
                  id="quizCount"
                  type="number"
                  min={1}
                  value={quizCount}
                  onChange={(e) =>
                    setQuizCount(
                      clamp(
                        Number(
                          e.target.value
                        ) || 1,
                        1,
                        10
                      )
                    )
                  }
                  className="
                    input
                    mt-3
                    w-full
                  "
                />

                <p
                  className="
                    mt-2
                    text-xs
                    opacity-40
                  "
                >
                  Default questions per quiz.
                </p>
              </div>

              {/* FLASHCARDS */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--border)]
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Layers3
                    size={17}
                    className="text-[var(--primary)]"
                  />

                  <label
                    htmlFor="flashcardCount"
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Flashcards
                  </label>
                </div>

                <input
                  id="flashcardCount"
                  type="number"
                  min={1}
                  value={flashcardCount}
                  onChange={(e) =>
                    setFlashcardCount(
                      clamp(
                        Number(
                          e.target.value
                        ) || 1,
                        1,
                        20
                      )
                    )
                  }
                  className="
                    input
                    mt-3
                    w-full
                  "
                />

                <p
                  className="
                    mt-2
                    text-xs
                    opacity-40
                  "
                >
                  Default cards generated.
                </p>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------
              SAVE
          ------------------------------------------------- */}

          <div
            className="
              flex
              flex-col
              gap-3
              pb-12
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                text-xs
                leading-5
                opacity-40
              "
            >
              These learning preferences are
              currently stored locally on this device.
            </p>

            <button
              type="button"
              onClick={saveSettings}
              className="
                btn-primary
                inline-flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                font-semibold
                sm:w-auto
              "
            >
              {saved ? (
                <>
                  <Check size={17} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}