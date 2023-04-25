import { Link } from "react-router-dom";
import { tagImage } from "../assets/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";

type TopicProps = {
  name: string;
};

export default function Topic({ name }: TopicProps) {
  const [iFollow, setIFollow] = useState(false);

  const { refetch: add } = useQuery({
    queryFn: () => httpRequest.patch(`${url}/user/intrests/?topic=${name}`),
    queryKey: ["add", "user", "intrest", name],
    enabled: false,
    onSuccess(res) {
      if (res.data.success) {
        setIFollow(true);
      }
    },
  });

  const { refetch: remove } = useQuery({
    queryFn: () => httpRequest.delete(`${url}/user/intrests/?topic=${name}`),
    queryKey: ["delete", "user", "intrest", name],
    enabled: false,
    onSuccess(res) {
      if (res.data.success) {
        setIFollow(false);
      }
    },
  });

  function handleTopicFollow() {
    if (iFollow) remove();
    else add();
  }

  return (
    <div
      style={{
        marginLeft: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        margin: "18px 0",
      }}
    >
      <Link
        style={{
          backgroundColor: "#f2f2f2",
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        to={`/tag/${name}`}
      >
        {tagImage}
      </Link>
      <Link
        to={`/tag/${name}`}
        className="name_details"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: "13.75px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {name}
        </p>
      </Link>
      <button
        onClick={() => handleTopicFollow()}
        style={{
          backgroundColor: iFollow ? "black" : "transparent",
          outline: "transparent",
          border: `1px solid ${iFollow ? "black" : "gray"}`,
          borderRadius: "17px",
          padding: "7px 14px",
          cursor: "pointer",
          marginLeft: "auto",
          color: iFollow ? "white" : "black",
        }}
      >
        {iFollow ? "Following" : "Follow"}
      </button>
    </div>
  );
}
