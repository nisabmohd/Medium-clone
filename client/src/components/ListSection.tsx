import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import Post from "./Post";

export default function ListSection({ listName }: { listName: string }) {
  const { data: response } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/saved/${listName}`),
    queryKey: ["saved", "listname", "get", "all"],
  });

  console.log(response?.data);

  return (
    <div>
      <h1 style={{ marginBottom: "60px" }}>{response?.data.name}</h1>
      {response?.data.posts.map((item: any) => {
        return (
          <Post
            showUserList={true}
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
            showMoreIcon={false}
          />
        );
      })}
    </div>
  );
}
