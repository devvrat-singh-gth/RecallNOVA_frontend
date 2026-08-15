import "@/styles/globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

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