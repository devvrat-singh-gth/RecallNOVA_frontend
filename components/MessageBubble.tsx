"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";

function MessageBubble({ msg }: any) {
  const isUser = msg.role === "user";

  return (
   <div
  className={`
    mb-4 sm:mb-4
    flex w-full animate-[fadeIn_.2s_ease]
    ${isUser ? "justify-end" : "justify-start"}
  `}
>
      <div
        className={`
max-w-[95%] break-words border
px-3 py-2.5 text-sm leading-6
shadow-sm sm:max-w-[85%] sm:px-5 sm:py-4 sm:leading-7
          ${
            isUser
              ? "rounded-2xl rounded-br-md"
              : "rounded-2xl rounded-bl-md"
          }
        `}
        style={
          isUser
            ? {
                background: "var(--primary)",
                color: "var(--bg)",
                borderColor: "transparent",
              }
            : {
                background: "var(--card)",
                color: "var(--text)",
                borderColor: "var(--border)",
              }
        }
      >
        <div
          className="
            prose prose-sm max-w-none
            break-words
            prose-p:my-2
            prose-pre:my-4
            prose-code:text-inherit
            prose-strong:text-inherit
            prose-headings:text-inherit
            prose-li:text-inherit
            prose-a:underline
            prose-pre:overflow-x-auto
            prose-pre:rounded-xl
            prose-pre:border
            prose-pre:border-[var(--border)]
            prose-pre:bg-black/10
            prose-code:rounded-md
            prose-code:bg-black/10
            prose-code:px-1
            prose-code:py-0.5
            prose-code:before:content-none
            prose-code:after:content-none
          "
        >
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default memo(MessageBubble);
