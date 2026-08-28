"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  BASE_URL,
  TOKEN_KEY,
} from "@/lib/apiClient";

import {
  getUsageWarnings,
} from "@/lib/api";

type User = {
  id: string;
  email: string;
  name?: string | null;
  picture?: string | null;
  plan: string;
  timezone: string;
};

type UsageWarning = {
  warning: boolean;
  remaining_daily: number;
  remaining_monthly: number;
};

type UsageWarnings = {
  messages: UsageWarning;
  flashcards: UsageWarning;
  quizzes: UsageWarning;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;

  isAuthenticated: boolean;
  isGuest: boolean;
  isRegisteredUser: boolean;

  usageWarnings: UsageWarnings | null;

  setAuthenticatedUser: (
    user: User,
    token?: string | null
  ) => void;

  logout: () => Promise<void>;

  refreshSession: () => Promise<
    User | null
  >;

  refreshUsageWarnings: () => Promise<void>;
};

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

const GUEST_ID_KEY =
  "recallnova_guest_id";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    usageWarnings,
    setUsageWarnings,
  ] =
    useState<
      UsageWarnings | null
    >(null);

  const refreshPromiseRef =
    useRef<
      Promise<User | null> | null
    >(null);

  const clearLocalAuth =
  useCallback(() => {
    if (
      typeof window !==
      "undefined"
    ) {
      // Clear only the active authentication token.
      // Keep the guest ID so the same browser can
      // reconnect to its existing guest workspace.
      window.localStorage.removeItem(
        TOKEN_KEY
      );
    }

    setUser(null);
    setUsageWarnings(null);
  }, []);

  const refreshUsageWarnings =
    useCallback(
      async () => {
        try {
          const data =
            await getUsageWarnings();

          setUsageWarnings(
            data
          );
        } catch (error) {
          console.error(
            "USAGE WARNING LOAD FAILED:",
            error
          );

          setUsageWarnings(
            null
          );
        }
      },
      []
    );

  const refreshSession =
    useCallback(
      async (): Promise<
        User | null
      > => {
        if (
          refreshPromiseRef.current
        ) {
          return refreshPromiseRef.current;
        }

        const refreshPromise =
          (async () => {
            try {
              const response =
                await fetch(
                  `${BASE_URL}/auth/refresh`,
                  {
                    method: "POST",
                    credentials:
                      "include",
                    cache: "no-store",
                  }
                );

              if (!response.ok) {
                clearLocalAuth();
                return null;
              }

              const data =
                await response.json();

              if (
                !data?.access_token ||
                !data?.user
              ) {
                clearLocalAuth();
                return null;
              }

              window.localStorage.setItem(
                TOKEN_KEY,
                data.access_token
              );

              setUser(
                data.user
              );

              return data.user as User;
            } catch (error) {
              console.error(
                "AUTH REFRESH ERROR:",
                error
              );

              clearLocalAuth();

              return null;
            } finally {
              refreshPromiseRef.current =
                null;
            }
          })();

        refreshPromiseRef.current =
          refreshPromise;

        return refreshPromise;
      },
      [clearLocalAuth]
    );

  useEffect(() => {
    let mounted = true;

    const initializeAuth =
      async () => {
        try {
          const token =
            window.localStorage.getItem(
              TOKEN_KEY
            );

          /*
           * Try existing access token first.
           */
          if (token) {
            try {
              const response =
                await fetch(
                  `${BASE_URL}/auth/me`,
                  {
                    method: "GET",
                    credentials:
                      "include",
                    cache: "no-store",
                    headers: {
                      Authorization:
                        `Bearer ${token}`,
                    },
                  }
                );

              if (response.ok) {
                const data =
                  await response.json();

                if (
                  mounted &&
                  data?.user
                ) {
                  setUser(
                    data.user
                  );

                  /*
                   * Make sure an existing guest
                   * identity is preserved locally.
                   */
                  if (
                    data.user?.plan ===
                      "guest" &&
                    data.user?.id
                  ) {
                    window.localStorage.setItem(
                      GUEST_ID_KEY,
                      data.user.id
                    );
                  }
                }

                return;
              }
            } catch (error) {
              console.error(
                "AUTH ME ERROR:",
                error
              );
            }
          }

          /*
           * Missing/expired access token.
           * Try persistent refresh session.
           *
           * Registered users use their
           * refresh cookie here.
           */
          const refreshedUser =
            await refreshSession();

          if (
            mounted &&
            refreshedUser
          ) {
            setUser(
              refreshedUser
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [refreshSession]);

  /*
   * Keep guest identity synchronized
   * whenever AuthProvider receives a guest.
   *
   * This is deliberately independent of
   * registered-user refresh sessions.
   */
  useEffect(() => {
    if (
      !user ||
      user.plan !== "guest" ||
      !user.id ||
      typeof window ===
        "undefined"
    ) {
      return;
    }

    window.localStorage.setItem(
      GUEST_ID_KEY,
      user.id
    );
  }, [user]);

  useEffect(() => {
    if (
      loading ||
      !user
    ) {
      setUsageWarnings(
        null
      );

      return;
    }

    refreshUsageWarnings();

    const interval =
      window.setInterval(
        () => {
          refreshUsageWarnings();
        },
        60 * 1000
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    loading,
    user,
    refreshUsageWarnings,
  ]);

  const setAuthenticatedUser =
    useCallback(
      (
        nextUser: User,
        nextToken?: string | null
      ) => {
        setUser(nextUser);

        if (
          nextToken &&
          typeof window !==
            "undefined"
        ) {
          window.localStorage.setItem(
            TOKEN_KEY,
            nextToken
          );
        }

        /*
         * Store the guest identity whenever
         * a guest session is created.
         */
        if (
          nextUser?.plan ===
            "guest" &&
          nextUser?.id &&
          typeof window !==
            "undefined"
        ) {
          window.localStorage.setItem(
            GUEST_ID_KEY,
            nextUser.id
          );
        }
      },
      []
    );

  const logout =
    useCallback(async () => {
      try {
        const response =
          await fetch(
            `${BASE_URL}/auth/logout`,
            {
              method: "POST",
              credentials:
                "include",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          console.error(
            "LOGOUT REQUEST FAILED:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "LOGOUT ERROR:",
          error
        );
      } finally {
        clearLocalAuth();
      }
    }, [clearLocalAuth]);

  const value = useMemo(
    () => ({
      user,
      loading,

      isAuthenticated:
        Boolean(user),

      isGuest:
        user?.plan === "guest",

      isRegisteredUser:
        Boolean(user) &&
        user?.plan !== "guest",

      usageWarnings,

      setAuthenticatedUser,
      logout,
      refreshSession,
      refreshUsageWarnings,
    }),
    [
      user,
      loading,
      usageWarnings,
      setAuthenticatedUser,
      logout,
      refreshSession,
      refreshUsageWarnings,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth() must be used inside <AuthProvider>."
    );
  }

  return context;
}