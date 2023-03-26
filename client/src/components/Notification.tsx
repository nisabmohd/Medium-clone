import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

type NotificationPropType = {
  userId: string;
  username: string;
  avatar: string;
  message: string;
  postId?: string;
  postTitle?: string;
  read: boolean;
  createdAt: string;
};

export default function Notification({
  avatar,
  createdAt,
  message,
  read,
  userId,
  username,
  postId,
  postTitle,
}: NotificationPropType) {
  useEffect(() => {
    document.title = "Notifications - Medium";
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "18px",
        marginBottom: "14px",
      }}
    >
      <span
        style={{
          backgroundColor: read ? "white" : "#1a8917",
          width: "4px",
          height: "100%",
          borderRadius: "4px",
        }}
      ></span>
      <div className="left_photo_not" style={{ marginLeft: "-5px" }}>
        <Link to={`/user/${userId}`}>
          <img
            style={{ height: "34px", width: "34px", borderRadius: "50%" }}
            src={avatar}
            alt=""
          />
        </Link>
      </div>
      <Link
        to={postId ? `/blog/${postId}` : `/user/${userId}`}
        className="notification_content hover_black"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <p className="hover_black" style={{ fontSize: "14px" }}>
          {`${username}`}
          <span style={{ color: "gray" }}>{"  " + message}</span>
          {` ${postTitle ?? ""}`}
        </p>
        <p style={{ fontSize: "12px", color: "gray" }}>
          <ReactTimeAgo
            date={Date.parse(createdAt)}
            locale="en-US"
            timeStyle="round"
          />
        </p>
      </Link>
    </div>
  );
}
