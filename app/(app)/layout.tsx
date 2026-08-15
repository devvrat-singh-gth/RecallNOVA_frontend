import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] w-full overflow-hidden">
      <div className="flex h-full min-h-0 w-full">

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex shrink-0">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">

          {/* Mobile Header */}
          <div className="md:hidden shrink-0">
            <Header />
          </div>

          {/* Page Content */}
          <main
            className="
              min-h-0
              min-w-0
              flex-1
              overflow-hidden
            "
          >
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}