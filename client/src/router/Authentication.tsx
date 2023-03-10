import { ReactNode } from "react";
import Navbar from "../components/Navbar";

type AuthenticationProps = {
  children: ReactNode;
};

export default function Authentication({ children }: AuthenticationProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
