import StoryCard from "./StoryCard";

type TopPicksProps = {
  text: string;
  showImg?: boolean;
};

export default function TopPicks({ text, showImg = false }: TopPicksProps) {
  return (
    <div style={{ width: "90%", marginLeft: "auto" }}>
      <h5
        style={{
          color: "#434343",
          fontFamily: "Questrial",
          fontSize: "14px",
          margin: "12px 8px",
          letterSpacing: "0.55px",
          marginBottom: "22px",
        }}
      >
        {text}
      </h5>
      <div
        className="story_top"
        style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      >
        <StoryCard showImg={showImg} />
        <StoryCard showImg={showImg} />
        <StoryCard showImg={showImg} />
      </div>
    </div>
  );
}
