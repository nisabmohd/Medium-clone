import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

type AuthenticationProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function Authentication({
  children,
  fallback,
}: AuthenticationProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>{children}</>
  ) : fallback ? (
    <>{fallback}</>
  ) : (
    <Navigate to="/" />
  );
}
