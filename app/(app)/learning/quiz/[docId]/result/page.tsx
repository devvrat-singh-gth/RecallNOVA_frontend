"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QuizResultPage() {
  const router = useRouter();
  const params = useParams();

  const docId = params.docId as string;

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem(
      `quiz_result_${docId}`
    );

    if (!raw) {
      router.push("/learning/quiz");
      return;
    }

    const data = JSON.parse(raw);

    setScore(data.score || 0);
    setTotal(data.total || 0);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center max-w-md mx-auto">

        <h2 className="text-2xl font-bold mb-4">
          Quiz Completed 🎉
        </h2>

        <p className="text-lg mb-4">
          Score: {score} / {total}
        </p>

        <div className="flex flex-col gap-3 mt-4">

          <button
            onClick={() =>
              router.push(
                `/learning/quiz/${docId}/review`
              )
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Review Answers
          </button>

          <button
            onClick={() =>
              router.push("/learning/quiz")
            }
            className="btn-primary"
          >
            Back To Quiz
          </button>

        </div>
      </div>
    </div>
  );
}