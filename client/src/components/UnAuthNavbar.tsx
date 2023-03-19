import { Link } from "react-router-dom";
import { DEFAULT_IMG } from "../App";
import {
  carrotIcon,
  mediumLogo,
  NotificationIcon,
  writeBlogIcon,
} from "../assets/icons";
import AvatarMenu from "./AvatarMenu";
import Search from "./Search";

export default function UnAuthNavbar() {
  return (
    <nav
      style={{
        height: "56px",
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="left"
        style={{
          marginLeft: "23px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "17px",
        }}
      >
        <Link to="/">{mediumLogo}</Link>
        <Search />
      </div>
      <div
        className="right"
        style={{
          marginRight: "25px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
          height: "100%",
        }}
      >
        <Link
          to="/signin/write"
          className="writeBtn"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "gray",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "rgba(117, 117, 117, 1)" }}>
            {writeBlogIcon}
          </span>
          <p style={{ fontSize: "14.5px", marginTop: "-4px" }}>Write</p>
        </Link>
        <div
          className="btns"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link
            to="/signin/new"
            style={{
              backgroundColor: "#1a8917",
              color: "white",
              border: "none",
              outline: "none",
              borderRadius: "17px",
              padding: "8px 12px",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
          <Link
            to="/signin/in"
            style={{
              border: "none",
              outline: "transparent",
              background: "transparent",
              borderRadius: "17px",
              padding: "8px 12px",
              color: "gray",
              marginRight: "-5px",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        </div>
        <AvatarMenu />
      </div>
    </nav>
  );
}

function AvatarDropDown() {
  return <></>;
}
