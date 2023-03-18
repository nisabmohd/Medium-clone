import {
  copyurlIcon,
  facebookIcon,
  linkedinIcon,
  moreIcon,
  savePost,
  twitterIcon,
} from "../assets/icons";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

type PostAuthorProps = {
  postId: string;
  username: string;
  avatar: string;
  timestamp: string;
  userId: string;
};

export default function PostAuthor({
  avatar,
  postId,
  timestamp,
  userId,
  username,
}: PostAuthorProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "22px",
        marginTop: "18px",
      }}
    >
      <div
        className="author_post_details"
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Link to={`/user/${userId}`}>
          <img
            style={{ width: "50px", borderRadius: "50%" }}
            src={avatar}
            alt=""
          />
        </Link>
        <div
          className="details-sameline"
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/user/${userId}`}
          >
            {username}
          </Link>
          <div
            className="sameline"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <p style={{ fontSize: "13px", color: "gray" }}>
              <ReactTimeAgo
                date={Date.parse(timestamp)}
                locale="en-US"
                timeStyle="round"
              />
            </p>
            <p style={{ fontSize: "13px", color: "gray" }}>3 min read</p>
          </div>
        </div>
      </div>
      <div
        className="shareIcons"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <div
          className="oneSide"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={iconStyle}>{twitterIcon}</span>
          <span style={iconStyle}>{facebookIcon}</span>
          <span style={iconStyle}>{linkedinIcon}</span>
          <span style={iconStyle}>{copyurlIcon}</span>
        </div>
        <div
          className="other_side"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={iconStyle}>{savePost}</span>
          <span style={iconStyle}>{moreIcon}</span>
        </div>
      </div>
    </div>
  );
}

const iconStyle = {
  cursor: "pointer",
  color: "gray",
};
