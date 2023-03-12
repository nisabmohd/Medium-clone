import React from "react";
import {
  copyurlIcon,
  facebookIcon,
  linkedinIcon,
  moreIcon,
  savePost,
  twitterIcon,
} from "../assets/icons";

export default function PostAuthor() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "22px",
        marginTop: "18px",
      }}
    >
      <div
        className="author_post_details"
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img
          style={{ width: "50px", borderRadius: "50%" }}
          src="https://miro.medium.com/v2/resize:fill:79:79/1*P6uaAR9_2rfvtxKlNmyGcg.jpeg"
          alt=""
        />
        <div
          className="details-sameline"
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Nisabmohd</p>
          <div
            className="sameline"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <p style={{ fontSize: "13px", color: "gray" }}> Dec 22, 2022 </p>
            <p style={{ fontSize: "13px", color: "gray" }}>3 min read</p>
          </div>
        </div>
      </div>
      <div
        className="shareIcons"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <div
          className="oneSide"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={iconStyle}>{twitterIcon}</span>
          <span style={iconStyle}>{facebookIcon}</span>
          <span style={iconStyle}>{linkedinIcon}</span>
          <span style={iconStyle}>{copyurlIcon}</span>
        </div>
        <div
          className="other_side"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={iconStyle}>{savePost}</span>
          <span style={iconStyle}>{moreIcon}</span>
        </div>
      </div>
    </div>
  );
}

const iconStyle = {
  cursor: "pointer",
  color: "gray",
};
