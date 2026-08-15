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

type User = {
  id: string;
  email: string;
  name?: string | null;
  picture?: string | null;
  plan: string;
  timezone: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setAuthenticatedUser: (
    user: User
  ) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<User | null>;
};

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

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
        window.localStorage.removeItem(
          TOKEN_KEY
        );
      }

      setUser(null);
    }, []);

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

  const setAuthenticatedUser =
    useCallback(
      (nextUser: User) => {
        setUser(nextUser);
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
      setAuthenticatedUser,
      logout,
      refreshSession,
    }),
    [
      user,
      loading,
      setAuthenticatedUser,
      logout,
      refreshSession,
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