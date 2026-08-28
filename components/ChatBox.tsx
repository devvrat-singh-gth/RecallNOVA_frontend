"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  sendMessage,
  getDocuments,
  getChatSessions,
  getChat,
  deleteChat,
} from "@/lib/api";
import {
  FileText,
  Check,
  ChevronDown,
  ArrowUp
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";
import { useTheme } from "@/components/ThemeProvider";
import { Range, getTrackBackground } from "react-range";
import {
  Trash2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  useRouter,
  useParams,
} from "next/navigation";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

export default function ChatBox() {

  const router = useRouter();
  const params = useParams();

  const {
    isGuest,
  } = useAuth();

  const chatBasePath =
    isGuest
      ? "/guest/chat"
      : "/chat";
const [showDocs,setShowDocs] =
  useState(false);
const [showLoader, setShowLoader] = useState(false);

  const { theme } = useTheme();

const [messages, setMessages] =
    useState<any[]>([]);

  const [input, setInput] =
    useState("");

  const [docs, setDocs] =
    useState<any[]>([]);

  const [sessions, setSessions] =
    useState<any[]>([]);

  const [selectedDoc, setSelectedDoc] =
    useState("");
const [startPage,setStartPage] =
 useState(1);

const [endPage,setEndPage] =
 useState(1);

const [totalPages,setTotalPages] =
 useState(1);

  const [loading, setLoading] =
    useState(false);
const [chatLoading, setChatLoading] =
  useState(false);
const [chatId, setChatId] = useState("");
const touchStartX =
  useRef(0);

const touchEndX =
  useRef(0);

useEffect(() => {

    const draft = localStorage.getItem(
        `draft-${chatId || "new"}`
    );

    setInput(draft ?? "");

}, [chatId]);

useEffect(() => {

    localStorage.setItem(
        `draft-${chatId || "new"}`,
        input
    );

}, [input, chatId]);
const textareaRef =
  useRef<HTMLTextAreaElement | null>(null);
    useEffect(() => {
  const textarea = textareaRef.current;

  if (!textarea) return;

  textarea.style.height = "24px";

  textarea.style.height =
    Math.min(textarea.scrollHeight, 140) + "px";
}, [input]);
  const [showScrollbar,setShowScrollbar] =
useState(false);
const [selectingDoc,setSelectingDoc] =
useState(false);
const scrollTimeout =
useRef<NodeJS.Timeout | null>(null);
  const bottomRef =
    useRef<HTMLDivElement | null>(null);
const handleTextareaScroll = () => {

    setShowScrollbar(true);

    if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
        setShowScrollbar(false);
    },2000);

};
const popupRef =
useRef<HTMLDivElement | null>(null);
const [mobileHistoryOpen, setMobileHistoryOpen] =
  useState(false);
  const [deleteModalOpen, setDeleteModalOpen] =
  useState(false);

const [chatToDelete, setChatToDelete] =
  useState<string | null>(null);
