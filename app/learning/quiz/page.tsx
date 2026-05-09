"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getDocuments,
  checkQuiz,
  getQuiz,
  getQuizProgress,
} from "@/lib/api";

export default function QuizPage() {
  const router = useRouter();

  const [docs, setDocs] = useState<any[]>([]);
  const [existsMap, setExistsMap] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupDocId, setPopupDocId] = useState("");

  const [showStartPopup, setShowStartPopup] = useState(false);
  const [startDocId, setStartDocId] = useState("");

  const [customCount, setCustomCount] = useState(5);

  const [quizBank, setQuizBank] = useState<any[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const res = await getDocuments();

    const list = res.documents || [];

    setDocs(list);

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
  };

  const shuffleArray = (arr: any[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

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

  const shuffleOptions = (q: any) => {
    const correct = getCorrectAnswer(q);

    const shuffled = shuffleArray(q.options);

    return {
      ...q,
      options: shuffled,
      answer: shuffled.indexOf(correct),
    };
  };

  const startSession = async (docId: string, count: number) => {
    const shuffled = shuffleArray(quizBank);

    const selected = shuffled
      .slice(0, count)
      .map(shuffleOptions);

    localStorage.setItem(
      `quiz_${docId}`,
      JSON.stringify({
        quiz: selected,
        answers: {},
        submitted: {},
        current: 1,
      })
    );

router.push(`/learning/quiz/${docId}/session?q=1`);
  };

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

    setQuizBank(res.quiz);

    setStartDocId(docId);

    setShowStartPopup(true);

    setLoading(false);
  };

  const resumeQuiz = async (docId: string, progress: any) => {
    const res = await getQuiz({
      doc_id: docId,
      force_new: false,
    });

    localStorage.setItem(
      `quiz_${docId}`,
      JSON.stringify({
        quiz: res.quiz,
        answers: progress.answers || {},
        submitted: progress.submitted || {},
        current: progress.current || 1,
      })
    );

router.push(
  `/learning/quiz/${docId}/session?q=${
    progress.current || 1
  }`
);  };

  const generate = async (
    docId: string,
    forceNew = false,
    customCountArg?: number
  ) => {
    try {
      setLoading(true);

      const count =
        customCountArg ||
        Number(localStorage.getItem("quiz_count") || "5");

      await getQuiz({
        doc_id: docId,
        count,
        force_new: forceNew,
      });

      await loadDocuments();

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
<div className="
  w-full
  max-w-6xl
  mx-auto
  mt-10
  px-3
  sm:px-5
  lg:px-0
  rounded-3xl
  border
  border-white/10
  bg-white/[0.04]
  backdrop-blur-xl
  shadow-2xl
  overflow-hidden
">
       <div className="
  flex
  flex-col
  sm:flex-row
  sm:items-center
  sm:justify-between
  gap-3
  px-6
  py-5
  border-b
  border-white/10
">

  <div>

    <h1 className="
      text-3xl
      font-black
      tracking-tight
    ">
      Quiz
    </h1>

    <p className="
      text-sm
      opacity-60
      mt-1
    ">
      Practice smarter using adaptive quiz sessions
    </p>

  </div>

</div>

<div className="p-3 sm:p-6">
 <div className="
  hidden
  md:grid
  md:grid-cols-12
  px-4
  pb-3
  mb-3
  text-xs
  uppercase
  tracking-wider
  opacity-50
  border-b
  border-white/10
">          <div className="col-span-5">DOCUMENT</div>
          <div className="col-span-2 text-center">STATUS</div>
          <div className="col-span-2 text-center">TOTAL</div>
          <div className="col-span-3 text-center">ACTION</div>
        </div>

        {loading && (
          <div className="text-center mb-4">
            Loading...
          </div>
        )}

<div className="
  space-y-3
  mt-4
">
          {docs.map((d) => {

            const item = existsMap[d._id];

            const exists = item?.count > 0;

            const progress = item?.progress;

            return (
              <div
                key={d._id}
className="
  flex
  flex-col
  md:grid
  md:grid-cols-12
  items-center
  px-4
  py-4
  rounded-2xl
  border
  border-white/5
  bg-white/[0.025]
  hover:bg-white/[0.05]
  transition-all
  duration-200
"              >

<div className="
  col-span-5
  flex
  items-center
  break-words
  pr-2
">                  {d.name}
                </div>

              <div className="
  col-span-2
  flex
  justify-center
">

  <span className={`
    px-3
    py-1
    rounded-full
    text-xs
    font-bold
    border

    ${
      exists
        ? `
          bg-green-500/10
          text-green-300
          border-green-400/20
        `
        : `
          bg-gray-500/10
          text-gray-300
          border-gray-400/20
        `
    }
  `}>

    {exists
      ? "Available"
      : "Not Generated"}

  </span>

</div>

<div className="
  col-span-2
  text-center
  font-bold
  text-sm
">                  {item?.count || 0}
                </div>

<div className="
  col-span-3
  flex
  flex-wrap
  justify-start
  md:justify-center
  gap-2
  mt-3
  md:mt-0
">
                  {progress && !progress.finished && (
                    <button
                      onClick={() =>
                        resumeQuiz(d._id, progress)
                      }
className="
  px-4
  py-2
  rounded-xl
  text-xs
  font-bold
  bg-yellow-400
  text-black
  hover:scale-105
  transition
"                    >
                      Resume
                    </button>
                  )}

                  {exists &&
                    (!progress || progress.finished) && (
                      <button
                        onClick={() =>
                          handleStartClick(d._id)
                        }
className="
  px-4
  py-2
  rounded-xl
  text-xs
  font-bold
  bg-green-500
  text-black
  hover:scale-105
  transition
"                      >
                        Start
                      </button>
                    )}

                  {!exists && (
                    <button
                      onClick={() =>
                        generate(d._id, true)
                      }
className="
  px-4
  py-2
  rounded-xl
  text-xs
  font-bold
  bg-blue-500
  text-white
  hover:bg-blue-600
  transition
"                    >
                      Generate
                    </button>
                  )}

                  {exists && (
                    <button
                      onClick={() => {
                        setPopupDocId(d._id);
                        setShowPopup(true);
                      }}
className="
  px-4
  py-2
  rounded-xl
  text-xs
  font-bold
  bg-purple-500
  text-white
  hover:bg-purple-600
  transition
"                    >
                      More
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* START POPUP */}

      {showStartPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white text-black p-6 rounded-xl w-80">

            <h2 className="text-lg font-bold mb-4">
              Select Questions
            </h2>

            <div className="flex flex-col gap-2">

             {[5, 10, 15].map((num) => (
  <button
    key={num}
    disabled={!quizBank.length}
    onClick={() => {
      setShowStartPopup(false);

      startSession(startDocId, num);
    }}
    className="
      bg-blue-500
      text-white
      py-2
      rounded
      disabled:opacity-40
    "
  >
    {num} Questions
  </button>
))}

             <button
  disabled={!quizBank.length}
  onClick={() => {
    setShowStartPopup(false);

    startSession(
      startDocId,
      quizBank.length
    );
  }}
  className="
    bg-green-500
    text-white
    py-2
    rounded
    disabled:opacity-40
  "
>
                Full ({quizBank.length})
              </button>

            </div>

          </div>
        </div>
      )}

      {/* GENERATE MORE POPUP */}
{showPopup && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
    <div className={`bg-white text-black p-6 rounded-2xl w-[310px] shadow-2xl transition-all ${customCount === 10 ? 'ring-1 ring-red-100' : ''}`}>
      
      <h2 className="text-lg font-bold mb-5 text-center tracking-tight">
        Generate Questions
      </h2>

      <div className="flex items-center justify-center gap-5 mb-5">
        <button
          disabled={customCount <= 1}
          onClick={() => setCustomCount((c) => Math.max(1, c - 1))}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-20 disabled:grayscale w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-all active:scale-90"
        >
          −
        </button>

        <span className={`text-3xl font-black w-8 text-center tabular-nums transition-transform ${customCount === 10 ? 'text-red-500 scale-110' : 'text-blue-600'}`}>
          {customCount}
        </span>

        <button
          disabled={customCount >= 10}
          onClick={() => setCustomCount((c) => Math.min(10, c + 1))}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-20 disabled:grayscale w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-all active:scale-90"
        >
          +
        </button>
      </div>

      {/* Warning Area - Scraped height + Subtle Animation */}
      <div className="h-4 flex items-center justify-center mb-3">
        {customCount === 10 && (
          <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider animate-bounce">
            Limit Reached
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowPopup(false)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95"
        >
          Cancel
        </button>

        <button
          onClick={async (e) => {
            const btn = e.currentTarget;
            btn.innerText = "Working...";
            btn.style.opacity = "0.7";
            await generate(popupDocId, true, customCount);
            setShowPopup(false);
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold text-sm transition-all shadow-md shadow-blue-100 active:scale-95"
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