import Post from "../components/Post";
import SuggestionBar from "../components/SuggestionBar";
import Topics from "../components/Topics";
import TopPicks from "../components/TopPicks";
import WhoToFollow from "../components/WhoToFollow";

export default function Home() {
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
        <SuggestionBar />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
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
        <TopPicks text="Top Picks" />
        <Topics />
        <WhoToFollow />
      </div>
    </div>
  );
}