const docBtnRef =
useRef<HTMLButtonElement | null>(null);
useEffect(() => {

  const handleClickOutside = (
    event: MouseEvent
  ) => {

    const target =
      event.target as Node;

    if (
      popupRef.current &&
      !popupRef.current.contains(target) &&
      docBtnRef.current &&
      !docBtnRef.current.contains(target)
    ) {
      setShowDocs(false);
    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

}, []);
  // 🔥 THEME COLORS

  const themeStyles = {
    light: {
      bg: "bg-gray-100 text-black",
      sidebar: "bg-white border-gray-200",
      card: "bg-white border-gray-200",
      input: "bg-white border-gray-300",
    },

    dark: {
      bg: "bg-[#06111f] text-white",
      sidebar: "bg-black/30 border-lime-400/10",
      card: "bg-white/10 border-white/10",
      input: "bg-black/40 border-lime-400/20",
    },

    mint: {
      bg: "bg-emerald-50 text-black",
      sidebar: "bg-white border-emerald-200",
      card: "bg-white border-emerald-200",
      input: "bg-white border-emerald-300",
    },

    neon: {
      bg: "bg-black text-lime-300",
      sidebar: "bg-black border-lime-400/20",
      card: "bg-lime-400/10 border-lime-400/20",
      input: "bg-black border-lime-400/30",
    },
  };
const sliderMax =
  totalPages <= 1
    ? 2
    : totalPages;
  const styles =
    themeStyles[
      theme as keyof typeof themeStyles
    ];
const lastLoadedRef = useRef("");
useEffect(() => {
  const urlChatId = params?.chatId as string;

  if (!urlChatId) return;
  if (docs.length === 0) return;

  if (lastLoadedRef.current === urlChatId)
    return;

  lastLoadedRef.current = urlChatId;

  loadChat(urlChatId);

}, [
  params?.chatId,
  docs.length
]);
const loadingChatRef = useRef(false);
  // 🔥 LOAD DATA

  useEffect(() => {

    loadSessions();

    getDocuments().then((res) => {
      setDocs(res.documents || []);
    });

  }, []);
useEffect(() => {

}, [
  selectedDoc,
  startPage,
  endPage,
  totalPages
]);
useEffect(() => {

  console.log(
    "SELECTED DOC CHANGED:",
    selectedDoc
  );

}, [selectedDoc]);
useEffect(() => {

  console.log(
    "PAGE RANGE CHANGED:",
    startPage,
    endPage
  );

}, [
  startPage,
  endPage
]);
  // 🔥 AUTO SCROLL

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // 🔥 LOAD SESSIONS

  const loadSessions = async () => {

    const res =
      await getChatSessions();

    setSessions(res.sessions || []);
  };

  // 🔥 LOAD CHAT
const loadChat = async (
  selectedChatId: string
) => {
    if (
    loadingChatRef.current
  ) return;

  loadingChatRef.current = true;
if (!selectedChatId) return;
setMessages([]);
setChatLoading(true);
setShowLoader(true);

const startTime = Date.now();
  try {

    const res =
      await getChat(selectedChatId);

    if (res.messages) {

      const formatted =
        res.messages.flatMap((m: any) => [
          {
            role: "user",
            text: m.question,
          },
          {
            role: "bot",
            text: m.response,
          },
        ]);

      setMessages(formatted);

      setChatId(selectedChatId);
      const draft = localStorage.getItem(
    `draft-${selectedChatId}`
);

setInput(draft ?? "");
if (res.selected_doc) {

  console.log(
    "FOUND DOC ID",
    res.selected_doc
  );

const doc = docs.find(
  d =>
    d._id === res.selected_doc ||
    d.id === res.selected_doc
);

  console.log(
    "MATCHED DOC",
    doc
  );
  console.log(
  "DOCS COUNT",
  docs.length
);
if (doc) {

  setSelectedDoc(
    String(res.selected_doc)
  );

  setTotalPages(
    doc.total_pages || 1
  );

  setStartPage(
    res.start_page || 1
  );

  setEndPage(
    res.end_page ||
    doc.total_pages ||
    1
  );
    console.log(
  "SETTING UI STATE",
  {
    selected_doc: res.selected_doc,
    start_page: res.start_page,
    end_page: res.end_page
  }
);
console.log(
  "TYPE OF DOC ID:",
  typeof res.selected_doc
);

console.log(
  "DOC VALUE:",
  JSON.stringify(res.selected_doc)
);
  }
}
    }

  } finally {

  const elapsed = Date.now() - startTime;

  const remaining = Math.max(
    2000 - elapsed,
    0
  );
setTimeout(() => {

  setChatLoading(false);
  setShowLoader(false);

  loadingChatRef.current = false;

}, remaining);
}
};

  // 🔥 DELETE CHAT

const handleDeleteChat = (
  e: any,
  id: string
) => {

  e.stopPropagation();

  setChatToDelete(id);

  setDeleteModalOpen(true);
};
const confirmDeleteChat = async () => {

  if (!chatToDelete) return;

  await deleteChat(chatToDelete);

  if (chatId === chatToDelete) {

    lastLoadedRef.current = "";

    setMessages([]);

    localStorage.removeItem(
      `draft-${chatId}`
    );

    setChatId("");

    setInput("");

router.push(chatBasePath);
  }

  setDeleteModalOpen(false);

  setChatToDelete(null);

  loadSessions();
};
const handleSend = async () => {

  if (!input.trim() || loading)
    return;

  const text = input.trim();

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text,
    },
  ]);

  setInput("");
  if (textareaRef.current) {
  textareaRef.current.style.height = "40px";
}
localStorage.removeItem(
    `draft-${chatId || "new"}`
);
  setLoading(true);

  try {

const res = await sendMessage(
  text,
  selectedDoc,
  chatId,
  selectedDoc ? startPage : undefined,
  selectedDoc ? endPage : undefined
);

    if (res.chat_id) {

      setChatId(res.chat_id);

      if (!chatId) {
router.push(
          `${chatBasePath}/${res.chat_id}`
        );
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text:
          res.response ||
          "No response received.",
      },
    ]);

    loadSessions();

  } catch {

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text:
          "Something went wrong.",
      },
    ]);

  } finally {

    setLoading(false);
  }
};

