"use client";
import {
  MessageSquare,
  Upload,
  Brain,
  LayoutDashboard,
  Network
} from "lucide-react";
import FadeUp from "./ui/FadeUp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDrawer from "./ProfileDrawer";

export default function Sidebar() {
  const path = usePathname();
const nav = [
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Upload",
    href: "/upload",
    icon: Upload,
  },
  {
    name: "Learning",
    href: "/learning",
    icon: Brain,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Doc Atlas",
    href: "/doc-atlas",
    icon: Network,
  },
];
return (
  <div
    className="
      w-56
      h-full

      border-r

      flex
      flex-col

      p-4
    "
    style={{
      background: "var(--card)",
      borderColor: "var(--border)",
    }}
  >

    {/* LOGO */}

<Link
  href="/"
  className="
    block

    mb-8
    p-4

    rounded-2xl

    border
    border-white/5

    hover:border-lime-400/20
    hover:bg-white/5

    transition-all
    duration-300
  "
>
      <div className="font-bold text-xl">
        RecallNova
      </div>

      <div className="text-xs opacity-60">
        AI Learning Workspace
      </div>
    </Link>

    {/* NAV */}

    <div className="flex-1">

      {nav.map((item) => (

<Link
  key={item.name}
  href={item.href}
  className={`
    group

    flex
    items-center
    gap-3

    px-4
    py-3

    rounded-xl

    font-medium

    transition-all
    duration-300

    hover:translate-x-1
    hover:scale-[1.02]

    ${
      path.startsWith(item.href)
        ? ""
        : "hover:bg-white/5"
    }
  `}
  style={
    path.startsWith(item.href)
      ? {
          background: "var(--primary)",
          color: "var(--bg)",
          boxShadow:
            "0 0 20px rgba(132,204,22,.25)"
        }
      : {}
  }
>
  <item.icon
    size={18}
    className="
      transition-transform
      duration-300
      group-hover:scale-110
    "
  />

  <span>
    {item.name}
  </span>
</Link>
      ))}

    </div>

    {/* PROFILE */}

    <div
      className="
        border-t
        pt-3
        mt-3
      "
    >
      <FadeUp> 
        
      <ProfileDrawer />
      </FadeUp>
    </div>

  </div>
);
}