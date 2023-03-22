import { Link } from "react-router-dom";
import mmm from "../../assets/mmm.png";

export default function Hero() {
  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        backgroundColor: "#ffc017",
        borderBottom: "1px solid black",
        position: "relative",
      }}
    >
      <div
        className="container_70"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          className="left_hero"
          style={{ display: "flex", flexDirection: "column", gap: "42px" }}
        >
          <p style={{ fontSize: "100px", fontFamily: "DM Serif Display" }}>
            Stay curious.
          </p>
          <p style={{ fontSize: "30px", width: "60%" }}>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <Link
            to="/signin/new"
            style={{
              backgroundColor: "black",
              color: "white",
              border: "none",
              outline: "none",
              borderRadius: "37px",
              padding: "14px 32px",
              fontSize: "20px",
              textDecoration: "none",
              width: "fit-content",
              fontWeight: "bold",
            }}
          >
            Start reading
          </Link>
        </div>
        <div className="right_hero">
          <img
            style={{
              height: "95%",
              marginLeft: "auto",
              position: "absolute",
              right: 0,
              top: 0,
              padding: "15px 0",
            }}
            src={mmm}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
