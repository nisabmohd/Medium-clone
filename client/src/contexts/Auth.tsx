import { createContext, ReactNode, useContext } from "react";

const Context = createContext<any>(undefined);

type AuthProps = {
  children: ReactNode;
};
export default function Auth({ children }: AuthProps) {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}
