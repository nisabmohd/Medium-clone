import { Menu } from "@mui/material";
import { useAuth } from "../contexts/Auth";

export default function PostMenu({
  anchorEl,
  handleClose,
  ignoreAuthor,
  open,
  deletePost,
  editPost,
  userId,
}: {
  anchorEl: any;
  open: boolean;
  ignoreAuthor: () => void;
  handleClose: () => void;
  deletePost(): void;
  editPost(): void;
  userId: string;
}) {
  const { user } = useAuth();
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {userId !== user?._id && (
        <div style={{ padding: "8px 18px" }}>
          <p
            onClick={ignoreAuthor}
            style={{
              width: "100%",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Mute this author
          </p>
        </div>
      )}
      {userId === user?._id && (
        <>
          <div style={{ padding: "8px 18px" }}>
            <p
              onClick={editPost}
              style={{
                width: "100%",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Edit story
            </p>
          </div>
          <div style={{ padding: "8px 18px" }}>
            <p
              onClick={deletePost}
              style={{
                width: "100%",
                fontSize: "14px",
                cursor: "pointer",
                color: "#dc4444",
              }}
            >
              Delete story
            </p>
          </div>
        </>
      )}
    </Menu>
  );
}
