"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  _id: string;
  email: string;
  name?: string | null;
  picture?: string | null;
  plan?: string;
  timezone?: string;
  disabled?: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  setAuth: (token: string, user?: User | null) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

const TOKEN_KEY = "recallnova_access_token";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] =
    useState<string | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedToken =
      window.localStorage.getItem(
        TOKEN_KEY
      );

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const setAuth = (
    newToken: string,
    newUser?: User | null
  ) => {
    window.localStorage.setItem(
      TOKEN_KEY,
      newToken
    );

    setToken(newToken);

    if (newUser !== undefined) {
      setUser(newUser);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(
      TOKEN_KEY
    );

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export { TOKEN_KEY };