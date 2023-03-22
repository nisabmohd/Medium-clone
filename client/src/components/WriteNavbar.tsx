import { Link } from "react-router-dom";
import { mediumLogo, moreIcon, NotificationIcon } from "../assets/icons";
import AvatarMenu from "./AvatarMenu";

type WriteNavType = {
  onClick(): void;
  disabled: boolean;
  buttonText: string;
};

export default function WriteNavbar({
  onClick,
  disabled,
  buttonText,
}: WriteNavType) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
      }}
    >
      <div className="left_write_nav">
        <Link to="/">{mediumLogo}</Link>
      </div>
      <div
        className="right_write_nav"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* cbe4ca */}
        <button
          disabled={disabled}
          onClick={() => {
            !disabled && onClick();
          }}
          style={{
            color: "white",
            backgroundColor: disabled ? "#cbe4ca" : "#1a8917",
            border: "none",
            outline: "none",
            padding: "6px 12px",
            borderRadius: "15px",
            letterSpacing: "0.2px",
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>
        <span style={{ color: "gray", cursor: "pointer" }}>{moreIcon}</span>
        <Link to="/notifications">
          <span style={{ color: "gray", cursor: "pointer" }}>
            {NotificationIcon}
          </span>
        </Link>
        <AvatarMenu />
      </div>
    </div>
  );
}
