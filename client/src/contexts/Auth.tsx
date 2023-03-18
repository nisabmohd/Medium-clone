import { createContext, ReactNode, useContext, useState } from "react";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";

export type User = {
  avatar: string;
  bio: string;
  email: string;
  name: string;
};

type ContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  logout(): void;
  handleUser(user: User): void;
};

const Context = createContext<ContextType | undefined>(undefined);

type AuthProps = {
  children: ReactNode;
};

export default function Auth({ children }: AuthProps) {
  const [user, setUser] = useLocalStorage<User | undefined>("user", undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    user != undefined
  );

  function logout() {
    setUser(undefined);
    setIsAuthenticated(false);
    clearLocalStorage();
  }

  function handleUser(user: User) {
    setUser(user);
    setIsAuthenticated(true);
  }

  const contextValue: ContextType = {
    user,
    isAuthenticated,
    logout,
    handleUser,
  } as const;
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context) as ContextType;
}
