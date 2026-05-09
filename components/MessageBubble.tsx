"use client";

import React, { memo } from "react";

import ReactMarkdown from "react-markdown";

import { useTheme } from "@/components/ThemeProvider";

function MessageBubble({
  msg,
}: any) {

  const { theme } = useTheme();

  const isUser =
    msg.role === "user";

  // 🔥 THEME AWARE BOT STYLES

  const botStyles = {
    light: `
      bg-white
      border-gray-200
      text-gray-800
      shadow-md
    `,

    dark: `
      bg-white/10
      border-white/10
      text-white
      backdrop-blur-xl
    `,

    mint: `
      bg-emerald-100
      border-emerald-200
      text-emerald-950
    `,

    neon: `
      bg-lime-400/10
      border-lime-400/20
      text-lime-300
      backdrop-blur-xl
    `,
  };

  return (

    <div
      className={`
        flex
        animate-[fadeIn_.2s_ease]
        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >

      <div
        className={`
          max-w-[92%]
          sm:max-w-3xl

          px-5
          py-4

          rounded-3xl

          whitespace-pre-wrap
          break-words

          shadow-lg
          border

          text-sm
          sm:text-[15px]

          leading-7

          transition-all
          duration-200

          ${
            isUser
              ? `
                bg-lime-400
                text-black
                border-lime-300
                rounded-br-md
                shadow-lime-400/20
              `
              : `
                rounded-bl-md
                ${
                  botStyles[
                    theme as keyof typeof botStyles
                  ]
                }
              `
          }
        `}
      >

        <div
          className="
            prose
            prose-sm
            sm:prose-base
            max-w-none

            prose-p:my-2
            prose-pre:my-4
            prose-code:text-inherit
            prose-strong:text-inherit
            prose-headings:text-inherit
            prose-li:text-inherit

            prose-pre:rounded-2xl
            prose-pre:border
            prose-pre:border-white/10
            prose-pre:bg-black/50

            prose-code:bg-black/10
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:rounded-md
            prose-code:before:content-none
            prose-code:after:content-none
          "
        >

          <ReactMarkdown>

            {msg.text}

          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
}

// 🔥 PREVENT UNNECESSARY RERENDERS

export default memo(MessageBubble);