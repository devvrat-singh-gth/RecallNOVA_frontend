"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Play,
  RotateCw,
  Brain,
  Sparkles,
  Clock3
} from "lucide-react";
import {
  getFlashcards,
  getDocuments,
  checkFlashcards,
} from "@/lib/api";

import Link from "next/link";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

export default function Flashcards() {
  const {
    isGuest,
  } = useAuth();

  const uploadPath =
    isGuest
      ? "/guest/upload"
      : "/upload";

const [docs, setDocs] = useState<any[]>([]);
const [docsLoading, setDocsLoading] = useState(true);
const [selectedDoc, setSelectedDoc] = useState("");

  const [cards, setCards] = useState<any[]>([]);
  const [existsMap, setExistsMap] = useState<any>({});

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // 🔥 PAGINATION
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [showPopup, setShowPopup] =
    useState(false);

  const [popupDocId, setPopupDocId] =
    useState("");

  const [customCount, setCustomCount] =
    useState(5);
    const [knownCards, setKnownCards] =
  useState<number[]>([]);

const [starredCards, setStarredCards] =
  useState<number[]>([]);
useEffect(() => {
  loadDocs();
}, []);

// 🔥 RESET INDEX WHEN PAGE CHANGES
useEffect(() => {
  setIndex(0);
  setFlipped(false);
}, [page]);

const loadDocs = async () => {
  try {
    setDocsLoading(true);

    const res = await getDocuments();
    const list = res.documents || [];

    setDocs(list);

    // 🔥 CHECK EXISTENCE
    const map: any = {};

    for (const d of list) {
      const r = await checkFlashcards(d._id);

      console.log(
        "FLASHCARD CHECK:",
        r
      );

      map[d._id] = {
        exists: r.exists,
        count: r.count || 0,
      };
    }

    setExistsMap(map);
  } catch (err) {
    console.error(
      "FLASHCARD DOCUMENT LOAD FAILED:",
      err
    );

    setDocs([]);
    setExistsMap({});
  } finally {
    setDocsLoading(false);
  }
};
const generate = async (count = 10, docId: string) => {
  if (!docId) return;

  try {
    const res = await getFlashcards({
      doc_id: docId,
      count,
    });

    setSelectedDoc(docId);
    setCards(res.flashcards || []);
    setIndex(0);
    setFlipped(false);
    setPage(0);
    await loadDocs();
  } catch (err) {
    console.error("Flashcards failed", err);
  }
};
  // 🔥 PAGINATED CARDS
  const paginated = cards.slice(
    page * pageSize,
    (page + 1) * pageSize
  );
const absoluteIndex =
  page * pageSize + index;
 return (
<div className="
  w-full
  px-3
  sm:px-5
  lg:px-4
  py-4
  sm:py-6
">
<div className="
  max-w-7xl
  w-full
  mx-auto

  rounded-3xl

  border
  border-white/10

  bg-white/[0.04]
  backdrop-blur-xl

  shadow-2xl

  overflow-hidden

  max-h-[calc(100vh-90px)]
  md:max-h-none

  overflow-y-auto
  overscroll-contain

  custom-scrollbar
">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
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
            Flashcards
          </h1>

          <p className="
            text-sm
            opacity-60
            mt-1
          ">
            Learn faster using interactive memory cards
          </p>

        </div>

        {cards.length > 0 && (

          <button
onClick={() => {
  setCards([]);
  setSelectedDoc("");
  setIndex(0);
  setPage(0);
  setFlipped(false);
}}            className="
              px-4
              py-2
              rounded-xl
              bg-red-500/15
              border
              border-red-400/20
              text-red-300
              hover:bg-red-500/25
              transition
            "
          >
            Reset
          </button>

        )}

      </div>

      {/* TABLE MODE */}

      {!cards.length ? (

<div className="p-3 sm:p-6">
{docsLoading ? (
  <div className="
    mx-auto
    flex
    min-h-[180px]
    max-w-6xl
    items-center
    justify-center
    rounded-2xl
    border
    border-white/10
    bg-white/[0.025]
  ">
    <div className="
      flex
      flex-col
      items-center
      gap-3
    ">
      <div className="
        h-8
        w-8
        animate-spin
        rounded-full
        border-4
        border-white/10
        border-t-lime-400
      " />

      <p className="
        text-sm
        font-medium
        opacity-60
      ">
        Loading flashcards...
      </p>
    </div>
  </div>
) : docs.length === 0 ? (
            <div className="
              mx-auto
              max-w-6xl
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              px-4
              py-7
              sm:px-6
              sm:py-8
              text-center
            ">
              <p className="
                text-sm
                sm:text-base
                font-semibold
                opacity-80
                leading-6
              ">
                UPLOAD DOCUMENTS IN THE UPLOAD PAGE TO START!
              </p>

              <Link
                href={uploadPath}
                className="
                  mt-4
                  inline-flex
                  min-h-10
                  w-auto
                  max-w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--primary)]
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-[var(--bg)]
                  transition
                  hover:-translate-y-0.5
                  hover:opacity-90
                  active:scale-[0.98]
                "
              >
                Go to upload
              </Link>
            </div>
                 ) : (
            <>
              {/* TABLE HEADER */}

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
              ">

                <div className="col-span-5">
                  Document
                </div>

                <div className="col-span-2 text-center">
                  Status
                </div>

                <div className="col-span-2 text-center">
                  Qty
                </div>

                <div className="col-span-3 text-center">
                  Action
                </div>

              </div>

              {/* ROWS */}

              <div className="space-y-2">

            {docs.map((d) => {

              const item =
                existsMap[d._id];

              const exists =
                item?.exists;

              const count =
                item?.count || 0;

              return (

               <div
  key={d._id}
  className="
    md:grid
    md:grid-cols-12
    md:items-center

    rounded-2xl

    border
    border-white/10

    bg-white/[0.03]

    p-3
    md:px-4
    md:py-4

    hover:bg-white/[0.05]
    transition-all
  "
>

  {/* DOCUMENT */}

  <div className="md:col-span-5">

    {/* MOBILE */}

    <div
      className="
        flex
        items-start
        gap-3

        md:hidden
      "
    >

      <div
        className="
          h-9
          w-9

          rounded-xl

          bg-blue-500/15

          flex
          items-center
          justify-center

          shrink-0
        "
      >
    <FileText size={16} />
      </div>

      <div className="flex-1 min-w-0 pt-2">

        <h3
          className="
            font-semibold
            text-sm
            truncate
          "
        >
          {d.name}
        </h3>

      </div>

      <div
        className="
          flex
          flex-col
          gap-1

          items-end

          shrink-0
        "
      >

        <span
          className={`
            px-2.5
            py-1

            rounded-full

            text-[10px]
            font-bold

            ${
              exists
                ? `
                  bg-green-500/15
                  text-green-300
                `
                : `
                  bg-gray-500/15
                  text-gray-300
                `
            }
          `}
        >
          {exists
            ? "Available"
            : "Not Generated"}
        </span>

        <span
          className="
            px-2.5
            py-1

            rounded-full

            text-[10px]
            font-bold

            bg-white/5
          "
        >
          {count} Cards
        </span>

      </div>

    </div>

    {/* DESKTOP */}

    <div
      className="
        hidden
        md:flex
        items-center

        font-medium

        truncate
        pr-4
      "
    >
      {d.name}
    </div>

  </div>

  {/* DESKTOP STATUS */}

  <div
    className="
      hidden
      md:flex
      md:col-span-2
      justify-center
    "
  >

    <span
      className={`
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
      `}
    >
      {exists
        ? "Available"
        : "Not Generated"}
    </span>

  </div>

  <div
    className="
      hidden
      md:block
      md:col-span-2

      text-center
      font-bold
      text-sm
    "
  >
    {count}
  </div>

  {/* ACTIONS */}

  <div
    className="
      md:col-span-3

      flex
      gap-2

      mt-3
      md:mt-0

      md:justify-center
      md:items-center

      md:min-h-[40px]
    "
  >

<button
  onClick={() =>
    generate(undefined, d._id)
  }
      className={`
        flex-1
        md:w-[110px]

        h-10

        rounded-xl

        text-sm
        font-bold

        transition-all

        ${
          exists
            ? `
              bg-lime-400
              text-black
              hover:scale-[1.03]
            `
            : `
              bg-blue-500
              text-white
              hover:bg-blue-600
            `
        }
      `}
    >
      {exists ? "Show" : "Generate"}
    </button>

    {exists && (

      <button
        onClick={() => {
          setPopupDocId(d._id);
          setShowPopup(true);
        }}
        className="
          flex-1
          md:w-[92px]

          h-10

          rounded-xl

          text-sm
          font-bold

          bg-purple-500
          text-white

          hover:bg-purple-600

          transition-all
        "
      >
        More
      </button>

    )}

  </div>

</div>

              );
            })}
              </div>
            </>
          )}

        </div>

      ) : (

        <div className="p-6">

          {/* TOP INFO */}

          <div className="
            flex
            items-center
            justify-between
            mb-5
          ">

            <div className="
              text-sm
              opacity-60
            ">
              Card {page * pageSize + index + 1}
of {cards.length}

 • Learned: {knownCards.length}
            </div>

            <div className="
              text-xs
              px-3
              py-1
              rounded-full
              bg-white/10
            ">
              Tap card to flip
            </div>

          </div>

          {/* CARD */}

          <div
            onClick={() =>
              setFlipped(!flipped)
            }
            className="
              min-h-[260px]
              sm:min-h-[340px]
              rounded-[32px]
              border
              border-white/10
              bg-gradient-to-br
              from-white/[0.08]
              to-white/[0.03]
              backdrop-blur-xl
              p-5 sm:p-10
              flex
              items-center
              justify-center
              text-center
              cursor-pointer
              transition-all
              duration-300
              hover:scale-[1.01]
              shadow-2xl
            "
          >

           <div className={`
  max-w-2xl
text-base sm:text-lg
  leading-relaxed
  font-medium
  transition-all

  ${
    flipped
      ? "text-lime-200"
      : "text-white"
  }
`}>

              {flipped
                ? paginated[index]?.answer
                : paginated[index]?.question}

            </div>

          </div>
<div className="
  flex
  justify-center
  gap-3
  mt-5
">

  <button
    onClick={() =>
      setKnownCards((prev) =>
prev.includes(absoluteIndex)
              ? prev
          : [...prev, absoluteIndex]
      )
    }
    className="
      px-4
      py-2
      rounded-xl
      bg-green-500
      text-black
      font-bold
    "
  >
    Known
  </button>

  <button
    onClick={() =>
      setStarredCards((prev) =>
prev.includes(absoluteIndex)
              ? prev
          : [...prev, absoluteIndex]
      )
    }
    className="
      px-4
      py-2
      rounded-xl
      bg-yellow-400
      text-black
      font-bold
    "
  >
    Star
  </button>

</div>
          {/* NAV */}

          <div className="
            flex
flex-col
sm:flex-row
gap-3
justify-between
            mt-6
          ">

            <button
              onClick={() =>
                setIndex((i) =>
                  Math.max(i - 1, 0)
                )
              }
              className="
                px-5
                py-3
                rounded-2xl
                bg-white/10
                hover:bg-white/15
                transition
              "
            >
              Prev
            </button>

            <button
              onClick={() =>
                setIndex((i) =>
                  i + 1 < paginated.length
                    ? i + 1
                    : i
                )
              }
              className="
                px-5
                py-3
                rounded-2xl
                bg-lime-400
                text-black
                font-bold
                hover:scale-105
                transition
              "
            >
              Next
            </button>

          </div>

          {/* PAGE NAV */}

          <div className="
            flex
            justify-between
            mt-5
          ">

            <button
              disabled={page === 0}
              onClick={() =>
                setPage((p) => p - 1)
              }
              className="
                px-4
                py-2
                rounded-xl
                bg-white/10
                disabled:opacity-30
              "
            >
              Prev Page
            </button>

            <button
              disabled={
                (page + 1) * pageSize >=
                cards.length
              }
              onClick={() =>
                setPage((p) => p + 1)
              }
              className="
                px-4
                py-2
                rounded-xl
                bg-white/10
                disabled:opacity-30
              "
            >
              Next Page
            </button>

          </div>

        </div>

      )}

    </div>

    {/* MORE POPUP */}

    {showPopup && (

      <div className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-4
      ">

        <div className="
          w-full
          max-w-sm
          rounded-3xl
          bg-[#111827]
          border
          border-white/10
          p-6
          shadow-2xl
        ">

          <h2 className="
            text-xl
            font-black
            mb-6
            text-center
          ">
            Generate Flashcards
          </h2>

          <div className="
            flex
            items-center
            justify-center
            gap-5
            mb-6
          ">

            <button
              disabled={customCount <= 1}
              onClick={() =>
                setCustomCount((c) =>
                  Math.max(1, c - 1)
                )
              }
              className="
                w-11
                h-11
                rounded-xl
                bg-white/10
                text-xl
                disabled:opacity-20
              "
            >
              −
            </button>

            <div className="
              text-4xl
              font-black
              w-14
              text-center
            ">
              {customCount}
            </div>

            <button
              disabled={customCount >= 15}
              onClick={() =>
                setCustomCount((c) =>
                  Math.min(15, c + 1)
                )
              }
              className="
                w-11
                h-11
                rounded-xl
                bg-white/10
                text-xl
                disabled:opacity-20
              "
            >
              +
            </button>

          </div>

          <div className="
            h-5
            flex
            items-center
            justify-center
            mb-5
          ">

            {customCount === 15 && (

              <span className="
                text-red-400
                text-xs
                uppercase
                tracking-widest
                font-bold
              ">
                Limit Reached
              </span>

            )}

          </div>

          <div className="
            flex
            gap-3
          ">

            <button
              onClick={() =>
                setShowPopup(false)
              }
              className="
                flex-1
                py-3
                rounded-xl
                bg-white/10
              "
            >
              Cancel
            </button>

            <button
              onClick={async () => {

                await generate(
                  customCount,
                  popupDocId
                );

setShowPopup(false);

setCustomCount(5);
setPopupDocId("");              }}
              className="
                flex-1
                py-3
                rounded-xl
                bg-lime-400
                text-black
                font-bold
              "
            >
              Generate
            </button>

          </div>

        </div>

      </div>

    )}

  </div>
);}