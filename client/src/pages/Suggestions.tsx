import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Topic from "../components/Topic";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";

export default function Suggestions() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;

  const { data: topics } = useQuery({
    queryFn: () =>
      httpRequest.get(
        `${url}/post/suggest/topics?userId=${user._id}&limit=no-limit`
      ),
    queryKey: ["all", "topics", "suggest"],
  });

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        className="postsList"
        style={{
          borderRight: "solid 1px rgba(242, 242, 242, 1)",
          width: "69%",
          paddingTop: "3vh",
          minHeight: "97vh",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginRight: "auto",
        }}
      >
        <div
          className="upperline"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            marginTop: "14px",
          }}
        >
          <h1 style={{ fontSize: "40px", letterSpacing: "0.38px" }}>
            {"Topics to follow"}
          </h1>
        </div>
        <div
          className="inner_container_main"
          style={{
            width: "90%",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {topics?.data.map((t: any) => (
            <Topic name={t.name} key={t._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
