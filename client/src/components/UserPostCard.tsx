import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../baseUrl";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";

type UserPostCardProps = {
  image?: string;
  username: string;
  followers: Array<string>;
  bio?: string;
  userId: string;
};

export default function UserPostCard({
  followers,
  userId,
  username,
  bio,
  image,
}: UserPostCardProps) {
  const { user } = useAuth();
  const [iFollow, setIFollow] = useState<boolean>(
    () => followers.includes(user?._id ?? "") ?? false
  );
  const { refetch: follow } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/follow/${userId}`),
    queryKey: ["handle", "follow", userId],
    enabled: false,
  });
  const { refetch: unfollow } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/unfollow/${userId}`),
    queryKey: ["handle", "unfollow", userId],
    enabled: false,
  });
  function handleFollowUnfollow() {
    if (iFollow) {
      setIFollow(false);
      unfollow();
    } else {
      setIFollow(true);
      follow();
    }
  }
  return (
    <div
      style={{
        width: "90%",
        marginLeft: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "12px",
      }}
    >
      <Link to={`/user/${userId}`}>
        <img
          style={{
            width: "90px",
            borderRadius: "50%",
            marginBottom: "8px",
            marginLeft: "8px",
          }}
          src={image}
          alt=""
        />
      </Link>
      <Link
        to={`/user/${userId}`}
        style={{
          marginLeft: "8px",
          fontFamily: "Roboto Slab",
          fontSize: "15px",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {username}
      </Link>
      <span
        style={{
          marginLeft: "8px",
          marginTop: "-4px",
          fontSize: "14px",
          fontFamily: "Roboto",
          color: "#4b4a4a",
        }}
      >
        {followers.length > 0 ? followers.length + " Followers" : ""}
      </span>
      {bio && (
        <p
          style={{
            color: "gray",
            marginLeft: "8px",
            fontSize: "15px",
            lineHeight: "21px",
          }}
        >
          {bio}
        </p>
      )}

      {user?._id !== userId ? (
        <button
          onClick={() => handleFollowUnfollow()}
          style={{
            width: "fit-content",
            padding: "10px 18px",
            marginLeft: "6px",
            borderRadius: "17px",
            border: iFollow ? "1px solid gray" : "none",
            backgroundColor: iFollow ? "transparent" : "rgba(26, 137, 23, 1)",
            color: iFollow ? "black" : "white",
            marginTop: "16px",
            cursor: "pointer",
          }}
        >
          {iFollow ? "Unfollow" : "Follow"}
        </button>
      ) : (
        <p
          style={{
            color: "rgba(26, 137, 23, 1)",
            marginLeft: "8px",
            marginTop: !bio ? "5px" : "12px",
            fontSize: "13.4px",
          }}
        >
          Edit profile
        </p>
      )}
    </div>
  );
}
