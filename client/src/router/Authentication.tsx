import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

type AuthenticationProps = {
  children: ReactNode;
};

export default function Authentication({ children }: AuthenticationProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
