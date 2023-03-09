export default function StoryCard() {
  return (
    <div style={{ marginLeft: "8px" }}>
      <div
        className="firstLine"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img
          style={{ width: "22px", borderRadius: "50%" }}
          src="https://miro.medium.com/v2/resize:fill:176:176/1*o4o2K-ND_COV5CXRaNorig@2x.jpeg"
          alt=""
        />
        <p
          style={{
            fontFamily: "Questrial",
            fontSize: "14.5px",
            fontWeight: "500",
            color: "#514e4e",
          }}
        >
          Manish Salunke
        </p>
      </div>
      <div className="post_details">
        <p
          style={{
            fontFamily: "Poppins",
            fontWeight: "bolder",
            fontSize: "14px",
            marginTop: "8px",
          }}
        >
          Functional Programming with React and Redux
        </p>
      </div>
    </div>
  );
}