const newChat = () => {

  lastLoadedRef.current = "";

  setMessages([]);

  setChatId("");

  setSelectedDoc("");

  setStartPage(1);

  setEndPage(1);

  setTotalPages(1);

router.push(chatBasePath);
};
  return (

    <div className={`
      h-full
      flex
      overflow-hidden
      ${styles.bg}
    `}>

{/* DESKTOP SIDEBAR */}

<div
  className={`
    hidden
    md:flex
    w-60
    border-r
    flex-col
    p-5
    ${styles.sidebar}
  `}
>

  <button
    onClick={newChat}
    className="
      bg-lime-400
      text-black
      font-semibold
      rounded-xl
      py-3
      hover:scale-[1.02]
      transition-colors duration-200
    "
  >
    + New Chat
  </button>

  <div
    className="
      mt-6
      flex-1
      overflow-y-auto
      custom-scrollbar
      space-y-2
      pr-2
    "
  >

          {sessions.map((s) => (

  <div
  key={s.chat_id}

onClick={() => {

  if (
    s.chat_id === chatId ||
    chatLoading
  ) return;

router.push(
    `${chatBasePath}/${s.chat_id}`
  );
}}

  className={`
    group
    w-full
    flex
    items-center
    justify-between
    text-left
    p-3
    rounded-xl
    border
    cursor-pointer

    transition-colors
    duration-200

    ${
      chatId === s.chat_id
        ? `
        bg-lime-400
        text-black
        border-lime-400
      `
        : `
        ${styles.card}
        hover:bg-white/5
      `
    }
  `}
>

    <div className="
      text-sm
      font-semibold
      truncate
      flex-1
    ">
      {s.title}
    </div>

    <button
      title="Delete Chat"
      onClick={(e) =>
        handleDeleteChat(
          e,
          s.chat_id
        )
      }

      className="
        opacity-0
        group-hover:opacity-100
        transition
        ml-2
        p-1
        rounded-lg
        hover:bg-black/10
      "
    >
      <Trash2 size={16} />
    </button>

  </div>

))}

</div>
</div>
{deleteModalOpen && (

  <div
    onClick={() => {

      setDeleteModalOpen(false);

      setChatToDelete(null);

    }}
    className="
      fixed
      inset-0

      bg-black/50
      backdrop-blur-sm

      flex
      items-center
      justify-center

      z-[9999]
    "
  >

    <div
      onClick={(e) =>
        e.stopPropagation()
      }
      className={`
        w-[90%]
        max-w-sm

        rounded-2xl
        border

        p-6

        ${styles.card}
      `}
    >

      <h3
        className="
          text-lg
          font-bold
          mb-2
        "
      >
        Confirm Delete?
      </h3>

      <p
        className="
          text-sm
          opacity-70
          mb-6
        "
      >
        This chat session will be permanently removed.
      </p>

      <div
        className="
          flex
          justify-end
          gap-3
        "
      >

 <button
  onClick={() => {

    setDeleteModalOpen(false);

    setChatToDelete(null);

  }}
  className="
    px-4
    py-2

    rounded-xl

    border

    transition-all
    duration-200

    hover:bg-white/10
    hover:scale-[1.03]
    active:scale-[0.98]
  "
>
  Cancel
</button>
      <button
  onClick={confirmDeleteChat}
  className="
    px-4
    py-2

    rounded-xl

    bg-red-500
    text-white

    transition-all
    duration-200

    hover:bg-red-600
    hover:shadow-lg
    hover:shadow-red-500/25
    hover:scale-[1.03]

    active:scale-[0.98]
  "
>
  Delete
</button>
      </div>

    </div>

  </div>

)}
{/* MOBILE HISTORY DRAWER */}
<div
  onTouchStart={(e) => {
    touchStartX.current =
      e.touches[0].clientX;
  }}

  onTouchMove={(e) => {
    touchEndX.current =
      e.touches[0].clientX;
  }}

  onTouchEnd={() => {

    const delta =
      touchEndX.current -
      touchStartX.current;

    if (delta < -80) {
      setMobileHistoryOpen(false);
    }

  }}

  className={`
    md:hidden

    fixed
    top-0
    left-0

    h-full
    w-60

    z-[998]

    flex
    flex-col

    p-5

    transition-transform
    duration-300

    ${
      mobileHistoryOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }

    ${styles.sidebar}
  `}
>
  <button
    onClick={newChat}
    className="
      bg-lime-400
      text-black
      font-semibold
      rounded-xl
      py-3
    "
  >
    + New Chat
  </button>

  <div
    className="
      mt-6
      flex-1
      overflow-y-auto
      custom-scrollbar
      space-y-2
      pr-2
    "
  >
    {sessions.map((s) => (

      <div
        key={s.chat_id}
        onClick={() => {

          if (
            s.chat_id === chatId ||
            chatLoading
          ) return;

          setMobileHistoryOpen(false);
router.push(
            `${chatBasePath}/${s.chat_id}`
          );
        }}
        className={`
          group
          w-full
          flex
          items-center
          justify-between
          text-left
          p-3
          rounded-xl
          border
          cursor-pointer

          ${
            chatId === s.chat_id
              ? `
                bg-lime-400
                text-black
                border-lime-400
              `
              : `
                ${styles.card}
                hover:bg-white/5
              `
          }
        `}
      >
        <div className="
          text-sm
          font-semibold
          truncate
          flex-1
        ">
          {s.title}
        </div>
      </div>

    ))}
  </div>

</div>

{mobileHistoryOpen && (

  <div
    onClick={() =>
      setMobileHistoryOpen(false)
    }
    className="
      md:hidden

      fixed
      inset-0

      z-[997]

      bg-black/40
      backdrop-blur-sm
    "
  />

)}

      {/* MAIN */}
<div className="
  flex-1
  flex
  flex-col
  overflow-hidden
  relative
">
{/* TOP BAR */}

{selectedDoc && totalPages > 1 && (

<div
  className="
  border-b
  border-white/10

  px-6
  py-3

  flex
  flex-col
  gap-3
"
>
  {/* PAGE RANGE */}

  {selectedDoc && totalPages > 1 && (

<div className="
  w-full
">
<div className="
  flex
  items-center
  justify-between
  mb-1
">
<div className="
  relative
  flex
  items-center
  justify-between
">

  {/* MOBILE HISTORY TOGGLE */}

  <button
    onClick={() =>
      setMobileHistoryOpen(
        !mobileHistoryOpen
      )
    }
    className="
      md:hidden

      absolute
      -left-6
      top-3

      -translate-y-1/2

      w-7
      h-10

      rounded-r-lg

      flex
      items-center
      justify-center

      bg-lime-400/20
      text-lime-400

      border
      border-lime-400/20

      z-20
    "
  >
    {mobileHistoryOpen
      ? <ChevronLeft size={16}/>
      : <ChevronRight size={16}/>
    }
  </button>

  <div className="
    flex
    items-center
    gap-2
    ml-2
    pl-3
    md:pl-0
  ">

  <span
    className="
      text-xs
    text-lime-400
      uppercase
      font-bold
      tracking-wide
    "
  >
    Focus Range
  </span>
    <span className="
      text-xs
      text-lime-400
      font-medium
      opacity-90
    ">
      Pages {startPage}-{endPage}
    </span>

<span
  className="
    text-[11px]
    opacity-70
  "
>
  {endPage - startPage + 1}
  {" "}
  {(endPage - startPage + 1) === 1
    ? "page"
    : "pages"}
  {" "}
  selected • {totalPages} total
</span>
  </div>
</div>
  <button
    onClick={() => {
      setStartPage(1);
      setEndPage(totalPages);
    }}
    className="
      text-xs
      px-2
      py-1
      rounded-md
      bg-lime-400/20
      hover:bg-lime-400/30
      "
      >
    Full PDF
  </button>

</div>
<div className="
  ml-4
  md:ml-0
">

<Range
        step={1}
        min={1}
        max={sliderMax}
        values={[
          startPage,
          endPage
        ]}

        onChange={(values) => {

          setStartPage(
            values[0]
          );

          setEndPage(
            values[1]
          );

        }}

        renderTrack={({
          props,
          children
        }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "4px",
              width: "100%",
              borderRadius: "999px",
              background:
                getTrackBackground({
                  values: [
                    startPage,
                    endPage
                  ],
                  colors: [
                    "#374151",
                    "#84cc16",
                    "#374151"
                  ],
                  min: 1,
                  max: sliderMax,
                }),
            }}
          >
            {children}
          </div>

)}

renderThumb={({ props }) => {

  const {
    key,
    ...thumbProps
  } = props as any;

  return (
    <div
      key={key}
      {...thumbProps}
      className="
        h-5
        w-5
        rounded-full
        bg-lime-400
        shadow-lg
        border-2
        border-black
      "
    />
  );
}}
      />
</div>
      <div className="
        mt-1
        text-[11px]
        opacity-60
      ">

      </div>

    </div>

  )}

</div>
)}
        {/* CHAT */}
