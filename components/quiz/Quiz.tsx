  "use client";

  import { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import { getQuiz, getDocuments, checkQuiz, getQuizProgress, saveQuizProgress } from "@/lib/api";
  import ReviewPanel from "@/components/ReviewPanel";
  export default function Quiz() {
    const router = useRouter();
    const [docs, setDocs] = useState<any[]>([]);
    const [selectedDoc, setSelectedDoc] = useState("");
    const [quiz, setQuiz] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
  const [existsMap, setExistsMap] = useState<any>({});
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
  const [progressMap, setProgressMap] = useState<any>({});
    const [timeLeft, setTimeLeft] = useState(15);
    const [finished, setFinished] = useState(false);
const [loading, setLoading] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [popupDocId, setPopupDocId] = useState("");
const [customCount, setCustomCount] = useState(5);
const [sessionQuiz, setSessionQuiz] = useState<any[]>([]);
const [sessionCount, setSessionCount] = useState(5);
const [showStartPopup, setShowStartPopup] = useState(false);
const [startDocId, setStartDocId] = useState("");
const [showReview, setShowReview] = useState(false);
    // 🔥 NORMALIZE ANSWER
   const getCorrectAnswer = (q: any) => {
  if (!q || !q.options) return "";

  // ✅ NEW: if answer is index (shuffled case)
  if (typeof q.answer === "number") {
    return q.options[q.answer];
  }

  // ✅ OLD: backend format
  const ans = String(q.answer).trim().toUpperCase();

  if (["A", "B", "C", "D"].includes(ans)) {
    return q.options[ans.charCodeAt(0) - 65];
  }

  return q.answer;
};

const playSound = (type: "correct" | "wrong") => {
  try {
    const src = type === "correct" ? "/correct.mp3" : "/wrong.mp3";
    const audio = new Audio(src);

    audio.play().catch(() => {
      console.warn("Audio play failed:", src);
    });
  } catch (e) {
    console.warn("Audio error:", e);
  }
};

  useEffect(() => {
    const load = async () => {
      const res = await getDocuments();
      const list = res.documents || [];
      setDocs(list);

      const map: any = {};
      for (const d of list) {
    const r = await checkQuiz(d._id);
    const p = await getQuizProgress(d._id);
  map[d._id] = {
  exists: r.exists,
  count: r.count, // 🔥 ADD THIS
  progress: p.progress,
};
  }
      setExistsMap(map);
    };

    load();
  }, []);

    useEffect(() => {
      const t = localStorage.getItem("quiz_timer");
      if (t) setTimeLeft(Number(t));
    }, []);
const activeQuiz = sessionQuiz.length ? sessionQuiz : quiz;
const q = activeQuiz[current];

// TIMER
useEffect(() => {
  if (!activeQuiz.length || finished) return;

  if (timeLeft === 0) {
    handleNext();
    return;
  }

  const t = setTimeout(() => {
    setTimeLeft((p) => p - 1);
  }, 1000);

  return () => clearTimeout(t);
}, [timeLeft, activeQuiz, finished]);
useEffect(() => {
  if (!submitted[current]) return;

  const t = setTimeout(() => {
    if (current === activeQuiz.length - 1) {
      setFinished(true);
    } else {
      handleNext();
    }
  }, 1200); // ⏱ 1.2s delay

  return () => clearTimeout(t);
}, [submitted, current]);
const resumeQuiz = async (docId: string, progress: any) => {
  const res = await getQuiz({
    doc_id: docId,
    force_new: false, // 🔥 important
  });

  setSelectedDoc(docId);
  setQuiz(res.quiz);

  setTimeout(() => {
    setCurrent(progress.current || 0);
    setAnswers(progress.answers || {});
    setSubmitted(progress.submitted || {});
  }, 100);
};
const shuffleArray = (arr: any[]) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const shuffleOptions = (q: any) => {
  const correct = getCorrectAnswer(q);

  const shuffled = shuffleArray(q.options);

  return {
    ...q,
    options: shuffled,
    answer: shuffled.indexOf(correct), // safer
  };
};

const startSession = (count: number) => {
  const shuffled = shuffleArray(quiz);
  const selected = shuffled.slice(0, count).map(shuffleOptions);

const payload = {
  quiz: selected,
  answers: {},
  submitted: {},
};

localStorage.setItem(`quiz_${selectedDoc}`, JSON.stringify(payload));

router.push(`/learning/quiz/${selectedDoc}/session?q=0`);
  // ✅ RESET EVERYTHING CLEANLY HERE (only here!)
  setCurrent(0);
  setAnswers({});
  setSubmitted({});
  setFinished(false);

  const t = localStorage.getItem("quiz_timer");
  setTimeLeft(t ? Number(t) : 15);
};
    // 🚀 GENERATE
const generate = async (
  docId: string,
  forceNew = false,
  customCountArg?: number
) => {
  try {
    setLoading(true); // ✅ START LOADING

const count =
  customCountArg || Number(localStorage.getItem("quiz_count") || "5");

 const res = await getQuiz({
  doc_id: docId,
  count: Number(count),
  force_new: forceNew, // 🔥 KEY FIX
});

    console.log("QUIZ RESPONSE:", res);

    // ✅ HANDLE BAD RESPONSE
    if (!res || !res.quiz || res.quiz.length === 0) {
      alert("Quiz not available. Backend returned empty.");
      setLoading(false);
      return;
    }
const payload = {
  quiz: res.quiz,
  answers: progress.answers || {},
  submitted: progress.submitted || {},
};

localStorage.setItem(`quiz_${docId}`, JSON.stringify(payload));

router.push(`/learning/quiz/${docId}/session?q=${progress.current || 0}`);
setSessionQuiz([]); // reset session
    // 🔥 refresh count after generate
const r = await checkQuiz(docId);
setExistsMap((prev: any) => ({
  ...prev,
  [docId]: {
    ...prev[docId],
    count: r.count,
    exists: r.exists,
  },
}));
    setCurrent(0);
    setAnswers({});
    setSubmitted({});
    setFinished(false);

    const t = localStorage.getItem("quiz_timer");
    setTimeLeft(t ? Number(t) : 15);

    setLoading(false); // ✅ END LOADING

  } catch (err) {
    console.error("Quiz generation failed", err);
    setLoading(false);
  }
};

// 🚫 BLOCK QUIZ RENDER UNTIL USER PICKS FROM POPUP
if (showStartPopup) {
  return (
    <>
      {/* ONLY SHOW POPUP */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white text-black p-6 rounded-xl w-80 text-center">

          <h2 className="text-lg font-bold mb-4">
            Select Questions to Attempt
          </h2>

          <div className="flex flex-col gap-2 mb-4">
            {[5, 10, 15].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setShowStartPopup(false);
const shuffled = shuffleArray(quiz);
const selected = shuffled.slice(0, num).map(shuffleOptions);

const payload = {
  quiz: res.quiz,
  answers: {},
  submitted: {},
};

localStorage.setItem(`quiz_${docId}`, JSON.stringify(payload));

router.push(`/learning/quiz/${docId}/session?q=0`);
               }}
               
                className="bg-blue-400 text-white py-2 rounded"
              >
                {num} Questions
              </button>
            ))}

            <button
              onClick={() => {
                setShowStartPopup(false);
                startSession(quiz.length); // ✅ use FULL BANK
              }}
              className="bg-green-500 text-white py-2 rounded"
            >
              Full ({quiz.length})
            </button>
          </div>

          <button
            onClick={() => setShowStartPopup(false)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>

        </div>
      </div>
    </>
  );
}
    // ❌ ERROR SAFE
    if (activeQuiz.length > 0 && (!q || !Array.isArray(q.options))) {
      return (
        <div className="p-6 text-center text-red-500">
          Failed to load quiz data
        </div>
      );
    }
