import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthRedirect from "./pages/AuthRedirect";
import Authentication from "./router/Authentication";
import Post from "./pages/Post";
import Notifications from "./pages/Notifications";
import User from "./pages/User";

export default function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Routes>
        <Route
          path="/tag?/:tag?"
          element={
            <Authentication>
              <Home />
            </Authentication>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Authentication>
              <Post />
            </Authentication>
          }
        />
        <Route
          path="/user/:id/:tab?"
          element={
            <Authentication>
              <User />
            </Authentication>
          }
        />
        <Route
          path="/notifications"
          element={
            <Authentication>
              <Notifications />
            </Authentication>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirect" element={<AuthRedirect />} />
      </Routes>
    </div>
  );
}
