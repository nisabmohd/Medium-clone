import {} from "react";
import SavedListBox from "./SavedListBox";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";

export default function SavedSection({ userId }: { userId: string }) {
  const { data: response } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/list`),
    queryKey: ["user", "all", "list"],
    onSuccess(r) {
      console.log(r.data.lists);
    },
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {response?.data.lists.map((item: any) => {
        return (
          <SavedListBox
            name={item.name}
            key={item._id}
            stories={item.posts.length}
            images={item.images}
            userId={userId}
          />
        );
      })}
    </div>
  );
}
