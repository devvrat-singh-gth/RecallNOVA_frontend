"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const publicRoutes = [
    "/login",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  /*
   * Login and other future public pages
   * should not receive the application shell.
   */
  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden">
            <Header />
          </div>

          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}