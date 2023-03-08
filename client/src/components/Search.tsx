import SearchIcon from "@mui/icons-material/Search";
import { searchIcon } from "../assets/icons";

export default function Search() {
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
