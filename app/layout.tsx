import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeProvider from "@/components/ThemeProvider";
import SettingsPanel from "@/components/SettingsPanel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body className="
        h-screen
        overflow-hidden
        bg-black
        text-white
      ">

        <ThemeProvider>

          {/* 🔥 MOBILE HEADER */}
          <div className="
            md:hidden
            flex
            items-center
            justify-between
            px-4
            py-3
            border-b
            border-white/10
            bg-black
            sticky
            top-0
            z-50
          ">

            <h1 className="font-semibold">
              RecallNova
            </h1>

            <div className="flex gap-3 text-sm">
              <a href="/chat">Chat</a>
              <a href="/upload">Upload</a>
              <a href="/learning">Learn</a>
            </div>

          </div>

          {/* 🔥 DESKTOP LAYOUT */}
          <div className="
            flex
            h-screen
            overflow-hidden
          ">

            {/* SIDEBAR */}
            <div className="
              hidden
              md:flex
              h-screen
              flex-shrink-0
            ">
              <Sidebar />
            </div>

            {/* MAIN */}
            <main className="
              flex-1
              h-screen
              overflow-hidden
            ">

              <div className="
                h-full
                overflow-hidden
              ">
                {children}
              </div>

            </main>

          </div>

          <SettingsPanel />

        </ThemeProvider>

      </body>

    </html>
  );
}