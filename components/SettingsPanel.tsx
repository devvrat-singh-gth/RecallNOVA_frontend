"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);

const { theme, setTheme } = useTheme();
  const [quizTimer, setQuizTimer] = useState(30);
  const [quizCount, setQuizCount] = useState(5);
  const [flashcardCount, setFlashcardCount] = useState(10);

  // 🔥 LOAD FROM LOCALSTORAGE
useEffect(() => {
  const savedTimer = localStorage.getItem("quiz_timer");
  const savedQuizCount = localStorage.getItem("quiz_count");
  const savedFlashCount = localStorage.getItem("flashcard_count");

  if (savedTimer) setQuizTimer(Number(savedTimer));
  if (savedQuizCount) setQuizCount(Number(savedQuizCount));
  if (savedFlashCount) setFlashcardCount(Number(savedFlashCount));
}, []);

  useEffect(() => {
    localStorage.setItem("quiz_timer", quizTimer.toString());
  }, [quizTimer]);

  useEffect(() => {
    localStorage.setItem("quiz_count", quizCount.toString());
  }, [quizCount]);

  useEffect(() => {
    localStorage.setItem("flashcard_count", flashcardCount.toString());
  }, [flashcardCount]);

  return (
    <div className="absolute top-4 right-4 z-50">
      {/* ⚙️ BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="text-xl bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
      >
        ⚙️
      </button>

      {/* PANEL */}
      {open && (
        <div className="mt-2 w-72 p-4 rounded-xl shadow-lg border bg-white dark:bg-gray-900">
          <h2 className="font-bold mb-3">Settings</h2>

          {/* 🎨 THEMES */}
          <div className="mb-4">
            <p className="font-semibold mb-1">Theme</p>
            <div className="flex gap-2 flex-wrap">
              {["light", "dark", "mint", "neon"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1 rounded border ${
                    theme === t ? "bg-black text-white" : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ⏱ QUIZ TIMER */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Quiz Timer (sec)
            </label>
            <input
              type="number"
              value={quizTimer}
              onChange={(e) => setQuizTimer(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* 🧠 QUIZ COUNT */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Quiz Questions
            </label>
            <input
              type="number"
              value={quizCount}
              onChange={(e) => setQuizCount(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* 📚 FLASHCARD COUNT */}
          <div className="mb-2">
            <label className="block text-sm font-semibold">
              Flashcards Count
            </label>
            <input
              type="number"
              value={flashcardCount}
              onChange={(e) => setFlashcardCount(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <button
  onClick={() => {
    localStorage.setItem("quiz_timer", quizTimer.toString());
    localStorage.setItem("quiz_count", quizCount.toString());
    localStorage.setItem("flashcard_count", flashcardCount.toString());
    alert("Settings saved ✅");
  }}
  className="btn-primary w-full mt-3"
>
  Save Settings
</button>
        </div>
        
      )}
    </div>
    
  );
}