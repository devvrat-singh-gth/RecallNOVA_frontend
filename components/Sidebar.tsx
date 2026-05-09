"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const nav = [
    { name: "Chat", href: "/chat" },
    { name: "Upload", href: "/upload" },
    { name: "Learning", href: "/learning" },
  ];

  return (
    <div className="w-64 bg-white dark:bg-black border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">RecallNova</h1>

      <div className="space-y-2">
        {nav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block p-3 rounded transition ${
              path.startsWith(item.href)
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}