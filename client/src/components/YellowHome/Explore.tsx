import { useQuery } from "@tanstack/react-query";
import { url } from "../../baseUrl";
import { httpRequest } from "../../interceptor/axiosInterceptor";
import Post from "../Post";
import Topics from "../Topics";

export default function Explore() {
  const { data, isError, isLoading } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/explore`),
    queryKey: ["explore", "unauth"],
  });
  console.log(data?.data);

  return (
    <div>
      <div
        className="container_70"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          className="postsList"
          style={{
            width: "58%",
            paddingTop: "3vh",
            minHeight: "97vh",
            display: "flex",
            flexDirection: "column",
            gap: "38px",
            marginRight: "auto",
            marginTop: "30px",
          }}
        >
          {data?.data?.map((item: any) => {
            return (
              <Post
                showUserList={true}
                filterPost={() => {}}
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
              />
            );
          })}
          v
        </div>
        <div
          className="rightbar"
          style={{
            width: "31%",
            paddingTop: "3vh",
            display: "flex",
            flexDirection: "column",
            gap: "38px",
            marginTop: "30px",
          }}
        >
          <Topics text="Discover more of what matters to you" />
        </div>
      </div>
    </div>
  );
}
