"use client";

type Props = {
  activeQuiz: any[];
  answers: { [key: number]: string };
  getCorrectAnswer: (q: any) => string;
  onBack: () => void;
};

export default function ReviewPanel({
  activeQuiz,
  answers,
  getCorrectAnswer,
  onBack,
}: Props) {
  const score = activeQuiz.reduce((acc, q, i) => {
    return acc + (answers[i] === getCorrectAnswer(q) ? 1 : 0);
  }, 0);

  return (
<div className="h-full overflow-y-auto no-scrollbar p-4 sm:p-6">  <div className="max-w-5xl mx-auto pb-20">
      {/* HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold">
          Review Answers
        </h2>
        <p className="text-sm opacity-70 mt-1">
          Score: {score} / {activeQuiz.length}
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {activeQuiz.map((q, i) => {
          const correct = getCorrectAnswer(q);
          const userAns = answers[i];
          const isCorrect = userAns === correct;

          return (
            <div
              key={i}
              className={`rounded-xl p-4 sm:p-5 border transition
                ${isCorrect
                  ? "border-green-400/40 bg-green-400/5"
                  : "border-red-400/40 bg-red-400/5"}
              `}
            >

              {/* QUESTION */}
              <p className="font-semibold text-sm sm:text-base mb-3">
                Q{i + 1}. {q.question}
              </p>

              {/* OPTIONS */}
              <div className="space-y-2 mb-3">
                {q.options.map((opt: string, idx: number) => {
                  let style =
                    "block w-full text-left px-3 py-2 rounded-lg text-sm border";

                  if (opt === correct) {
                    style += " border-green-400 bg-green-400/20";
                  } else if (opt === userAns) {
                    style += " border-red-400 bg-red-400/20";
                  } else {
                    style += " border-white/10 bg-white/5";
                  }

                  return (
                    <div key={idx} className={style}>
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* RESULT TEXT */}
              <p
                className={`text-sm font-medium ${
                  isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                {isCorrect ? "✔ Correct" : "✘ Incorrect"}
              </p>

              {/* EXPLANATION */}
              {q.explanation && (
                <div className="mt-3 bg-black/40 border border-white/10 p-3 rounded-lg text-sm">
                  <span className="font-semibold">💡 Explanation:</span>
                  <p className="mt-1 opacity-90">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BACK BUTTON */}
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"
        >
          Back
        </button>
      </div>
    </div>
    </div>
  );
}