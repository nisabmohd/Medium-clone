import UserCard from "./UserCard";

export default function WhoToFollow() {
  return (
    <div style={{ width: "90%", marginLeft: "auto" }}>
      <h5
        style={{
          color: "#434343",
          fontFamily: "Questrial",
          fontSize: "14px",
          margin: "12px 8px",
          letterSpacing: "0.55px",
          marginBottom: "18px",
        }}
      >
        Who to follow
      </h5>
      <div
        className="users_cards"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
