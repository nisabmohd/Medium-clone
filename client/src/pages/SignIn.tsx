import { useParams } from "react-router-dom";
import { useAppContext } from "../App";
import SignInBox from "../components/SignInBox";
import { useEffect } from "react";

const MESSAGE_MAP = new Map([
  ["in", { message: "Welcome again", typeOfLogin: "Sign in" }],
  ["new", { message: "Join Medium", typeOfLogin: "Sign up" }],
  [
    "write",
    { message: "Create an account to start writing.", typeOfLogin: "Sign in" },
  ],
]);

export default function SignIn() {
  const { hideNavbar } = useAppContext();
  useEffect(() => {
    hideNavbar(true);
    return () => {
      hideNavbar(false);
    };
  }, []);

  const { tab } = useParams();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <SignInBox
        message={MESSAGE_MAP.get(tab!)?.message}
        typeOfLogin={MESSAGE_MAP.get(tab!)?.typeOfLogin!}
      />
    </div>
  );
}
