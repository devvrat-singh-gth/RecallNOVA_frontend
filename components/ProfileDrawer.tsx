"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Settings,
  LayoutDashboard,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

type ProfileDrawerProps = {
  placement?: "sidebar" | "header";
};

export default function ProfileDrawer({
  placement = "sidebar",
}: ProfileDrawerProps) {
  
  const [open, setOpen] =
  useState(false);

const [imageFailed, setImageFailed] =
  useState(false);
  const drawerRef =
    useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const navigateWithClose = (
    path: string
  ) => {
    setOpen(false);

    setTimeout(() => {
      router.push(path);
    }, 180);
  };

  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "User";

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (word) => word[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";
useEffect(() => {
  setImageFailed(false);
}, [user?.picture]);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  const handleLogout = async () => {
    setOpen(false);

    await logout();

    router.replace("/");
    router.refresh();
  };

  return (
    <div
      ref={drawerRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="
          w-full
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-white/5
          transition
        "
      >
        <div
          className="
            relative
            group
            flex
            items-center
            gap-3
          "
        >
          {/* AVATAR */}
{user?.picture && !imageFailed ? (
  <img
    src={user.picture}
    alt={displayName}
    onError={() =>
      setImageFailed(true)
    }
    className="
      h-9
      w-9
      rounded-full
      object-cover
      shrink-0
      border
      border-[var(--border)]
    "
  />
) : (
  <div
    className="
      h-9
      w-9
      rounded-full
      flex
      items-center
      justify-center
      font-semibold
      text-sm
      bg-lime-400
      text-black
      shrink-0
    "
  >
    {initials}
  </div>
)}
          {/* DESKTOP TEXT */}
<div
  className="
    hidden
    md:block
    text-left
    min-w-0
  "
>
  <div
    className="
      font-medium
      truncate
      max-w-[130px]
    "
  >
    {displayName}
  </div>

  {placement === "sidebar" && (
    <div className="text-xs opacity-60">
      View Profile
    </div>
  )}
</div>
          {/* MOBILE TOOLTIP */}

          <div
            className="
              md:hidden
              absolute
              left-full
              ml-2
              opacity-0
              group-hover:opacity-100
              pointer-events-none
              whitespace-nowrap
              px-3
              py-2
              rounded-lg
              bg-black
              text-white
              text-xs
              transition-opacity
              z-50
            "
          >
            {displayName}
          </div>
        </div>
      </button>

      {open && (
        <>
{/* DESKTOP DRAWER */}

<div
  className={`
    hidden
    md:block
    absolute

    w-60
    rounded-2xl
    border
    bg-[var(--card)]
    backdrop-blur-xl
    shadow-2xl
    overflow-hidden
    z-[999]

    ${
      placement === "header"
        ? `
          right-0
          top-full
          mt-2
        `
        : `
          left-full
          bottom-0
          ml-10
        `
    }
  `}
>
            <div className="p-4">
              <div className="flex items-center gap-3">
{user?.picture && !imageFailed ? (
  <img
    src={user.picture}
    alt={displayName}
    onError={() =>
      setImageFailed(true)
    }
    className="
      h-10
      w-10
      rounded-full
      object-cover
    "
  />
) : (

                  <div
                    className="
                      h-11
                      w-11
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-lime-400
                      text-black
                      font-bold
                    "
                  >
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <h3
                    className="
                      font-bold
                      truncate
                    "
                  >
                    {displayName}
                  </h3>

                  <p
                    className="
                      text-xs
                      opacity-60
                      truncate
                    "
                  >
                    {user?.email}
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-xs
                  opacity-50
                "
              >
                <UserCircle size={14} />

                {user?.plan
                  ? `${user.plan} plan`
                  : "Account"}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigateWithClose(
                  "/dashboard"
                )
              }
              className="
                w-full
                text-left
                flex
                items-center
                gap-3
                p-4
                hover:bg-white/5
                transition-colors
              "
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                navigateWithClose(
                  "/settings"
                )
              }
              className="
                w-full
                text-left
                flex
                items-center
                gap-3
                p-4
                hover:bg-white/5
                transition-colors
              "
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full
                text-left
                flex
                items-center
                gap-3
                p-4
                text-red-400
                hover:bg-red-500/10
                transition-colors
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* MOBILE DRAWER */}

          <div
            className="
              md:hidden
              absolute
              right-[-10px]
              top-full
              mt-2
              w-56
              rounded-2xl
              border
              bg-[var(--card)]
              backdrop-blur-xl
              shadow-2xl
              overflow-hidden
              z-[999]
            "
          >
            <div className="p-4">
              <div className="flex items-center gap-3">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={displayName}
                    className="
                      h-10
                      w-10
                      rounded-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      h-10
                      w-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-lime-400
                      text-black
                      font-bold
                    "
                  >
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <h3
                    className="
                      font-bold
                      truncate
                    "
                  >
                    {displayName}
                  </h3>

                  <p
                    className="
                      text-xs
                      opacity-60
                      truncate
                    "
                  >
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigateWithClose(
                  "/dashboard"
                )
              }
              className="
                w-full
                flex
                items-center
                gap-3
                p-4
                hover:bg-white/5
                transition
              "
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                navigateWithClose(
                  "/settings"
                )
              }
              className="
                w-full
                text-left
                flex
                items-center
                gap-3
                p-4
                hover:bg-white/5
                transition
              "
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                p-4
                text-red-400
                hover:bg-red-500/10
                transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}