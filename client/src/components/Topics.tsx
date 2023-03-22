import { useQuery } from "@tanstack/react-query";
import { url } from "../baseUrl";
import { httpRequest } from "../interceptor/axiosInterceptor";
import Chip from "./Chip";

export default function Topics({
  text = "Recommended topics",
}: {
  text?: string;
}) {
  const { data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/suggest/topics`),
    queryKey: ["suggest", "topics"],
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
        }}
      >
        {text}
      </h5>
      <div
        className="chips"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data?.data?.map((item: { _id: string; name: string }) => (
          <Chip
            style={{
              backgroundColor: "rgb(242, 242, 242)",
              fontFamily: "Questrial",
              padding: "10px 18px",
              margin: "4.5px 3px",
              fontSize: "13.8px",
            }}
            key={item._id}
            text={item.name}
          />
        ))}
      </div>
    </div>
  );
}
