import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import { useEffect } from "react";
import Markdown from "../components/Markdown";
import Chip from "../components/Chip";

export default function Post() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/${id}`),
    queryKey: ["blog", id],
  });
  if (error) return <p>{error.toString()}</p>;
  if (isLoading) return <p>Loading ...</p>;

  document.title = data!.data.title;
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
          className="post_content"
          style={{
            width: "90%",
            marginRight: "auto",
          }}
        >
          <h1
            style={{
              fontWeight: "bolder",
              fontFamily: "Poppins",
              fontSize: "32px",
            }}
          >
            {data?.data.title}
          </h1>
          <div className="markdown">
            <Markdown>{data?.data.markdown}</Markdown>
          </div>
          <div
            className="bottomScreen"
            style={{
              marginTop: "60px",
            }}
          >
            <div className="relatedTags">
              {data?.data.tags.map((item: string) => {
                return (
                  <Chip
                    key={item}
                    style={{
                      backgroundColor: "rgb(242, 242, 242)",
                      fontFamily: "Questrial",
                      padding: "10px 18px",
                      margin: "4.5px 3px",
                      fontSize: "13.8px",
                    }}
                    text={item}
                  />
                );
              })}
            </div>
            <div className="post_reach"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
