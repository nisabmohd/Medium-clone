import {} from "react";
import { Link } from "react-router-dom";

type SavedListBoxProps = {
  name: string;
  stories: number;
  images: Array<string>;
  userId: string;
};

export default function SavedListBox({
  name,
  stories,
  images,
  userId,
}: SavedListBoxProps) {
  return (
    <Link
      to={`/user/${userId}/lists?active=${name}`}
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
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="left_section_list_box" style={{ marginLeft: "22px" }}>
        <h3>{name}</h3>
        <p style={{ fontSize: "13px" }}>{stories} stories</p>
      </div>
      <div className="right_images">
        <img
          style={{ height: "130px", maxWidth: "130px", objectFit: "cover" }}
          src={images.at(-1)}
          alt=""
        />
      </div>
    </Link>
  );
}
