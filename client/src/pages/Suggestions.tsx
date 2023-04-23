import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function Suggestions() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
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
          gap: "38px",
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
            {"Suggestions"}
          </h1>
        </div>
      </div>
    </div>
  );
}
