import { KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchIcon } from "../assets/icons";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter" && query) {
      const q = query;
      setQuery("");
      navigate(`search/stories/${q}`);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "rgba(250, 250, 250, 1)",
        height: "39px",
        borderRadius: "18px",
        width: "240px",
        justifyContent: "center",
      }}
    >
      {searchIcon}
      <input
        onKeyDown={(e) => handleKeyDown(e)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "75%",
          height: "70%",
          border: "none",
          outline: "transparent",
          backgroundColor: "transparent",
        }}
        type="text"
        placeholder="Search Medium"
      />
    </div>
  );
}
