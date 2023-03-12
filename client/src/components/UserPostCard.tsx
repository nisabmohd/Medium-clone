import React from "react";

export default function UserPostCard() {
  return (
    <div
      style={{
        width: "90%",
        marginLeft: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "12px",
      }}
    >
      <img
        style={{
          width: "90px",
          borderRadius: "50%",
          marginBottom: "8px",
          marginLeft: "8px",
        }}
        src="https://miro.medium.com/v2/resize:fill:79:79/1*P6uaAR9_2rfvtxKlNmyGcg.jpeg"
        alt=""
      />
      <p style={{ marginLeft: "8px" }}>Nisabmohd</p>
      <span style={{ color: "gray", marginLeft: "8px" }}>14 Followers</span>
      <p style={{ color: "gray", marginLeft: "8px" }}>
        I am a software engineer with a strong background in full-stack
        development and data structures.
      </p>
      <p
        style={{
          color: "rgba(26, 137, 23, 1)",
          marginLeft: "8px",
          marginTop: "12px",
          fontSize: "13.4px",
        }}
      >
        Edit profile
      </p>
    </div>
  );
}
