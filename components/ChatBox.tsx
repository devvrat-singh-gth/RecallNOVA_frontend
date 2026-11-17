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
  ArrowUp,
  X,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/StaggerContainer";
import { useTheme } from "@/components/ThemeProvider";
import { Range, getTrackBackground } from "react-range";
import { Trash2 } from "lucide-react";
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
  const { theme } = useTheme();

const [messages, setMessages] =
    useState<any[]>([]);

  const [input, setInput] =
    useState("");

  const [docs, setDocs] =
    useState<any[]>([]);
const [docsLoaded, setDocsLoaded] = useState(false);
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
  const [desktopHistoryOpen, setDesktopHistoryOpen] =
  useState(false);
  // Sidebar <-> ChatBox history drawer connection

useEffect(() => {
  const handleToggleHistory = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setDesktopHistoryOpen((prev) => !prev);
    } else {
      setMobileHistoryOpen((prev) => !prev);
    }
  };

  window.addEventListener(
    "recallnova:toggle-chat-history",
    handleToggleHistory
  );

  return () => {
    window.removeEventListener(
      "recallnova:toggle-chat-history",
      handleToggleHistory
    );
  };
}, []);

useEffect(() => {
  window.dispatchEvent(
    new CustomEvent("recallnova:chat-history-state", {
      detail: {
        open: desktopHistoryOpen,
      },
    })
  );
}, [desktopHistoryOpen]);
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
   // Theme variables are supplied by ThemeProvider.
  // All four themes use the same component styling,
  // while their CSS variables provide the actual colors.

  const themeStyles = {
    light: {
      bg: "bg-[var(--bg)] text-[var(--text)]",
      sidebar: "bg-[var(--card)] border-[var(--border)]",
      card: "bg-[var(--card)] border-[var(--border)]",
      input: "bg-[var(--card)] border-[var(--border)]",
    },
    dark: {
      bg: "bg-[var(--bg)] text-[var(--text)]",
      sidebar: "bg-[var(--card)] border-[var(--border)]",
      card: "bg-[var(--card)] border-[var(--border)]",
      input: "bg-[var(--card)] border-[var(--border)]",
    },
    mint: {
      bg: "bg-[var(--bg)] text-[var(--text)]",
      sidebar: "bg-[var(--card)] border-[var(--border)]",
      card: "bg-[var(--card)] border-[var(--border)]",
      input: "bg-[var(--card)] border-[var(--border)]",
    },
    neon: {
      bg: "bg-[var(--bg)] text-[var(--text)]",
      sidebar: "bg-[var(--card)] border-[var(--border)]",
      card: "bg-[var(--card)] border-[var(--border)]",
      input: "bg-[var(--card)] border-[var(--border)]",
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
const chatLoadRequestRef = useRef(0);

useEffect(() => {
  const urlChatId = params?.chatId as string | undefined;

  if (!urlChatId) {
    lastLoadedRef.current = "";
    chatLoadRequestRef.current += 1;
    setChatLoading(false);
    return;
  }

  if (!docsLoaded) return;

  if (lastLoadedRef.current === urlChatId) return;

  void loadChat(urlChatId);
}, [params?.chatId, docsLoaded, docs]);
  // 🔥 LOAD DATA

 useEffect(() => {
  void loadSessions();

  getDocuments()
    .then((res) => {
      setDocs(res.documents || []);
    })
    .catch((error) => {
      console.error("Failed to load documents:", error);
      setDocs([]);
    })
    .finally(() => {
      setDocsLoaded(true);
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
  try {
    const res = await getChatSessions();

    const updatedSessions = res.sessions || [];

    setSessions(updatedSessions);

    window.dispatchEvent(
      new CustomEvent("recallnova:chat-sessions-updated", {
        detail: {
          count: updatedSessions.length,
        },
      })
    );

    return updatedSessions;
  } catch (error) {
    console.error("Failed to load chat sessions:", error);

    return [];
  }
};

  // 🔥 LOAD CHAT
const loadChat = async (
  selectedChatId: string
) => {
  if (!selectedChatId) return;

  // Each new request invalidates any older request.
  const requestId = ++chatLoadRequestRef.current;

  setMessages([]);
  setChatId(selectedChatId);
  setChatLoading(true);

  // Reset the previous conversation's PDF selection.
  setSelectedDoc("");
  setStartPage(1);
  setEndPage(1);
  setTotalPages(1);

  try {
    const res = await getChat(selectedChatId);

    // Ignore stale responses from previous chat requests.
    if (requestId !== chatLoadRequestRef.current) return;

    const chatMessages = Array.isArray(res.messages)
      ? res.messages
      : [];

    const formatted = chatMessages.flatMap((m: any) => [
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
      const doc = docs.find(
        (d) =>
          d._id === res.selected_doc ||
          d.id === res.selected_doc
      );

      if (doc) {
        const pageCount = doc.total_pages || 1;

        setSelectedDoc(String(res.selected_doc));
        setTotalPages(pageCount);
        setStartPage(res.start_page || 1);
        setEndPage(res.end_page || pageCount);
      }
    }

    // Only mark the chat as loaded after successful retrieval.
    lastLoadedRef.current = selectedChatId;

  } catch (error) {
    if (requestId === chatLoadRequestRef.current) {
      console.error("Failed to load chat:", error);

      setMessages([
        {
          role: "bot",
          text: "Unable to load this conversation. Please try again.",
        },
      ]);
    }
  } finally {
    // Only the latest request can stop the loader.
    if (requestId === chatLoadRequestRef.current) {
      setChatLoading(false);
    }
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
  // Invalidate any currently running chat-load request.
  chatLoadRequestRef.current += 1;

  lastLoadedRef.current = "";

  setChatLoading(false);
  setMessages([]);
  setChatId("");
  setInput("");

  setSelectedDoc("");
  setStartPage(1);
  setEndPage(1);
  setTotalPages(1);

  router.push(chatBasePath);
};
  return (

    <div
      className={`
  relative
  flex h-full min-h-0 min-w-0
  overflow-hidden
  ${styles.bg}
`}
    >{/* DESKTOP CHAT HISTORY DRAWER */}

<div
  className={`
    absolute inset-y-0 left-0 z-[100]
    hidden md:flex
    w-[clamp(15rem,22vw,18rem)]
    flex-col
    border-r p-4
    shadow-2xl
    transition-transform duration-300 ease-in-out
    ${styles.sidebar}
    ${
      desktopHistoryOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
  `}
  style={{ borderColor: "var(--border)" }}
>
  <div className="mb-5 flex items-center justify-between">
    <div>
      <h3 className="text-sm font-bold">
        Chat history
      </h3>
      <p className="mt-1 text-xs opacity-55">
        Your previous conversations
      </p>
    </div>

    <button
      type="button"
      onClick={() => setDesktopHistoryOpen(false)}
      aria-label="Close chat history"
      className="
        flex h-9 w-9 items-center justify-center
        rounded-xl border transition
        hover:bg-[var(--primary)]/10
        active:scale-95
      "
      style={{ borderColor: "var(--border)" }}
    >
      <X size={17} />
    </button>
  </div>

  <button
    type="button"
    onClick={() => {
      newChat();
      setDesktopHistoryOpen(false);
    }}
    className="
      mb-5 flex w-full items-center justify-center
      gap-2 rounded-xl px-4 py-3
      text-sm font-semibold
      transition-all duration-200
      hover:brightness-110 active:scale-[0.98]
    "
    style={{
      background: "var(--primary)",
      color: "var(--bg)",
    }}
  >
    <span className="text-lg leading-none">+</span>
    New Chat
  </button>

  <div className="
    min-h-0 flex-1 space-y-2
    overflow-y-auto pr-1 custom-scrollbar
  ">
    {sessions.length === 0 ? (
      <div className="px-3 py-8 text-center">
        <p className="text-sm opacity-55">
          No conversations yet
        </p>
      </div>
    ) : (
      sessions.map((s) => (
        <div
          key={s.chat_id}
          onClick={() => {
            if (
              s.chat_id === chatId ||
              chatLoading
            ) return;

            setDesktopHistoryOpen(false);

            router.push(
              `${chatBasePath}/${s.chat_id}`
            );
          }}
          className={`
            group flex w-full cursor-pointer
            items-center justify-between gap-2
            rounded-xl border p-3
            transition-all duration-200
            ${
              chatId === s.chat_id
                ? "border-transparent"
                : "hover:bg-[var(--primary)]/5"
            }
          `}
          style={
            chatId === s.chat_id
              ? {
                  background: "var(--primary)",
                  color: "var(--bg)",
                }
              : {
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }
          }
        >
          <span className="
            min-w-0 flex-1 truncate
            text-sm font-medium
          ">
            {s.title}
          </span>

          <button
            type="button"
            title="Delete Chat"
            aria-label="Delete chat"
            onClick={(e) =>
              handleDeleteChat(e, s.chat_id)
            }
            className="
              shrink-0 rounded-lg p-1.5
              opacity-0 transition
              hover:bg-red-500/10 hover:text-red-500
              group-hover:opacity-100
              focus:opacity-100
            "
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))
    )}
  </div>
</div>

{/* DESKTOP DRAWER BACKDROP */}

{desktopHistoryOpen && (
  <button
    type="button"
    aria-label="Close chat history"
    onClick={() => setDesktopHistoryOpen(false)}
    className="
      absolute inset-0 z-[99]
      hidden md:block
      cursor-default bg-black/25
      backdrop-blur-[2px]
    "
  />
)}

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
    inset-y-0
    left-0
    h-[100dvh]
    w-[min(19rem,85vw)]
    z-[998]
    flex
    flex-col
    p-4

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
    onClick={() => {
  newChat();
  setMobileHistoryOpen(false);
}}
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
          bg-[var(--primary)]
          text-[var(--bg)]
          border-transparent
        `
        : `
          ${styles.card}
          hover:brightness-95
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
<div
  className="
    relative
    flex min-h-0 min-w-0
    flex-1 flex-col
    overflow-hidden
  "
>
{/* TOP BAR */}

{selectedDoc && totalPages > 1 && (
  <div
    className="
      border-b border-white/10
      px-3 sm:px-6
      py-4
    "
  >
    <div className="
      flex items-stretch gap-2 sm:gap-3
    ">

      {/* FOCUS RANGE + SLIDER AREA */}

      <div className="
        flex min-w-0 flex-1
        flex-col justify-center gap-3
      ">

        {/* FOCUS RANGE HEADER */}

        <div className="
          flex min-w-0
          items-center justify-between gap-2
        ">

          {/* FOCUS RANGE LABELS */}

          <div className="
            flex min-w-0 flex-wrap
            items-center gap-x-2 gap-y-1
          ">
            <span className="
              text-xs text-lime-400
              uppercase font-bold tracking-wide
            ">
              Focus Range
            </span>

            <span className="
              text-xs text-lime-400
              font-medium opacity-90
            ">
              Pages {startPage}-{endPage}
            </span>

            <span className="
              text-[11px] opacity-70
            ">
              {endPage - startPage + 1}
              {" "}
              {(endPage - startPage + 1) === 1
                ? "page"
                : "pages"}
              {" "}
              selected • {totalPages} total
            </span>
          </div>

          {/* FULL PDF */}

          <button
            type="button"
            onClick={() => {
              setStartPage(1);
              setEndPage(totalPages);
            }}
            className="
              shrink-0 text-xs
              px-2 py-1 rounded-md
              bg-lime-400/20
              hover:bg-lime-400/30
              transition
            "
          >
            Full PDF
          </button>

        </div>

        {/* RANGE SLIDER */}

        <div className="w-full min-w-0">

          <Range
            step={1}
            min={1}
            max={sliderMax}
            minDistance={1}
            values={[startPage, endPage]}
            onChange={(values) => {
              setStartPage(values[0]);
              setEndPage(values[1]);
            }}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  borderRadius: "999px",
                  background: getTrackBackground({
                    values: [startPage, endPage],
                    colors: [
                      "#374151",
                      "#84cc16",
                      "#374151",
                    ],
                    min: 1,
                    max: sliderMax,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => {
              const {
                key,
                ...thumbProps
              } = props as any;

              return (
                <div
                  key={key}
                  {...thumbProps}
                  style={{
                    ...thumbProps.style,
                    marginLeft: index === 0 ? -5 : 5,
                  }}
                  className="
                    h-5 w-5
                    rounded-full
                    bg-lime-400
                    shadow-lg
                    border-2 border-black
                    ring-2 ring-lime-400/20
                    cursor-grab
                    active:cursor-grabbing
                  "
                />
              );
            }}
          />

        </div>

      </div>

    </div>
  </div>
)}

{/* CHAT */}

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
    min-h-0 flex-1
    overflow-y-auto
    custom-scrollbar
  px-4
  py-6
  pb-2
  md:pb-2

  relative
  isolate
">

{chatLoading && (

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
                <div
          className="
            mx-auto w-full
            max-w-[1100px]
            px-1 sm:px-2
          "
        >
            {messages.length === 0 && (

                            <div
                className="
                  flex min-h-[55vh] w-full
                  items-center justify-center
                  px-3 py-12 text-center
                  sm:min-h-[60vh]
                "
              >

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
    sticky bottom-0 z-40
    border-t px-3 pb-3 pt-3
    backdrop-blur-xl
    sm:px-5 sm:pb-5
  "
  style={{
    background: "var(--bg)",
    borderColor: "var(--border)",
  }}
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
      backdrop-blur-xl

      shadow-2xl

      overflow-hidden
      "
             style={{
         background: "var(--card)",
         borderColor: "var(--border)",
         color: "var(--text)",
       }}
    >

      <div
        className="
        px-4
        py-3
        border-b
        flex
        items-center
        justify-between
        "
              style={{ borderColor: "var(--border)" }}  
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

   {/* INPUT BAR */}

  <div
    className="
      flex w-full min-w-0 items-end gap-2
      rounded-2xl border p-2
      shadow-lg
      transition-all duration-200
      focus-within:ring-2
      focus-within:ring-[var(--primary)]/20
    "
    style={{
      background: "var(--card)",
      borderColor: "var(--border)",
      color: "var(--text)",
    }}
  >

      {/* DOCUMENT BUTTON */}

    <button
      ref={docBtnRef}
      type="button"
      onClick={() => setShowDocs((prev) => !prev)}
      aria-label="Select document"
      aria-expanded={showDocs}
      className="
        flex h-10 w-10 shrink-0 items-center
        justify-center rounded-xl
        transition-all duration-200
        hover:bg-[var(--primary)]/10
        active:scale-95
      "
      style={{ color: "var(--primary)" }}
    >
      <FileText size={19} />
    </button>

       {/* TEXTAREA */}

    <textarea
      ref={textareaRef}
      value={input}
      placeholder="Ask questions from your documents..."
      rows={1}
      onScroll={handleTextareaScroll}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
      className="
        min-h-[40px] max-h-[140px]
        min-w-0 flex-1 resize-none
        bg-transparent px-1 py-2
        text-sm leading-6
        text-[var(--text)]
        outline-none
        placeholder:opacity-45
        overflow-y-auto custom-scrollbar
      "
    />

    {/* SEND */}

    <button
      onClick={handleSend}
      disabled={loading}
      className="
  flex h-10 w-10 shrink-0 items-center
  justify-center rounded-xl
  transition-all duration-200
  hover:brightness-95
  active:scale-95
  disabled:cursor-not-allowed
  disabled:opacity-50
"
style={{
  background: "var(--primary)",
  color: "var(--bg)",
}}
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