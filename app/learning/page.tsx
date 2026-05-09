"use client";

import Link from "next/link";

export default function LearningPage() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Learning Hub</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/learning/flashcards" className="card hover:scale-[1.02] transition">
          <h2 className="text-xl font-bold mb-2">📚 Flashcards</h2>
          <p className="text-sm opacity-70">
            Revise concepts quickly with smart cards
          </p>
        </Link>

        <Link href="/learning/quiz" className="card hover:scale-[1.02] transition">
          <h2 className="text-xl font-bold mb-2">🧠 Quiz</h2>
          <p className="text-sm opacity-70">
            Test your knowledge interactively
          </p>
        </Link>
      </div>
    </div>
  );
}