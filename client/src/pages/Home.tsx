import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../baseUrl";
import Post from "../components/Post";
import SuggestionBar from "../components/SuggestionBar";
import Topics from "../components/Topics";
import TopPicks from "../components/TopPicks";
import WhoToFollow from "../components/WhoToFollow";
import { httpRequest } from "../interceptor/axiosInterceptor";

export default function Home() {
  const { tag } = useParams();
  const [posts, setposts] = useState<Array<any>>([]);
  useQuery({
    queryFn: () => httpRequest.get(`${url}/post/home`),
    queryKey: ["home", "no"],
    enabled: tag == undefined,
    onSuccess: (data) => {
      console.log(data.data, "home");
    },
  });
  useQuery({
    queryFn: () => httpRequest.get(`${url}/post/topic/${tag}`),
    queryKey: ["home", "topic", tag],
    enabled: tag != undefined,
    onSuccess: (data) => {
      console.log(data.data, "topic");
    },
  });

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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
          marginRight: "auto",
        }}
      >
        <SuggestionBar />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
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
        <TopPicks text="Top Picks" />
        <Topics />
        <WhoToFollow />
      </div>
    </div>
  );
}
