import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { moreIcon } from "../assets/icons";
import { url } from "../baseUrl";
import Post from "../components/Post";
import Tab from "../components/Tab";
import UserPostCard from "../components/UserPostCard";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";
import AboutSection from "../components/AboutSection";
import SavedSection from "../components/SavedSection";
import UserCard from "../components/UserCard";
import { toTitleCase } from "../utils/helper";

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
  const [userData, setUserData] = useState<Array<any>>([]);

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
    enabled: false,
    queryKey: ["post", "user", id],
    onSuccess(response) {
      setposts(response.data);
    },
  });

  const { refetch: getAllFollowers } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/followers/${id}`),
    enabled: false,
    queryKey: ["followers", "user", id],
    onSuccess(res) {
      setUserData(res.data);
    },
  });

  const { refetch: getAllFollowings } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/followings/${id}`),
    enabled: false,
    queryKey: ["followings", "user", id],
    onSuccess(res) {
      setUserData(res.data);
    },
  });

  useEffect(() => {
    if (!data?.data || !tab) return;
    if (tab == "followers") {
      getAllFollowers();
    } else if (tab == "followings") {
      getAllFollowings();
    } else {
      refetch();
    }
    return () => {
      setposts([]);
      setUserData([]);
    };
  }, [data?.data, tab]);

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
        {tab == "followers" || tab == "followings" ? (
          <div
            className="inner_container_main"
            style={{
              width: "90%",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                fontSize: "13.5px",
              }}
            >
              <Link
                to={`/user/${id}`}
                style={{ color: "gray", textDecoration: "none" }}
              >
                {data?.data.name}
              </Link>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="sk sl"
              >
                <path
                  d="M6.75 4.5l4.5 4.5-4.5 4.5"
                  stroke="#242424"
                  strokeWidth="1.13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <p>{toTitleCase(tab)}</p>
            </div>
            <h1 style={{ marginBottom: "18px" }}>
              {userData.length} {toTitleCase(tab)}
            </h1>
            {userData.map((user: any) => {
              return (
                <UserCard
                  _id={user._id}
                  avatar={user.avatar}
                  followers={user.followers}
                  name={user.name}
                  bio={user.bio}
                  key={user._id}
                />
              );
            })}
          </div>
        ) : (
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
                userId={id!}
                bio={data?.data.bio}
                followers={data?.data.followers.length}
                followings={data?.data.followings.length}
              />
            )}
          </div>
        )}
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
