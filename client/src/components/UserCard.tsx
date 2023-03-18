import { Link } from "react-router-dom";

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
      <Link to={`/user/${_id}`}>
        <img
          style={{ width: "36px", borderRadius: "50%", marginTop: "-5px" }}
          src={
            avatar ??
            "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a"
          }
          alt=""
        />
      </Link>
      <div className="name_details">
        <Link
          to={`/user/${_id}`}
          style={{
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: "13.75px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {name}
        </Link>
        <p
          style={{
            fontSize: "12.75px",
            fontFamily: "Questrial",
            marginTop: "4px",
            lineHeight: "18px",
            color: "#606060",
          }}
        >
          {bio && (bio.length > 62 ? bio?.slice(0, 62) + "..." : bio)}
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
          marginLeft: "auto",
        }}
      >
        Follow
      </button>
    </div>
  );
}
