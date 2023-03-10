import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../baseUrl";

export default function AuthRedirect() {
  const [err, setErr] = useState<string | undefined>(undefined);
  const [query] = useSearchParams();
  const navigate = useNavigate();
  console.log(query.get("access_token"));
  console.log(query.get("refresh_token"));
  console.log(query.get("uid"));

  useEffect(() => {
    axios
      .get(`${url}/user/${query.get("uid")}`)
      .then((res) => {
        if (!res.data.success) {
          console.log(res.data);
          setErr("Something unexpected happened");
          localStorage.clear();
        }
        localStorage.setItem("access_token", query.get("access_token")!);
        localStorage.setItem("refresh_token", query.get("refresh_token")!);
        localStorage.setItem("user", JSON.stringify(res.data));
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
