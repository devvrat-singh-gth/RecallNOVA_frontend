"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { saveQuizProgress } from "@/lib/api";

export default function QuizSessionPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
const [autoAdvance, setAutoAdvance] = useState(true);
  const docId = params.docId as string;

  const [quiz, setQuiz] = useState<any[]>([]);
 const [current, setCurrent] = useState(
  Number(searchParams.get("q") || 1)
);
const questionIndex = current - 1;
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState<any>({});
const [timeLeft, setTimeLeft] = useState(15);
const [quizTimer, setQuizTimer] = useState(15);
  useEffect(() => {
    const raw = localStorage.getItem(`quiz_${docId}`);

    if (!raw) {
      router.push("/learning/quiz");
      return;
    }

    const data = JSON.parse(raw);

    setQuiz(data.quiz || []);
    setAnswers(data.answers || {});
setSubmitted(data.submitted || {});

const savedTimer = localStorage.getItem("quiz_timer");

if (savedTimer) {
  const timer = Number(savedTimer);

  setQuizTimer(timer);
  setTimeLeft(timer);
}  }, [docId]);
useEffect(() => {
  setTimeLeft(quizTimer);
}, [current, quizTimer]);

const q = quiz[questionIndex];
useEffect(() => {
  if (
    quiz.length > 0 &&
    (current < 1 || current > quiz.length)
  ) {
    router.replace(
      `/learning/quiz/${docId}/session?q=1`
    );
  }
}, [current, quiz.length]);
  const getCorrectAnswer = (q: any) => {
    if (!q || !q.options) return "";

    if (typeof q.answer === "number") {
      return q.options[q.answer];
    }

    const ans = String(q.answer).trim().toUpperCase();

    if (["A", "B", "C", "D"].includes(ans)) {
      return q.options[ans.charCodeAt(0) - 65];
    }

    return q.answer;
  };

  const playSound = (type: "correct" | "wrong") => {
    try {
      const src =
        type === "correct" ? "/correct.mp3" : "/wrong.mp3";

      new Audio(src).play();
    } catch {}
  };

  useEffect(() => {
    if (!quiz.length) return;

    if (timeLeft <= 0) {
  handleNext();
  return;
}

    const t = setTimeout(() => {
      setTimeLeft((p) => p - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [timeLeft, quiz]);
useEffect(() => {
if (!submitted[questionIndex] || !autoAdvance) return;
  const t = setTimeout(() => {
    if (current >= quiz.length) {
      finishQuiz();
    } else {
      handleNext();
    }
  }, 1200);

  return () => clearTimeout(t);
}, [submitted[questionIndex]]);

  const handleSelect = (opt: string) => {
    if (submitted[questionIndex]) return;

    setAnswers((prev: any) => ({
      ...prev,
[questionIndex]: opt,
    }));
  };

  const handleSubmit = () => {
    if (!answers[questionIndex]) return;

    const correct = getCorrectAnswer(q);

    const isCorrect = answers[questionIndex] === correct;

    playSound(isCorrect ? "correct" : "wrong");

    const updatedSubmitted = {
      ...submitted,
      [questionIndex]: true,
    };

    setSubmitted(updatedSubmitted);
setAutoAdvance(true);
    const payload = {
      quiz,
      answers,
      submitted: updatedSubmitted,
    };

    localStorage.setItem(
      `quiz_${docId}`,
      JSON.stringify(payload)
    );

    saveQuizProgress({
      user_id: "user1",
      doc_id: docId,
      current,
      answers,
      submitted: updatedSubmitted,
      finished: false,
    });
  };

const handleNext = () => {
  if (current >= quiz.length) {
    setAutoAdvance(false);
    finishQuiz();
    return;
  }

  const next = current + 1;

  setCurrent(next);

  router.push(
    `/learning/quiz/${docId}/session?q=${next}`
  );
};

const handlePrev = () => {
  const prev = Math.max(current - 1, 1);

  setCurrent(prev);

  router.push(
    `/learning/quiz/${docId}/session?q=${prev}`
  );
};
  const calculateScore = () => {
    let s = 0;

    quiz.forEach((q, i) => {
      if (answers[i] === getCorrectAnswer(q)) {
        s++;
      }
    });

    return s;
  };

  const finishQuiz = async () => {
    const score = calculateScore();

    await saveQuizProgress({
      user_id: "user1",
      doc_id: docId,
      current,
      answers,
      submitted,
      finished: true,
      score,
    });

    localStorage.setItem(
      `quiz_result_${docId}`,
      JSON.stringify({
        score,
        total: quiz.length,
        answers,
        quiz,
      })
    );

    router.push(`/learning/quiz/${docId}/result`);
  };

  if (!q) {
    return (
      <div className="p-6 text-center">
        Loading Quiz...
      </div>
    );
  }

  const correctAnswer = getCorrectAnswer(q);

  return (
    <div className="p-6">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">

        <div className="flex justify-between mb-4">
          <p>
            Q {current} / {quiz.length}
          </p>

          <p>⏱ {timeLeft}s</p>
        </div>

        <div className="w-full bg-white/20 h-2 rounded mb-4">
          <div
            className="bg-blue-400 h-2 rounded"
            style={{
              width: `${
(current / quiz.length) * 100
              }%`,
            }}
          />
        </div>

        <h2 className="text-lg font-semibold mb-4">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt: string, i: number) => {
            let style =
              "p-3 rounded-lg w-full text-left transition";

            if (submitted[questionIndex]) {
              if (opt === correctAnswer) {
                style +=
                  " bg-green-400/30 border border-green-400";
              } else if (opt === answers[questionIndex]) {
                style +=
                  " bg-red-400/30 border border-red-400";
              }
            } else if (answers[questionIndex] === opt) {
              style +=
                " bg-white/20 border border-white/30";
            } else {
              style +=
                " hover:bg-white/10 border border-white/20";
            }

            return (
              <button
                key={i}
                className={style}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            className="btn-secondary"
          >
            Prev
          </button>

          {!submitted[questionIndex] ? (
            <button
              onClick={handleSubmit}
              disabled={!answers[questionIndex]}
              className="btn-primary disabled:opacity-50"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}