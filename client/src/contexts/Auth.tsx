import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";
import { url } from "../baseUrl";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";
import { httpRequest } from "../interceptor/axiosInterceptor";

export type User = {
  avatar: string;
  bio: string;
  email: string;
  name: string;
  _id: string;
  list: Array<any>;
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

  const { refetch: logoutCall } = useQuery({
    queryFn: () =>
      httpRequest.post(`${url}/auth/logout`, {
        refresh_token: JSON.parse(
          localStorage.getItem("refresh_token") as string
        ),
      }),
    queryKey: ["logout", user?._id],
    enabled: false,
    onSuccess() {
      setUser(undefined);
      setIsAuthenticated(false);
      clearLocalStorage();
    },
  });

  function logout() {
    logoutCall();
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
