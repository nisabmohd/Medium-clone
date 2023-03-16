import { Link } from "react-router-dom";
import {
  carrotIcon,
  mediumLogo,
  NotificationIcon,
  writeBlogIcon,
} from "../assets/icons";
import Search from "./Search";

export default function Navbar() {
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
          to="/write"
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
        <div className="notifactionBtn">
          <Link to="/notifications" style={{ color: "rgba(117, 117, 117, 1)" }}>
            {NotificationIcon}
          </Link>
        </div>
        <div
          className="avatar"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <img
            style={{
              width: "32px",
              borderRadius: "50%",
              border: "1px solid #d9d9d9",
            }}
            src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F321231648_737055884314263_7409324859157685571_n.jpg?alt=media&token=6a4311a7-3f0a-4ef8-92cf-3e2fd4aae645"
            alt=""
          />
          <span style={{ color: "rgba(117, 117, 117, 1)" }}>{carrotIcon}</span>
        </div>
      </div>
    </nav>
  );
}

function AvatarDropDown() {
  return <></>;
}