const handleStartClick = async (docId: string) => {
  setLoading(true);

  const res = await getQuiz({
    doc_id: docId,
    force_new: false,
  });

  if (!res?.quiz?.length) {
    alert("No quiz available");
    setLoading(false);
    return;
  }

  // ✅ ONLY LOAD BANK — DO NOT START SESSION
  setQuiz(res.quiz);
  setSelectedDoc(docId);

  // ❌ DO NOT TOUCH current/answers/etc here

  setStartDocId(docId);
  setShowStartPopup(true); // 🚀 ONLY THIS SHOULD HAPPEN

  setLoading(false);
};
    const handleSelect = (opt: string) => {
      if (submitted[current]) return;
      setAnswers({ ...answers, [current]: opt });
    };

  const handleSubmit = () => {
  if (!answers[current]) return;

  const correctAnswer = getCorrectAnswer(q);
  const isCorrect = answers[current] === correctAnswer;

  playSound(isCorrect ? "correct" : "wrong");

  const updatedSubmitted = { ...submitted, [current]: true };

  setSubmitted(updatedSubmitted);

  saveQuizProgress({
    user_id: "user1",
    doc_id: selectedDoc,
    current,
    answers,
    submitted: updatedSubmitted,
    finished: false,
  });
};
    const handleNext = () => {
      const t = localStorage.getItem("quiz_timer");
      setTimeLeft(t ? Number(t) : 15);

      if (current + 1 >= activeQuiz.length) {
        setFinished(true);
      } else {
        setCurrent((p) => p + 1);
      }
    };

    const handlePrev = () => {
      const t = localStorage.getItem("quiz_timer");
      setTimeLeft(t ? Number(t) : 15);
      setCurrent((p) => Math.max(p - 1, 0));
    };

    const calculateScore = () => {
      let s = 0;
          activeQuiz.forEach((q, i) => {
          const correct = getCorrectAnswer(q);
        if (answers[i] === correct) s++;
      });
      return s;
    };

    // 🟢 DOCUMENT SELECT SCREEN
    if (!activeQuiz.length) {
      return (
        <div className="p-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">

            <h1 className="text-2xl font-bold mb-4">QUIZ</h1>

            {/* TABLE HEADER */}
     <div className="grid grid-cols-12 border-b pb-2 mb-2 text-sm opacity-70">
  <div className="col-span-5">DOCUMENT</div>
  <div className="col-span-2 text-center">STATUS</div>
  <div className="col-span-2 text-center">TOTAL</div> {/* ✅ NEW */}
  <div className="col-span-3 text-center">ACTION</div>
</div>

            {/* DOCUMENT LIST */}
            <div className="space-y-2 mb-4">
              {loading && (
  <div className="text-center mb-4">
    Generating Quiz...
  </div>
)}
          {docs.map((d) => {
  const item = existsMap[d._id];
const exists = item?.count > 0;
  const progress = item?.progress;
    return (
     <div
  key={d._id}
  className={`grid grid-cols-12 p-2 rounded ${
    selectedDoc === d._id ? "bg-white/20" : "hover:bg-white/10"
  }`}
>
  {/* DOCUMENT */}
  <div className="col-span-5 flex items-center">
    {d.name}
  </div>

  {/* STATUS */}
  <div className="col-span-2 text-center flex items-center justify-center text-sm">
    {exists ? "Available" : "Not Generated"}
  </div>

  {/* TOTAL QUESTIONS */}
  <div className="col-span-2 text-center flex items-center justify-center text-sm">
    {item?.count || 0}
  </div>

  {/* ACTIONS */}
  <div className="col-span-3 flex justify-center gap-2">
  
  {/* RESUME */}
  {progress && !progress.finished && (
    <button
      onClick={() => resumeQuiz(d._id, progress)}
      className="bg-yellow-400 px-2 py-1 rounded text-xs"
    >
      Resume
    </button>
  )}

  {/* START (only if exists AND no active progress) */}
  {exists && (!progress || progress.finished) && (
 <button
onClick={() => handleStartClick(d._id)}
      className="bg-green-400 px-2 py-1 rounded text-xs"
    >
      Start
    </button>
  )}

  {/* GENERATE (first time only) */}
  {!exists && (
    <button
      onClick={() => generate(d._id, true)}
      className="btn-primary text-xs"
    >
      Generate
    </button>
  )}

  {/* GENERATE MORE */}
  {exists && (
  <button
  onClick={() => {
    setPopupDocId(d._id);
    setCustomCount(5);
    setShowPopup(true);
  }}
  className="bg-blue-400 px-2 py-1 rounded text-xs"
>
  More
</button>
  )}
{showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white text-black p-6 rounded-xl w-80 text-center">

      <h2 className="text-lg font-bold mb-4">Generate More Questions</h2>

      {/* COUNTER */}
      <div className="flex items-center justify-center gap-4 mb-4">

        <button
          onClick={() => setCustomCount((c) => Math.max(1, c - 1))}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          -
        </button>

        <span className="text-xl font-semibold">{customCount}</span>

        <button
          onClick={() => setCustomCount((c) => Math.min(20, c + 1))}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      <p className="text-xs mb-4">Max 20 questions per generation</p>

      {/* ACTIONS */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowPopup(false)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            setShowPopup(false);

            await generate(popupDocId, true, customCount);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Generate
        </button>
      </div>
    </div>
  </div>
)}
</div>
      </div>
    );
  })}
            </div>

          </div>
          {showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white text-black p-6 rounded-xl w-80 text-center">

      <h2 className="text-lg font-bold mb-4">
        Generate More Questions
      </h2>

      <div className="flex items-center justify-center gap-4 mb-4">

        <button
          onClick={() => setCustomCount((c) => Math.max(1, c - 1))}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          -
        </button>

        <span className="text-xl font-semibold">
          {customCount}
        </span>

        <button
          onClick={() => setCustomCount((c) => Math.min(20, c + 1))}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          +
        </button>

      </div>

      <p className="text-xs mb-4">
        Max 20 questions per generation
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowPopup(false)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            setShowPopup(false);
            await generate(popupDocId, true, customCount);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Generate
        </button>
      </div>

    </div>
  </div>
)}
        </div>
      );
    }
