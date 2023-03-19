import { useQuery } from "@tanstack/react-query";
import { url } from "../baseUrl";
import { httpRequest } from "../interceptor/axiosInterceptor";
import StoryCard from "./StoryCard";

type TopPicksProps = {
  text: string;
  showImg?: boolean;
};

export default function TopPicks({ text, showImg = false }: TopPicksProps) {
  const { data: response } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/suggest/posts`),
    queryKey: ["suggest", "post"],
  });

  return (
    <div style={{ width: "90%", marginLeft: "auto" }}>
      <h5
        style={{
          color: "#434343",
          fontFamily: "Questrial",
          fontSize: "14px",
          margin: "12px 8px",
          letterSpacing: "0.55px",
          marginBottom: "22px",
        }}
      >
        {text}
      </h5>
      <div
        className="story_top"
        style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      >
        {response?.data.map((item: any) => {
          return (
            <StoryCard
              avatar={item.user.avatar}
              showImg={showImg}
              key={item.post._id}
              image={item.post.image}
              postId={item.post._id}
              title={item.post.title}
              userId={item.user._id}
              username={item.user.name}
            />
          );
        })}
      </div>
    </div>
  );
}
