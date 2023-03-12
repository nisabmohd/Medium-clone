type StoryCardProps = {
  showImg: boolean;
};

export default function StoryCard({ showImg }: StoryCardProps) {
  return (
    <div style={{ marginLeft: "8px", marginBottom: showImg ? "15px" : "0px" }}>
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
            fontFamily: "Roboto",
            fontSize: "13.95px",
            fontWeight: "500",
            color: "rgb(64 64 64)",
          }}
        >
          Manish Salunke
        </p>
      </div>
      <div
        className="post_details"
        style={{ display: "flex", flexDirection: "row" }}
      >
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
        {showImg && (
          <div className="img">
            <img
              style={{ marginTop: "-12px", width: "51px" }}
              src="https://miro.medium.com/v2/resize:fill:101:101/1*sKKbnXiHhuHwgJxosQLaQQ.png"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
