import StoryCard from "./StoryCard";

export default function TopPicks() {
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
        Top Picks
      </h5>
      <div
        className="story_top"
        style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      >
        <StoryCard />
        <StoryCard />
        <StoryCard />
      </div>
    </div>
  );
}
