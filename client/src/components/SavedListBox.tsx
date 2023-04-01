import {} from "react";

export default function SavedListBox() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fafafa",
        borderRadius: "4px",
        border: "2px solid #e2e2e2",
        height: "128px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div className="left_section_list_box" style={{ marginLeft: "22px" }}>
        <h3>Reading list</h3>
        <p style={{ fontSize: "13px" }}>33 stories</p>
      </div>
      <div className="right_images">
        <img
          style={{
            height: "128px",
            marginRight: "-60px",
            position: "relative",
            zIndex: "22",
            borderRight: "2px solid white",
            objectFit: "cover",
          }}
          src="https://miro.medium.com/v2/resize:fill:101:101/1*IWKaeBkpyvI1RN4uMjdfEA.png"
          alt=""
        />
        <img
          style={{
            height: "100%",
            marginRight: "-60px",
            position: "relative",
            zIndex: "9 !important",
            objectFit: "cover",
            borderRight: "2px solid white",
          }}
          src="https://miro.medium.com/v2/resize:fill:149:130/0*UziLdJOwiH8zcO85"
          alt=""
        />
        <img
          style={{ height: "100%", objectFit: "cover" }}
          src="https://miro.medium.com/v2/resize:fill:149:130/1*USEHLI_nAVPV7dwpJSm8cQ.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}