<div
  onTouchStart={(e) => {
    touchStartX.current =
      e.touches[0].clientX;
  }}

  onTouchMove={(e) => {
    touchEndX.current =
      e.touches[0].clientX;
  }}

  onTouchEnd={() => {

    const delta =
      touchEndX.current -
      touchStartX.current;

    if (delta > 80) {
      setMobileHistoryOpen(true);
    }

    if (delta < -80) {
      setMobileHistoryOpen(false);
    }

  }}

  className="
    flex-1
    overflow-y-auto
  custom-scrollbar
  px-4
  py-6
  pb-2
  md:pb-2

  relative
  isolate
">

{showLoader && (

  <div
    className="
      absolute
      inset-0

      z-[9999]

      flex
      items-center
      justify-center

      backdrop-blur-md

      bg-black/20
    "
  >

    <div className="relative z-[10000]">

      {/* OUTER RING */}
      <div
        className={`
          w-24 h-24
          md:w-32 md:h-32

          rounded-full
          border-[5px]
          border-transparent

          animate-spin

          ${
            theme === "light"
              ? "border-t-gray-600 border-r-gray-300"
              : theme === "mint"
              ? "border-t-emerald-500 border-r-emerald-300 shadow-[0_0_30px_rgba(16,185,129,.5)]"
              : theme === "neon"
              ? "border-t-lime-400 border-r-lime-300 shadow-[0_0_40px_rgba(132,204,22,.9)]"
              : "border-t-cyan-400 border-r-cyan-200 shadow-[0_0_40px_rgba(34,211,238,.8)]"
          }
        `}
      />

      {/* INNER RING */}
      <div
        className={`
          absolute
          inset-0
          m-auto

          w-14 h-14

          rounded-full
          border-[4px]
          border-transparent

          animate-[spin_1.4s_linear_infinite_reverse]

          ${
            theme === "light"
              ? "border-b-gray-600 border-l-gray-300"
              : theme === "mint"
              ? "border-b-emerald-500 border-l-emerald-300"
              : theme === "neon"
              ? "border-b-lime-400 border-l-lime-300"
              : "border-b-cyan-400 border-l-cyan-200"
          }
        `}
      />

      {/* CORE */}
      <div
        className={`
          absolute
          top-1/2
          left-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-5 h-5
          rounded-full

          ${
            theme === "light"
              ? "bg-gray-600"
              : theme === "mint"
              ? "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,.9)]"
              : theme === "neon"
              ? "bg-lime-400 shadow-[0_0_35px_rgba(132,204,22,1)]"
              : "bg-cyan-400 shadow-[0_0_35px_rgba(34,211,238,.95)]"
          }
        `}
      />

    </div>

  </div>

)}
        <div className="
  max-w-4xl
  mx-auto
