import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "../api/client";

export interface User {
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  birth_date: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const updateUser = (userData: User) => {
    setUser(userData);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = await apiFetch<User>("/api/user/me/");
          setUser(userData);
        } catch (error) {
          console.error("Error refresh session", error);
        }
      }

      setIsInitializing(false);
    };

    restoreSession();
  })

  const login = (userData: User, tokens: AuthTokens) => {
    setUser(userData);
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  if (isInitializing) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};