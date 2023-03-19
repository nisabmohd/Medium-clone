import { Link } from "react-router-dom";

type UserPostCardProps = {
  image?: string;
  username: string;
  followers: number;
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
        {followers > 0 ? followers + " Followers" : ""}
      </span>
      {bio && <p style={{ color: "gray", marginLeft: "8px" }}>{bio}</p>}
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
    </div>
  );
}