">
            {messages.length === 0 && (

              <div className="
                h-[70vh]
                flex
                items-center
                justify-center
                text-center
              ">

                <div>

                  <h2 className="
                    text-3xl
                    font-bold
                    mb-3
                  ">
                    Ask your PDFs anything
                  </h2>

                </div>

              </div>

            )}
<StaggerContainer>

  {messages.map((msg, i) => (

    <StaggerItem
      key={`${msg.role}-${i}-${msg.text?.slice(0, 20)}`}
    >
      <MessageBubble msg={msg} />
    </StaggerItem>

  ))}

</StaggerContainer>

            {loading && (

              <div className={`
                rounded-2xl
                px-5
                py-4
                w-fit
                animate-pulse
                ${styles.card}
              `}>
                Thinking...
              </div>

            )}

            <div ref={bottomRef} />

          </div>

        </div>
{/* INPUT + DOC POPUP WRAPPER */}
<div
  className="
  sticky
  bottom-0

  z-40

  pb-4
  pt-3

  bg-black/10
  backdrop-blur-xl
  "
>

 <div
  className="
  relative
  max-w-[900px]
  mx-auto
  w-full
  "
>

  {showDocs && (
     <div
       ref={popupRef}
       className="
       absolute
       bottom-full
       left-0
       right-0
       mb-3
       z-50

      rounded-xl

      border
      border-white/10

      bg-black/80
      backdrop-blur-xl

      shadow-2xl

      overflow-hidden
      "
    >

      <div
        className="
        px-4
        py-3
        border-b
        border-white/10
        flex
        items-center
        justify-between
        "
      >

        <span className="font-semibold">
          Select Document
        </span>

        <button
          onClick={() => setShowDocs(false)}
        >
          <ChevronDown size={18} />
        </button>

      </div>

      <div
        className="
        max-h-[180px]

        overflow-y-auto

        custom-scrollbar

        scrollbar-thin
        scrollbar-thumb-lime-400/40
        scrollbar-track-transparent
        "
      >

        {/* ALL PDF OPTION */}

        <button
          onClick={() => {
            setSelectedDoc("");
            setShowDocs(false);
          }}
          className="
          w-full
          flex
          items-center
          justify-between
          px-4
          py-3

          hover:bg-lime-400/10

          transition-all
          duration-200
          "
        >

          <span>All Documents</span>

          {!selectedDoc && (
            <Check
              size={18}
              className="text-lime-400"
            />
          )}

        </button>

        {/* DOCUMENTS */}

        {docs.map((doc) => (

          <button
            key={doc._id}
            disabled={selectingDoc}
            onClick={() => {

              setSelectingDoc(true);

              setTimeout(() => {

                setSelectedDoc(doc._id);

                setTotalPages(
                  doc.total_pages || 1
                );

                setStartPage(1);

                setEndPage(
                  doc.total_pages || 1
                );

                setSelectingDoc(false);

                setShowDocs(false);

              }, 1200);

            }}
            className="
            w-full
            flex
            items-center
            justify-between

            px-4
            py-3

            hover:bg-lime-400/10

            transition-all
            duration-200
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                h-8
                w-8

                rounded-lg

                bg-lime-400/10

                flex
                items-center
                justify-center
                "
              >
                <FileText
                  size={16}
                  className="text-lime-400"
                />
              </div>

              <span className="truncate">
                {doc.name}
              </span>

            </div>

            {selectingDoc ? (

              <div
                className="
                h-5
                w-5

                rounded-full

                border-2
                border-lime-400
                border-t-transparent

                animate-spin
                "
              />

            ) : selectedDoc === doc._id ? (

              <div
                className="
                h-6
                w-6

                rounded-full
                bg-lime-400

                flex
                items-center
                justify-center
                "
              >
                <Check
                  size={14}
                  className="text-black"
                />
              </div>

            ) : null}

          </button>

        ))}

      </div>

    </div>

  )}

  {/* INPUT BAR */}

  <div
