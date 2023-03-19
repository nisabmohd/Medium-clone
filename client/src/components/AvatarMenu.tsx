import {} from "react";
import { DEFAULT_IMG } from "../App";
import { carrotIcon } from "../assets/icons";
import { useAuth } from "../contexts/Auth";

export default function AvatarMenu() {
  const { user } = useAuth();
  return (
    <div
      className="avatar"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <img
        style={{
          width: "32px",
          borderRadius: "50%",
          border: "1px solid #d9d9d9",
        }}
        src={user?.avatar ?? DEFAULT_IMG}
        alt=""
      />
      <span style={{ color: "rgba(117, 117, 117, 1)" }}>{carrotIcon}</span>
    </div>
  );
}
