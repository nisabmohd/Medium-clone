import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import Markdown from "../components/Markdown";
import Chip from "../components/Chip";
import {
  clapIcon,
  commentIcon,
  moreIcon,
  savePost,
  shareicon,
} from "../assets/icons";
import TopPicks from "../components/TopPicks";
import UserPostCard from "../components/UserPostCard";
import PostAuthor from "../components/PostAuthor";
import useShare from "../hooks/useShare";
import { useMemo, useState } from "react";
import { useAuth } from "../contexts/Auth";
import MoreFrom from "../components/MoreFrom";
import { GetStarted } from "../components/AvatarMenu";
import { useAppContext } from "../App";

export default function Post() {
  const { webShare } = useShare();
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const postUrl = useMemo(() => window.location.href, [id]);
  const [votes, setVotes] = useState(0);
  const [turnBlack, setTurnBlack] = useState(false);
  const { socket } = useAppContext();

  const { isLoading, error, data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/${id}`),
    queryKey: ["blog", id],
    onSuccess: (data) => {
      document.title = data.data.post.title + " - Medium";
      setVotes(data.data.post.votes.length ?? 0);
      setTurnBlack(data.data.post.votes.includes(user?._id));
    },
  });

  const { refetch: clap } = useQuery({
    queryFn: () => httpRequest.patch(`${url}/post/vote/${id}`),
    queryKey: ["vote", id],
    enabled: false,
    onSuccess: (res) => {
      if (res.data.success) {
        socket.emit("notify", { userId: data?.data.user._id });
        setVotes((prev) => prev + 1);
      }
    },
  });
  function votePost() {
    setTurnBlack(true);
    clap();
  }

  if (error) return <p>Something went wrong ...</p>;
  if (isLoading) return <p>Loading ...</p>;

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div
        className="postsList"
        style={{
          borderRight: "solid 1px rgba(242, 242, 242, 1)",
          width: "69%",
          paddingTop: "3vh",
          minHeight: "97vh",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
          marginRight: "auto",
        }}
      >
        <div
          className="post_content"
          style={{
            width: "90%",
            marginRight: "auto",
          }}
        >
          {data?.data && (
            <PostAuthor
              title={data.data.post.title}
              avatar={data.data.user.avatar}
              postId={data.data.post._id}
              timestamp={data.data.post.createdAt}
              username={data.data.user.name}
              userId={data.data.user._id}
              postUrl={postUrl}
            />
          )}
          <h1
            style={{
              fontWeight: "bolder",
              fontFamily: "Poppins",
              fontSize: "32px",
              marginBottom: "18px",
            }}
          >
            {data?.data?.post.title}
          </h1>
          <div className="markdown">
            <Markdown>{data?.data?.post?.markdown}</Markdown>
          </div>
          <div
            className="bottomScreen"
            style={{
              marginTop: "60px",
            }}
          >
            <div className="relatedTags">
              {data?.data?.post.tags.map((item: string) => {
                return (
                  <Chip
                    key={item}
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                      fontFamily: "Questrial",
                      padding: "10px 18px",
                      margin: "4.5px 3px",
                      fontSize: "13.8px",
                    }}
                    text={item}
                  />
                );
              })}
            </div>
            <div
              className="post_reach"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "5vh 0",
              }}
            >
              <div
                className="left_tile"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span
                    onClick={() =>
                      data?.data.post.userId !== user?._id && votePost()
                    }
                    style={{
                      ...iconColor,
                      color: turnBlack ? "black" : "rgb(171 169 169)",
                      cursor:
                        data?.data.post.userId == user?._id
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {clapIcon}
                  </span>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      fontFamily: "Roboto",
                    }}
                  >
                    {votes || ""}
                  </p>
                </div>
                <span style={iconColor}>{commentIcon}</span>
              </div>
              <div
                className="right_tile"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <span
                  onClick={() =>
                    webShare({
                      title: data?.data.post.title,
                      text: "Check out this Medium blog",
                      url: postUrl,
                    })
                  }
                  style={iconColor}
                >
                  {shareicon}
                </span>
                <span style={iconColor}>{savePost}</span>
                <span style={iconColor}>{moreIcon}</span>
              </div>
            </div>
          </div>
          {id && data?.data?.user._id && (
            <MoreFrom
              userId={data?.data?.user._id}
              postId={id}
              avatar={data?.data?.user.avatar}
              username={data?.data?.user.name}
              bio={data.data?.user?.bio}
              followers={data.data?.user?.followers}
            />
          )}
        </div>
      </div>
      <div
        className="rightbar"
        style={{
          width: "31%",
          paddingTop: "3vh",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
        }}
      >
        {data?.data.user && (
          <UserPostCard
            followers={data.data.user.followers}
            userId={data.data.user._id}
            username={data.data.user.name}
            bio={data.data.user.bio}
            image={data.data.user.avatar}
          />
        )}
        {isAuthenticated ? (
          <TopPicks text="More from Medium" showImg={true} />
        ) : (
          <GetStarted
            style={{ width: "83%", marginLeft: "20px" }}
            topStyle={{ marginTop: "22px" }}
          />
        )}
      </div>
    </div>
  );
}

const iconColor = {
  color: "rgba(117, 117, 117, 1)",
  cursor: "pointer",
};