className="
pointer-events-auto

flex
items-end

gap-3

w-full
max-w-[900px]

mx-auto

px-4
py-2

min-h-[56px]
max-h-[220px]

rounded-[32px]

bg-black/40
backdrop-blur-3xl

border
border-white/5

shadow-[0_8px_40px_rgba(0,0,0,.45)]

transition-all
duration-200
"
  >

    {/* Document Button */}

    <button
      ref={docBtnRef}
      onClick={() => setShowDocs(!showDocs)}
      className="
      h-10
      w-10
self-end
      rounded-full

      bg-white/10
      hover:bg-white/20

      flex
      items-center
      justify-center

      shrink-0
      "
    >
      <FileText
        size={18}
        className={
          selectedDoc
            ? "text-lime-400"
            : "text-white"
        }
      />
    </button>

    {/* TEXTAREA */}

    <textarea
      ref={textareaRef}
      value={input}
      placeholder="Ask questions from your documents..."
      onScroll={handleTextareaScroll}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          !e.shiftKey
        ) {
          e.preventDefault();
          handleSend();
        }
      }}
className={`
flex-1

resize-none
bg-transparent
outline-none

text-[15px]

leading-[24px]

min-h-[24px]
max-h-[140px]

pt-[8px]
pb-[8px]

overflow-y-auto

custom-scrollbar

placeholder:text-white/45
`}
    />

    {/* SEND */}

    <button
      onClick={handleSend}
      disabled={loading}
      className="
      h-10
      w-10

      rounded-full

      bg-lime-400
      text-black

      hover:bg-lime-300

      flex
      items-center
      justify-center

      shrink-0
      "
    >
      <ArrowUp size={18} />
    </button>

  </div>

</div>
</div>
</div>
        </div>
  );
}