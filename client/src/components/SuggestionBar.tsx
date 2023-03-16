import { useState } from "react";
import { Link } from "react-router-dom";
import { plusIcon } from "../assets/icons";
export const OPTIONS = [
  "For you",
  "Following",
  "Reactjs",
  "Javascript",
  "Java",
  "Typescript",
  "NodeJS",
];

export default function SuggestionBar() {
  const [options, setOptions] = useState<Array<any>>([]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "45px",
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        gap: "28px",
        width: "90%",
        marginRight: "auto",
        marginBottom: "12px",
      }}
    >
      {
        <Link
          to="/"
          style={{
            color: "gray",
          }}
        >
          {plusIcon}
        </Link>
      }
      {OPTIONS.map((item) => (
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "gray",
            fontSize: "14px",
            fontFamily: "Questrial",
          }}
          key={item}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
