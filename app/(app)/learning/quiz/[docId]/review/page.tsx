"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReviewPanel from "@/components/ReviewPanel";

export default function QuizReviewPage() {
  const router = useRouter();
  const params = useParams();

  const docId = params.docId as string;

  const [quiz, setQuiz] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    const raw = localStorage.getItem(
      `quiz_result_${docId}`
    );

    if (!raw) {
      router.push("/learning/quiz");
      return;
    }

    const data = JSON.parse(raw);

    setQuiz(data.quiz || []);
    setAnswers(data.answers || {});
  }, []);

  const getCorrectAnswer = (q: any) => {
    if (!q || !q.options) return "";

    if (typeof q.answer === "number") {
      return q.options[q.answer];
    }

    const ans = String(q.answer)
      .trim()
      .toUpperCase();

    if (["A", "B", "C", "D"].includes(ans)) {
      return q.options[ans.charCodeAt(0) - 65];
    }

    return q.answer;
  };

  return (
    <ReviewPanel
      activeQuiz={quiz}
      answers={answers}
      getCorrectAnswer={getCorrectAnswer}
      onBack={() =>
        router.push(`/learning/quiz/${docId}/result`)
      }
    />
  );
}