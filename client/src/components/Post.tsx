import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useAppContext } from "../App";
import { moreIcon, mutePost, savePost } from "../assets/icons";
import { url } from "../baseUrl";
import { httpRequest } from "../interceptor/axiosInterceptor";
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
  userId: string;
  filterPost?: (postId: string) => void;
  showMuteicon?: boolean;
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
  userId,
  filterPost,
  showMuteicon = true,
}: PostProps) {
  const { handleToast } = useAppContext();

  const { refetch: ignorePostCall } = useQuery({
    queryFn: () => httpRequest.patch(`${url}/post/ignore/${postId}`),
    queryKey: ["ignore", postId],
    enabled: false,
    onSuccess: (data) => {},
  });

  function ignorePost() {
    ignorePostCall();
    handleToast("Got it. You will not see this story again");
    filterPost && filterPost(postId);
  }

  return (
    <div
      style={{
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        paddingBottom: "40px",
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
        <Link to={`/user/${userId}`}>
          <img
            style={{ width: "26px", borderRadius: "50%" }}
            src={userImage}
            alt=""
          />
        </Link>
        <Link
          to={`/user/${userId}`}
          style={{
            fontSize: "14.45px",
            fontFamily: "Roboto",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {username}
        </Link>
        <p
          style={{
            fontSize: "13.15px",
            color: "gray",
            fontFamily: "Roboto Slab",
          }}
        >
          <ReactTimeAgo
            date={Date.parse(timestamp)}
            locale="en-US"
            timeStyle="round"
          />
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
          <h3 style={{ margin: "8px 0", marginTop: "-2px", fontSize: "22px" }}>
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
          </h3>
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
            {summary.slice(0, 194) + "..."}
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
              {showMuteicon && (
                <span
                  onClick={() => ignorePost()}
                  style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
                >
                  {mutePost}
                </span>
              )}
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {moreIcon}
              </span>
            </div>
          </div>
        </div>
        <Link to={`/blog/${postId}`} className="image">
          {image && (
            <img
              style={{ width: "112px", height: "112px", objectFit: "cover" }}
              src={image}
              alt=""
            />
          )}
        </Link>
      </div>
    </div>
  );
}
