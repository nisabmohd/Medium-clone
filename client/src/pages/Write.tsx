import { useEffect, useState } from "react";
import { useAppContext } from "../App";
import TextareaAutosize from "react-textarea-autosize";

export default function Write() {
  const { hideNavbar } = useAppContext();
  const [post, setPost] = useState({ title: "", markdown: "" });

  useEffect(() => {
    hideNavbar(true);
    return () => hideNavbar(false);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        width: "80%",
        margin: "auto",
        marginTop: "3vh",
        gap: "22px",
      }}
    >
      <TextareaAutosize
        onChange={(e) =>
          setPost((prev) => {
            return { ...prev, title: e.target.value };
          })
        }
        placeholder="Title"
        style={{
          width: "100%",
          fontSize: "45px",
          border: "none",
          outline: "transparent",
          resize: "none",
        }}
      />
      <TextareaAutosize
        onChange={(e) =>
          setPost((prev) => {
            return { ...prev, markdown: e.target.value };
          })
        }
        className="hide_scroll"
        placeholder="Tell your story..."
        style={{
          width: "100%",
          fontSize: "20px",
          border: "none",
          outline: "transparent",
          resize: "none",
        }}
      />
    </div>
  );
}
