import { Link } from "react-router-dom";

type AboutProps = {
  followings: number;
  followers: number;
  bio?: string;
  userId: string;
};

export default function AboutSection({
  followers,
  followings,
  bio,
  userId,
}: AboutProps) {
  return (
    <>
      {bio && (
        <>
          <div
            className="bio_about"
            style={{
              backgroundColor: "#fafafa",
              borderRadius: "5px",
              padding: "37px 19px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {bio}
          </div>
          <span
            style={{
              width: "100%",
              backgroundColor: "rgb(242, 242, 242)",
              height: "1px",
            }}
          ></span>
        </>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "22px",
        }}
      >
        <Link
          to={`/user/${userId}/followers`}
          style={{ color: "#72a589", fontSize: "13px", textDecoration: "none" }}
        >
          {followers} Followers
        </Link>
        <Link
          to={`/user/${userId}/followings`}
          style={{ color: "#72a589", fontSize: "13px", textDecoration: "none" }}
        >
          {followings} Followings
        </Link>
      </div>
    </>
  );
}
