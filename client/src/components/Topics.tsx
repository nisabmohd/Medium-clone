import Chip from "./Chip";
import { OPTIONS } from "./SuggestionBar";

export default function Topics() {
  return (
    <div style={{ width: "90%", marginLeft: "auto" }}>
      <h5
        style={{
          color: "#434343",
          fontFamily: "Questrial",
          fontSize: "14px",
          margin: "12px 8px",
          letterSpacing: "0.55px",
        }}
      >
        Recommended topics
      </h5>
      <div
        className="chips"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {OPTIONS.map((item) => {
          return (
            <Chip
              style={{
                backgroundColor: "rgb(242, 242, 242)",
                fontFamily: "Questrial",
                padding: "10px 18px",
                margin: "4.5px 3px",
                fontSize: "13.8px",
              }}
              key={item}
              text={item}
            />
          );
        })}
      </div>
    </div>
  );
}
