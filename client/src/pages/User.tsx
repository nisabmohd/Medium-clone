import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { moreIcon } from "../assets/icons";
import { url } from "../baseUrl";
import Post from "../components/Post";
import TopPicks from "../components/TopPicks";
import UserPostCard from "../components/UserPostCard";
import { httpRequest } from "../interceptor/axiosInterceptor";
export default function User() {
  const { id } = useParams();
  const { data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/${id}`),
    queryKey: ["user", id],
    onSuccess: (data) => {
      document.title = data.data.name + " - Medium";
    },
  });
  const { data: postData } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/user/${id}`),
    enabled: data?.data != undefined,
    queryKey: ["post", "user", id],
  });
  console.log(postData);

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
        <div
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
              marginBottom: "78px",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>{data?.data.name}</h1>
            <span style={{ color: "gray" }}>{moreIcon}</span>
          </div>

          {postData?.data.map((item: any) => {
            return (
              <Post
                postId={item._id}
                timestamp={item.createdAt}
                title={item.title}
                username={data?.data.name}
                userId={data?.data.name._id}
                image={item.image}
                tag={item.tags.at(0)}
                userImage={data?.data.avatar}
                key={item._id}
                summary={item.summary}
                showMuteicon={false}
              />
            );
          })}
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
            followers={data.data.followers.length}
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
