type UserCardProps = {
  name: string;
  bio?: string;
  _id: string;
  avatar: string;
};
export default function UserCard({ name, _id, avatar, bio }: UserCardProps) {
  return (
    <div
      style={{
        marginLeft: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        margin: "12px 0",
      }}
    >
      <img
        style={{ width: "36px", borderRadius: "50%", marginTop: "-5px" }}
        src={avatar}
        alt=""
      />
      <div className="name_details">
        <p
          style={{
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: "13.75px",
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontSize: "12.75px",
            fontFamily: "Questrial",
            marginTop: "4px",
            lineHeight: "18px",
            color: "#606060",
          }}
        >
          {bio?.slice(0, 62) + "..."}
        </p>
      </div>
      <button
        style={{
          backgroundColor: "transparent",
          outline: "transparent",
          border: "1px solid gray",
          borderRadius: "17px",
          padding: "7px 14px",
          cursor: "pointer",
        }}
      >
        Follow
      </button>
    </div>
  );
}
