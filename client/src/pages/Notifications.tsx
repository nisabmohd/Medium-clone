import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppContext } from "../App";
import { url } from "../baseUrl";
import Notification from "../components/Notification";
import Topics from "../components/Topics";
import TopPicks from "../components/TopPicks";
import WhoToFollow from "../components/WhoToFollow";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";

export default function Notifications({
  emptyNotifications,
}: {
  emptyNotifications(): void;
}) {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/notifications`),
    queryKey: ["notifications", "user", user?._id],
  });
  const { socket } = useAppContext();
  useEffect(() => {
    socket.emit("readAll", { userId: user?._id });
    emptyNotifications();
  }, []);

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
              marginBottom: "28px",
              marginTop: "14px",
            }}
          >
            <h1 style={{ fontSize: "40px", letterSpacing: "0.38px" }}>
              {"Notifications"}
            </h1>
          </div>
          {data?.data?.map(
            (item: {
              _id: string;
              userId: string;
              username: string;
              avatar: string;
              message: string;
              postId?: string;
              postTitle?: string;
              read: boolean;
              createdAt: string;
            }) => {
              return (
                <Notification
                  key={item._id}
                  avatar={item.avatar}
                  createdAt={item.createdAt}
                  message={item.message}
                  read={item.read}
                  userId={item.userId}
                  username={item.username}
                  postId={item.postId}
                  postTitle={item.postTitle}
                />
              );
            }
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
        <TopPicks text="Top Picks" />
        <Topics />
        <WhoToFollow />
      </div>
    </div>
  );
}
