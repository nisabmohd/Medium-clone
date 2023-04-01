import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../baseUrl";
import Chip from "../components/Chip";
import Post from "../components/Post";
import Tab from "../components/Tab";
import Topics from "../components/Topics";
import TopPicks from "../components/TopPicks";
import UserCard from "../components/UserCard";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";
import WhoToFollow from "../components/WhoToFollow";

const SEARCHBAR_OPTIONS = [
  {
    id: 1,
    title: "stories",
    url: "/search/stories/${q}",
  },
  {
    id: 2,
    title: "people",
    url: "/search/people/${q}",
  },
  {
    id: 3,
    title: "topics",
    url: "/search/topics/${q}",
  },
];

export default function SearchResults() {
  const { user } = useAuth();
  const [tabsOptions, setTabOptions] = useState<
    Array<{ id: number; url: string; title: string }>
  >([]);
  const { query, tab } = useParams();
  const [apiQuery, setApiQuery] = useState("");
  const [posts, setPosts] = useState<Array<any>>([]);
  const [topics, setTopics] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const { isAuthenticated } = useAuth();

  const { refetch } = useQuery({
    queryFn: () =>
      httpRequest.post(`${url}/search/${apiQuery}/${query}`, {
        userId: user?._id,
      }),
    queryKey: ["search", "get", tab, query],
    enabled: false,
    onSuccess(response) {
      if (tab === "stories") setPosts(response.data);
      else if (tab === "people") setUsers(response.data);
      else if (tab === "topics") setTopics(response.data);
    },
  });

  useEffect(() => {
    if (!query || !tab) return;
    setApiQuery("");
    const t = setTimeout(() => {
      if (tab === "stories") setApiQuery("posts");
      else if (tab === "people") setApiQuery("users");
      else if (tab === "topics") setApiQuery("topics");
      const tabs = SEARCHBAR_OPTIONS.map((tabItem) => {
        return { ...tabItem, url: tabItem.url.replace("${q}", query!) };
      });
      setTabOptions(tabs);
    }, 400);
    return () => clearTimeout(t);
  }, [tab, query]);

  useEffect(() => {
    if (!apiQuery) return;
    refetch();
  }, [apiQuery]);

  function filterPost(postId: string) {
    setPosts((prev) => prev.filter((item) => item?.post?._id !== postId));
  }

  function filterAuthorPost(userId: string) {
    setPosts((prev) => prev.filter((item) => item.user._id !== userId));
  }

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
          className="inner_container_main"
          style={{
            width: "90%",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <div
            className="upperline"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              marginTop: "18px",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                marginBottom: "-12px",
                wordSpacing: "5px",
              }}
            >
              <span style={{ color: "#7f7f7f" }}>{"Results for "}</span>
              <span>{query}</span>
            </h1>
          </div>
          <Tab options={tabsOptions} activeTab={tab as string} />
          {tab === "stories" &&
            posts.map((item: any) => (
              <Post
                showUserList={true}
                filterPost={filterPost}
                filterAuthorPost={filterAuthorPost}
                postId={item.post._id}
                timestamp={item.post.createdAt}
                title={item.post.title}
                username={item.user.name}
                userId={item.user._id}
                image={item.post.image}
                tag={item.post.tags.at(0)}
                userImage={item.user.avatar}
                key={item.post._id}
                summary={item.post.summary}
                showMuteicon={false}
              />
            ))}
          {tab === "topics" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                rowGap: "20px",
                columnGap: "14px",
                marginTop: "-5px",
              }}
            >
              {topics.map((item: any) => {
                return (
                  <Chip
                    text={item.name}
                    key={item._id}
                    style={{ padding: "12px 14px", fontSize: "13.8px" }}
                  />
                );
              })}
            </div>
          )}
          {tab === "people" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-5px",
                gap: "22px",
              }}
            >
              {users.map((item: any) => {
                return (
                  <UserCard
                    _id={item._id}
                    avatar={item.avatar}
                    followers={item.followers}
                    name={item.name}
                    bio={item.bio}
                    key={item._id}
                  />
                );
              })}
            </div>
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
        {isAuthenticated && <TopPicks text="Top Picks" />}
        <Topics />
        {isAuthenticated && <WhoToFollow />}
      </div>
    </div>
  );
}