// 🧠 REVIEW SCREEN (FULL EXPLANATIONS)
if (showReview) {
  return (
    <ReviewPanel
      activeQuiz={activeQuiz}
      answers={answers}
      getCorrectAnswer={getCorrectAnswer}
      onBack={() => setShowReview(false)}
    />
  );
}
    // 🏁 RESULT
  if (finished) {
  const score = calculateScore();

  return (
    <div className="p-6">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center max-w-md mx-auto">

        <h2 className="text-2xl font-bold mb-4">
          Quiz Completed 🎉
        </h2>

        <p className="text-lg mb-4">
          Score: {score} / {activeQuiz.length}
        </p>

        <div className="flex flex-col gap-3 mt-4">

          <button
  onClick={() => setShowReview(true)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
  Review Answers
</button>

          <button
            onClick={async () => {
              setQuiz([]);
              setSessionQuiz([]);
              setSelectedDoc("");
              setCurrent(0);
              setAnswers({});
              setSubmitted({});
              setFinished(false);
              setShowReview(false);

              const res = await getDocuments();
              const list = res.documents || [];

              const map: any = {};
              for (const d of list) {
                const r = await checkQuiz(d._id);
                const p = await getQuizProgress(d._id);

                map[d._id] = {
                  exists: r.exists,
                  count: r.count,
                  progress: p.progress,
                };
              }

              setExistsMap(map);
            }}
            className="btn-primary"
          >
            Restart
          </button>

        </div>
      </div>
    </div>
  );
}

    const correctAnswer = getCorrectAnswer(q);

    return (
      <div className="p-6">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between mb-4">
            <p>Q {current + 1} / {activeQuiz.length}</p>
            <p>⏱ {timeLeft}s</p>
          </div>

          {/* PROGRESS */}
          <div className="w-full bg-white/20 h-2 rounded mb-4">
            <div
              className="bg-blue-400 h-2 rounded"
              style={{
                width: `${((current + 1) / activeQuiz.length) * 100}%`,
              }}
            />
          </div>

          {/* QUESTION */}
          <h2 className="text-lg font-semibold mb-4">
            {q.question}
          </h2>

          {/* OPTIONS */}
          <div className="space-y-3">
            {q.options.map((opt: string, i: number) => {
              
              let style =
                "p-3 rounded-lg w-full text-left transition";

              if (submitted[current]) {
                if (opt === correctAnswer)
                  style += " bg-green-400/30 border border-green-400";
                else if (opt === answers[current])
                  style += " bg-red-400/30 border border-red-400";
              } else if (answers[current] === opt) {
                style += " bg-white/20 border border-white/30";
              } else {
                style += " hover:bg-white/10 border border-white/20";
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
            }
            )}
          </div>
          {/* ACTIONS */}
          <div className="flex justify-between mt-6">

            <button onClick={handlePrev} className="btn-secondary">
              Prev
            </button>

            {!submitted[current] ? (
              <button
                onClick={handleSubmit}
                disabled={!answers[current]}
                className="btn-primary disabled:opacity-50"
              >
                Submit
              </button>
            ) : current === activeQuiz.length - 1 ? (
              <button
  onClick={() => {
    const score = calculateScore();

    saveQuizProgress({
      user_id: "user1",
      doc_id: selectedDoc,
      current,
      answers,
      submitted,
      finished: true,
      score,
    });

    setFinished(true);
  }}              className="btn-primary"
              >
                Finish
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
     
      </div>
      
    );
  }