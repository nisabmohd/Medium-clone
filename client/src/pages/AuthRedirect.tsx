import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../baseUrl";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";

export default function AuthRedirect() {
  const [err, setErr] = useState<string | undefined>(undefined);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const [refreshToken, setRefreshToken] = useLocalStorage<string | undefined>(
    "refresh_token",
    undefined
  );
  const [accessToken, setAccessToken] = useLocalStorage<string | undefined>(
    "access_token",
    undefined
  );
  const [user, setUser] = useLocalStorage<any>("user", undefined);

  useEffect(() => {
    axios
      .get(`${url}/user/${query.get("uid")}`)
      .then((res) => {
        if (!res.data.success) {
          console.log(res.data);
          setErr("Something unexpected happened");
          clearLocalStorage();
        }
        setAccessToken(query.get("access_token") as string);
        setRefreshToken(query.get("refresh_token") as string);
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErr("Something unexpected happened");
        localStorage.clear();
      });
  }, [navigate, query]);

  return (
    <div style={{ textAlign: "center", marginTop: "6vh" }}>
      {err ? err : "Redirecting ..."}
    </div>
  );
}
