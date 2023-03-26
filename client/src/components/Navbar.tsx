import { Link } from "react-router-dom";
import {
  carrotIcon,
  mediumLogo,
  NotificationIcon,
  writeBlogIcon,
} from "../assets/icons";
import { useAuth } from "../contexts/Auth";
import AvatarMenu from "./AvatarMenu";
import Search from "./Search";

export default function Navbar({
  notificationsCount,
}: {
  notificationsCount: number;
}) {
  console.log(notificationsCount);

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
          <Link
            to="/notifications"
            style={{
              color: "rgba(117, 117, 117, 1)",
              textDecoration: "none",
              position: "relative",
            }}
          >
            {NotificationIcon}
            {notificationsCount > 0 && (
              <span
                style={{
                  fontSize: "9.5px",
                  position: "absolute",
                  top: "-15px",
                  right: "-5px",
                  backgroundColor: "#1a8917",
                  color: "white",
                  padding: "3px 3.75px",
                  borderRadius: "4px",
                }}
              >
                {notificationsCount}
              </span>
            )}
          </Link>
        </div>
        <AvatarMenu />
      </div>
    </nav>
  );
}
