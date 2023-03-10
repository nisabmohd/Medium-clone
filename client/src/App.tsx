import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthRedirect from "./pages/AuthRedirect";
import Authentication from "./router/Authentication";

export default function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <Home />
            </Authentication>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirect" element={<AuthRedirect />} />
      </Routes>
    </div>
  );
}
