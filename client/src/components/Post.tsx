import { Link } from "react-router-dom";
import { moreIcon, mutePost, savePost } from "../assets/icons";
import Chip from "./Chip";

type PostProps = {
  title: string;
  image?: string;
  username: string;
  userImage?: string;
  timestamp: string;
  postId: string;
  tag?: string;
  summary: string;
};

export default function Post({
  postId,
  timestamp,
  title,
  username,
  image,
  tag,
  summary,
  userImage,
}: PostProps) {
  return (
    <div
      style={{
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        paddingBottom: "40px",
        width: "90%",
        marginRight: "auto",
      }}
    >
      <div
        className="user_post_details"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          marginBottom: "13px",
        }}
      >
        <img
          style={{ width: "26px", borderRadius: "50%" }}
          src={userImage}
          alt=""
        />
        <p style={{ fontSize: "15px", fontFamily: "Roboto Slab" }}>
          {username}
        </p>
        <p
          style={{
            fontSize: "13.5px",
            color: "gray",
            fontFamily: "Roboto Slab",
          }}
        >
          Feb 17
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "45px",
        }}
      >
        <div className="left_post">
          <h2 style={{ margin: "8px 0", marginTop: "2px" }}>
            <Link
              to={`/blog/${postId}`}
              style={{
                fontFamily: "Poppins",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {title}
            </Link>
          </h2>
          <Link
            to={`/blog/${postId}`}
            style={{
              fontSize: "15.25px",
              marginTop: "10px",
              letterSpacing: "0.2px",
              lineHeight: "25px",
              fontFamily: "Roboto Slab",
              color: "rgb(80 80 80)",
              textDecoration: "none",
            }}
          >
            {summary.slice(0, 189) + "..."}
          </Link>

          <div
            className="actions"
            style={{
              marginTop: "28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="left_actions"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {tag && <Chip text={tag} />}
              <p style={{ color: "gray", fontSize: "13.25px" }}>4 min read</p>
            </div>
            <div
              className="right_actions"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {savePost}
              </span>
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {mutePost}
              </span>
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {moreIcon}
              </span>
            </div>
          </div>
        </div>
        <div className="image">
          {image && <img style={{ width: "110px" }} src={image} alt="" />}
        </div>
      </div>
    </div>
  );
}
