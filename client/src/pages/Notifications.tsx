import React from "react";
import Topics from "../components/Topics";
import TopPicks from "../components/TopPicks";
import WhoToFollow from "../components/WhoToFollow";

export default function Notifications() {
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
          style={{
            width: "90%",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <div
            className="upperline"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "78px",
              marginTop: "12px",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>{"Notifications"}</h1>
          </div>
          {/*  */}
        </div>
      </div>
      <div
        className="rightbar"
        style={{
          width: "31%",
          paddingTop: "3vh",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
        }}
      >
        <TopPicks text="Top picks" />
        <Topics />
        <WhoToFollow />
      </div>
    </div>
  );
}
