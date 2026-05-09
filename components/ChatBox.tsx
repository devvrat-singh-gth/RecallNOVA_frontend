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

import MessageBubble from "./MessageBubble";

import { useTheme } from "@/components/ThemeProvider";

import {
  Trash2,
} from "lucide-react";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function ChatBox() {

  const router = useRouter();
const params = useParams();

// 🔥 AUTO LOAD CHAT FROM URL

useEffect(() => {

  const urlChatId =
    params?.chatId as string;

  if (
    urlChatId &&
    urlChatId !== chatId
  ) {

    loadChat(urlChatId);
  }

}, [params?.chatId]);
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

  const [focusMode, setFocusMode] =
    useState("balanced");

  const [loading, setLoading] =
    useState(false);
const [chatLoading, setChatLoading] =
  useState(false);
  const [chatId, setChatId] =
    useState("");

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

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

  const styles =
    themeStyles[
      theme as keyof typeof themeStyles
    ];

  // 🔥 LOAD DATA

  useEffect(() => {

    loadSessions();

    getDocuments().then((res) => {
      setDocs(res.documents || []);
    });

  }, []);

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
    selectedChatId === chatId ||
    chatLoading
  ) return;

  setChatLoading(true);

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
    }

  } finally {

    setChatLoading(false);
  }
};
  // 🔥 DELETE CHAT

  const handleDeleteChat = async (
    e: any,
    id: string
  ) => {

    e.stopPropagation();

    await deleteChat(id);

    if (chatId === id) {

      setMessages([]);

      setChatId("");

      router.push("/chat");
    }
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

  setLoading(true);

  try {

    const res = await sendMessage(
      text,
      selectedDoc,
      chatId,
      focusMode
    );

    if (res.chat_id) {

      setChatId(res.chat_id);

      if (!chatId) {

        router.replace(
          `/chat/${res.chat_id}`
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

    setMessages([]);

    setChatId("");

    router.replace("/chat");
  };

  return (

    <div className={`
      h-full
      flex
      overflow-hidden
      ${styles.bg}
    `}>

      {/* SIDEBAR */}

      <div className={`
        hidden
        md:flex
        w-80
        border-r
        flex-col
        p-5
        ${styles.sidebar}
      `}>

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

        {/* HISTORY */}

      <div className="
  mt-6
  flex-1
  overflow-y-auto
  custom-scrollbar
  space-y-2
  pr-2
">

          {sessions.map((s) => (

  <div
  key={s.chat_id}

  onClick={async () => {

    if (s.chat_id === chatId)
      return;

    router.push(
      `/chat/${s.chat_id}`
    );

    await loadChat(s.chat_id);
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

      {/* MAIN */}

      <div className="
        flex-1
        flex
        flex-col
        overflow-hidden
      ">

        {/* TOP BAR */}

        <div className={`
          border-b
          p-4
          flex
          items-center
          gap-4
          flex-wrap
          ${styles.sidebar}
        `}>

          {/* DOC SELECT */}

          <select
            className={`
              rounded-xl
              px-4
              py-3
              outline-none
              min-w-[260px]
              ${styles.input}
            `}
            value={selectedDoc}
            onChange={(e) =>
              setSelectedDoc(
                e.target.value
              )
            }
          >

            <option value="">
              All Documents
            </option>

            {docs.map((d) => (

              <option
                key={d._id}
                value={d._id}
              >
                {d.name}
              </option>

            ))}

          </select>

          {/* SLIDER */}

          <div className="
            flex
            items-center
            gap-3
            flex-1
            min-w-[240px]
          ">

            <span className="
              text-sm
              opacity-70
            ">
              PDF Focus
            </span>

            <input
              type="range"
              min={0}
              max={3}
              step={1}

              value={
                focusMode === "start"
                  ? 0
                  : focusMode === "middle"
                  ? 1
                  : focusMode === "end"
                  ? 2
                  : 3
              }

              onChange={(e) => {

                const v =
                  Number(e.target.value);

                if (v === 0)
                  setFocusMode("start");

                else if (v === 1)
                  setFocusMode("middle");

                else if (v === 2)
                  setFocusMode("end");

                else
                  setFocusMode(
                    "balanced"
                  );
              }}

              className="flex-1"
            />

            <span className="
              text-sm
              capitalize
              opacity-70
              min-w-[70px]
            ">
              {focusMode}
            </span>

          </div>

        </div>

        {/* CHAT */}

        <div className="
  flex-1
  overflow-y-auto
  custom-scrollbar
  px-4
  py-6
">

        <div className="
  max-w-4xl
  mx-auto
  space-y-5
  relative
">
  {chatLoading && (

  <div className="
    absolute
    inset-0
    z-20
    flex
    items-center
    justify-center
    backdrop-blur-sm
    bg-black/10
    rounded-3xl
  ">

    <div className={`
      px-5
      py-3
      rounded-2xl
      text-sm
      animate-pulse
      ${styles.card}
    `}>
      Loading chat...
    </div>

  </div>

)}

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

          {messages.map((msg, i) => (

  <div
    key={`${msg.role}-${i}-${msg.text?.slice(0, 20)}`}
    className="
      animate-[fadeIn_.18s_ease]
    "
  >
    <MessageBubble msg={msg} />
  </div>

))}

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

        {/* INPUT */}

        <div className={`
          border-t
          p-4
          ${styles.sidebar}
        `}>

          <div className="
            max-w-4xl
            mx-auto
            flex
            gap-3
          ">

            <textarea
              value={input}
              rows={1}

              placeholder="
Ask questions from your documents...
              "

              onChange={(e) =>
                setInput(e.target.value)
              }

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
                rounded-2xl
                p-4
                outline-none
                min-h-[58px]
                max-h-40
                border
                ${styles.input}
              `}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="
                h-[58px]
                px-6
                rounded-2xl
                bg-lime-400
                text-black
                font-semibold
              "
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}