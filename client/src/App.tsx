import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AuthRedirect from "./pages/AuthRedirect";
import Authentication from "./router/Authentication";
import Post from "./pages/Post";
import Notifications from "./pages/Notifications";
import User from "./pages/User";
import Write from "./pages/Write";
import { useAuth } from "./contexts/Auth";
import UnAuthNavbar from "./components/UnAuthNavbar";
import UnAuthHome from "./pages/UnAuthHome";
import SignIn from "./pages/SignIn";
import { useState, createContext, useContext } from "react";
import { Toaster, toast, Toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import WriteNavbar from "./components/WriteNavbar";
import { Container } from "@mui/system";

export const DEFAULT_IMG =
  "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a";

type AppContextType = {
  hideNavbar(val: boolean): void;
  handleToast(message: string): void;
};

const Context = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  return useContext(Context) as AppContextType;
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const [showNav, setShowNav] = useState(true);

  function hideNavbar(val: boolean) {
    setShowNav(!val);
  }
  function handleToast(message: string) {
    toast((t) => <ToastComponent message={message} t={t} />, {
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
        padding: "15px 18px",
      },
    });
  }

  const contextValue: AppContextType = {
    hideNavbar,
    handleToast,
  };
  return (
    <Context.Provider value={contextValue}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="App" style={{ height: "100vh" }}>
        {showNav && (isAuthenticated ? <Navbar /> : <UnAuthNavbar />)}
        <Routes>
          <Route
            path="/tag?/:tag?"
            element={isAuthenticated ? <Home /> : <UnAuthHome />}
          />
          <Route path="/signin/:tab" element={<SignIn />} />
          <Route path="/blog/:id" element={<Post />} />
          <Route path="/user/:id/:tab?" element={<User />} />
          <Route
            path="/notifications"
            element={
              <Authentication>
                <Notifications />
              </Authentication>
            }
          />
          <Route
            path="/write"
            element={
              <Authentication>
                <Container
                  sx={{ width: "50%", margin: "auto", height: "100%" }}
                >
                  <Write />
                </Container>
              </Authentication>
            }
          />
          <Route path="/oauth/redirect" element={<AuthRedirect />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

function ToastComponent({ message, t }: { message: string; t: Toast }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "white",
          fontFamily: "Roboto Slab",
          fontSize: "14px",
          marginRight: "30px",
        }}
      >
        {message}
      </span>
      <button
        style={{
          color: "white",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          marginLeft: "18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => toast.dismiss(t.id)}
      >
        {<CloseIcon sx={{ fontSize: "17px" }} />}
      </button>
    </div>
  );
}
