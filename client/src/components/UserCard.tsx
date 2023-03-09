export default function UserCard() {
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
        src="https://miro.medium.com/v2/resize:fill:176:176/1*UE3dW9kYPqYw5uaDS04iBg.jpeg"
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
          Sergio Pereira
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
          Entrepreneur | CTO | Remote Work Lover. Writing daily on..
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
