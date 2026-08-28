"use client";

import { useParams, useRouter } from "next/navigation";
import { getQuiz } from "@/lib/api";

export default function StartPage() {
  const { docId } =
    useParams<{ docId: string }>();

  const router = useRouter();

  const start = async () => {
    const res = await getQuiz({
      doc_id: docId,
    });

    localStorage.setItem(
      `quiz_${docId}`,
      JSON.stringify({
        quiz: res.quiz,
        answers: {},
        submitted: {},
      })
    );

    router.push(
      `/learning/quiz/${docId}/session?q=0`
    );
  };

  return (
    <div className="p-6 text-center">
      <button
        onClick={start}
        className="btn-primary"
      >
        Start Quiz
      </button>
    </div>
  );
}