import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { moreIcon } from "../assets/icons";
import { url } from "../baseUrl";
import Post from "../components/Post";
import Tab from "../components/Tab";
import UserPostCard from "../components/UserPostCard";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";
import AboutSection from "../components/AboutSection";
import SavedSection from "../components/SavedSection";

const USER_PAGE_TAB_OPTIONS_AUTH = [
  {
    id: 1,
    url: "/user/userId",
    title: "home",
  },
  {
    id: 2,
    url: "/user/userId/lists",
    title: "lists",
  },
  {
    id: 3,
    url: "/user/userId/about",
    title: "about",
  },
];

const USER_PAGE_TAB_OPTIONS_UNAUTH = [
  {
    id: 1,
    url: "/user/userId",
    title: "home",
  },
  {
    id: 3,
    url: "/user/userId/about",
    title: "about",
  },
];
export default function User() {
  const { tab } = useParams();
  const { id } = useParams();
  const { user } = useAuth();

  const [optionsTab, setOptionsTab] = useState<
    typeof USER_PAGE_TAB_OPTIONS_AUTH
  >([]);
  const [posts, setposts] = useState<Array<any>>([]);

  useEffect(() => {
    if (tab) return;
    refetch();
  }, [tab]);

  const { data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/${id}`),
    queryKey: ["user", id],
    onSuccess: (data) => {
      document.title = data.data.name + " - Medium";
      setOptionsTab(() => {
        if (user?._id === id)
          return USER_PAGE_TAB_OPTIONS_AUTH.map((item) => {
            return { ...item, url: item.url.replace("userId", data.data._id) };
          });
        else
          return USER_PAGE_TAB_OPTIONS_UNAUTH.map((item) => {
            return { ...item, url: item.url.replace("userId", data.data._id) };
          });
      });
    },
  });

  const { refetch } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/user/${id}`),
    enabled: data?.data != undefined,
    queryKey: ["post", "user", id],
    onSuccess(response) {
      setposts(response.data);
    },
  });

  function filterPost(postId: string) {
    setposts((prev) => prev.filter((item) => item._id !== postId));
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
              marginTop: "28px",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>{data?.data?.name}</h1>
            <span style={{ color: "gray" }}>{moreIcon}</span>
          </div>
          <Tab options={optionsTab} activeTab={tab ?? "home"} />
          <span style={{ marginTop: "-20px" }}>{""}</span>
          {!tab &&
            posts.map((item: any) => {
              return (
                <Post
                  showUserList={true}
                  postId={item._id}
                  timestamp={item.createdAt}
                  title={item.title}
                  username={data?.data?.name}
                  userId={id as string}
                  image={item.image}
                  tag={item.tags.at(0)}
                  userImage={data?.data?.avatar}
                  key={item._id}
                  summary={item.summary}
                  showMuteicon={false}
                  filterPost={filterPost}
                />
              );
            })}
          {tab == "lists" && <SavedSection />}
          {tab == "about" && (
            <AboutSection
              bio={data?.data.bio}
              followers={data?.data.followers.length}
              followings={data?.data.followings.length}
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
        {data?.data && (
          <UserPostCard
            followers={data.data.followers}
            userId={data.data._id}
            username={data.data.name}
            bio={data.data.bio}
            image={data.data.avatar}
          />
        )}
      </div>
    </div>
  );
}
