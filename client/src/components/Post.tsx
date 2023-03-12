import { moreIcon, mutePost, savePost } from "../assets/icons";
import Chip from "./Chip";

export default function Post() {
  return (
    <div
      style={{
        borderBottom: "solid 1px rgba(242, 242, 242, 1)",
        paddingBottom: "40px",
        width: "90%",
        marginRight: "auto",
      }}
    >
      <div
        className="user_post_details"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          marginBottom: "13px",
        }}
      >
        <img
          style={{ width: "26px", borderRadius: "50%" }}
          src="https://miro.medium.com/v2/resize:fill:79:79/1*59QlNEVxLou5mkeqJANSAA.jpeg"
          alt=""
        />
        <p style={{ fontSize: "15px", fontFamily: "Roboto Slab" }}>
          Antonio Castillo .
        </p>
        <p
          style={{
            fontSize: "13.5px",
            color: "gray",
            fontFamily: "Roboto Slab",
          }}
        >
          Feb 17
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "45px",
        }}
      >
        <div className="left_post">
          <h2 style={{ fontFamily: "Poppins" }}>
            Simple ways to improve your React app performance without useMemo.
          </h2>
          <p
            style={{
              fontSize: "15.25px",
              marginTop: "10px",
              letterSpacing: "0.2px",
              lineHeight: "25px",
              fontFamily: "Roboto Slab",
              color: "rgb(80 80 80)",
            }}
          >
            Sometimes doing less is more, when it comes to optimizing
            performance of a react application a lot of the times this is the
            case,....
          </p>

          <div
            className="actions"
            style={{
              marginTop: "28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="left_actions"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Chip text="Programming" />
              <p style={{ color: "gray", fontSize: "13.25px" }}>4 min read</p>
            </div>
            <div
              className="right_actions"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {savePost}
              </span>
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {mutePost}
              </span>
              <span
                style={{ color: "rgba(117, 117, 117, 1)", cursor: "pointer" }}
              >
                {moreIcon}
              </span>
            </div>
          </div>
        </div>
        <div className="image">
          <img
            style={{ width: "110px" }}
            src="https://miro.medium.com/v2/resize:fill:101:101/1*V_9YbY81qDz2-2pAxd8Y4A.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
