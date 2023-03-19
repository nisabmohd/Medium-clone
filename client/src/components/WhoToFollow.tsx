import { useQuery } from "@tanstack/react-query";
import { url } from "../baseUrl";
import { httpRequest } from "../interceptor/axiosInterceptor";
import UserCard from "./UserCard";

export default function WhoToFollow() {
  const { data: response } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/suggest`),
    queryKey: ["who", "follow"],
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
          marginBottom: "18px",
        }}
      >
        Who to follow
      </h5>
      <div
        className="users_cards"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {response?.data.map(
          (item: {
            avatar: string;
            _id: string;
            name: string;
            bio: string;
            followers: Array<string>;
          }) => {
            return (
              <UserCard
                avatar={item.avatar}
                _id={item._id}
                name={item.name}
                bio={item.bio}
                key={item._id}
                followers={item.followers}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
