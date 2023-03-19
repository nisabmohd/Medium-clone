import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { plusIcon } from "../assets/icons";
import { url } from "../baseUrl";
import { useAuth } from "../contexts/Auth";
import { httpRequest } from "../interceptor/axiosInterceptor";

const DEFAULT_OPTIONS = [
  {
    id: 1,
    title: "For you",
    url: "/",
  },
  {
    id: 2,
    title: "Following",
    url: "/tag/Following",
  },
];

export default function SuggestionBar({ activeTab }: { activeTab: string }) {
  const { user } = useAuth();
  const { data: response } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/intrests`),
    queryKey: ["intrests", "get", user?._id],
  });
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  return (
    <div
      className="hide_scroll"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "30px",
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        gap: "28px",
        width: "90%",
        marginRight: "auto",
        marginBottom: "12px",
        overflowX: "auto",
        marginTop: "12px",
      }}
    >
      <>
        {
          <Link
            to="/intrests/add"
            style={{
              color: "gray",
              height: "100%",
              marginTop: "-6px",
            }}
          >
            {plusIcon}
          </Link>
        }
        {options.map((option) => {
          return (
            <Link
              to={`${option.url}`}
              style={{
                textDecoration: "none",
                color: activeTab === option.title ? "black" : "gray",
                fontSize: "14px",
                fontFamily: "Questrial",
                whiteSpace: "nowrap",
                borderBottom:
                  activeTab === option.title ? "2px solid black" : "none",
                height: activeTab === option.title ? "94%" : "98%",
                zIndex: "99",
                padding: "0 2px",
              }}
              key={option.id}
            >
              {option.title}
            </Link>
          );
        })}
        {response?.data.intrests.map((item: string) => {
          return (
            <Link
              to={`/tag/${item}`}
              style={{
                textDecoration: "none",
                color: activeTab === item ? "black" : "gray",
                fontSize: "14px",
                fontFamily: "Questrial",
                whiteSpace: "nowrap",
                borderBottom: activeTab === item ? "2px solid black" : "none",
                height: activeTab === item ? "94%" : "98%",
                zIndex: "99",
                padding: "0 2px",
              }}
              key={item}
            >
              {item}
            </Link>
          );
        })}
      </>
    </div>
  );
}
