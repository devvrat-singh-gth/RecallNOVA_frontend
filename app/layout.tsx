import "@/styles/globals.css";
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const metadata: Metadata = {
  title: {
    default: "RecallNova — AI-powered document learning",
    template: "%s | RecallNova",
  },
  description:
    "Turn your study documents into an interactive learning workspace. Ask questions about your PDFs, create flashcards, practise with quizzes, and connect ideas through Doc Atlas.",
  applicationName: "RecallNova",
  keywords: [
    "AI document learning",
    "PDF chat",
    "AI flashcards",
    "study quizzes",
    "document knowledge graph",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    throw new Error(
      "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured"
    );
  }

  return (
    <html lang="en">
      <body className="h-[100dvh] overflow-hidden">
        <ThemeProvider>
          <GoogleOAuthProvider
            clientId={googleClientId}
          >
            <AuthProvider>
              {children}
            </AuthProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}