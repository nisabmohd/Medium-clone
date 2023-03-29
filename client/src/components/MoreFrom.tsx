import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../App";
import { url } from "../baseUrl";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";
import Post from "./Post";

export default function MoreFrom({
  userId,
  postId,
  username,
  bio,
  followers,
}: {
  userId: string;
  postId: string;
  username: string;
  avatar: string;
  bio: string;
  followers: Array<string>;
}) {
  const { user } = useAuth();
  const { socket } = useAppContext();
  const [iFollow, setIFollow] = useState(followers.includes(user?._id ?? ""));
  const { data: response } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/more/${postId}/${userId}`),
    queryKey: ["more", "from", userId, postId],
  });

  const { refetch: follow } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/follow/${userId}`),
    queryKey: ["follow", "more", "from", postId, userId],
    enabled: false,
  });

  const { refetch: unfollow } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/unfollow/${userId}`),
    queryKey: ["unfollow", "more", "from", postId, userId],
    enabled: false,
  });

  function handleFollowUnfollow() {
    if (iFollow) {
      setIFollow(false);
      unfollow();
    } else {
      setIFollow(true);
      socket.emit("notify", { userId });
      follow();
    }
  }
  return (
    <div
      className="morefrom"
      style={{
        backgroundColor: "#fafafa",
        padding: "22px 25px",
        borderRadius: "3px",
        width: "96.5%",
        marginLeft: "-10px",
      }}
    >
      <div
        className="top_more_from"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div className="left_more_from" style={{ width: "65%" }}>
          <Link
            to={`/user/${userId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3>More from {username}</h3>
          </Link>
          <p
            style={{
              color: "rgba(117, 117, 117, 1)",
              fontSize: "14px",
              marginTop: "-8px",
              marginBottom: "45px",
              lineHeight: "24px",
            }}
          >
            {bio}
          </p>
        </div>
        <div className="right_more_from">
          {user?._id !== userId && (
            <button
              onClick={() => handleFollowUnfollow()}
              style={{
                marginTop: "20px",
                backgroundColor: iFollow ? "transparent" : "#669254",
                padding: "10px 18px",
                border: iFollow ? "1px solid gray" : "none",
                outline: "none",
                borderRadius: "18px",
                color: iFollow ? "black" : "white",
                cursor: "pointer",
              }}
            >
              {iFollow ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {response?.data?.map((post: any) => {
          return (
            <Post
              postId={post._id}
              summary={post.summary}
              title={post.title}
              timestamp={post.createdAt}
              showMuteicon={false}
              image={post.image}
              key={post._id}
              tag={post.tags.at(0)}
              showUserList={false}
            />
          );
        })}
      </div>
    </div>
  );
}
