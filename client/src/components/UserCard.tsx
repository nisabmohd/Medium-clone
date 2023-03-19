import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";

type UserCardProps = {
  name: string;
  bio?: string;
  _id: string;
  avatar: string;
  followers: Array<string>;
};
export default function UserCard({
  name,
  _id,
  avatar,
  bio,
  followers,
}: UserCardProps) {
  const { user } = useAuth();
  const [iFollow, setIFollow] = useState<boolean>(
    () => followers.includes(user!._id) ?? false
  );
  const { refetch: follow } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/follow/${_id}`),
    queryKey: ["handle", "follow", _id],
    enabled: false,
  });
  const { refetch: unfollow } = useQuery({
    queryFn: () => httpRequest.put(`${url}/user/unfollow/${_id}`),
    queryKey: ["handle", "unfollow", _id],
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
        marginLeft: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        margin: "12px 0",
      }}
    >
      <Link to={`/user/${_id}`}>
        <img
          style={{ width: "36px", borderRadius: "50%", marginTop: "-5px" }}
          src={
            avatar ??
            "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a"
          }
          alt=""
        />
      </Link>
      <Link
        to={`/user/${_id}`}
        className="name_details"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: "13.75px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontSize: "12.75px",
            fontFamily: "Questrial",
            marginTop: "4px",
            lineHeight: "18px",
            color: "#606060",
          }}
        >
          {bio && (bio.length > 62 ? bio?.slice(0, 51) + "..." : bio)}
        </p>
      </Link>
      <button
        onClick={() => handleFollowUnfollow()}
        style={{
          backgroundColor: iFollow ? "black" : "transparent",
          outline: "transparent",
          border: `1px solid ${iFollow ? "black" : "gray"}`,
          borderRadius: "17px",
          padding: "7px 14px",
          cursor: "pointer",
          marginLeft: "auto",
          color: iFollow ? "white" : "black",
        }}
      >
        {iFollow ? "Following" : "Follow"}
      </button>
    </div>
  );
}
