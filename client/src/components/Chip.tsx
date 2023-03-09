import { Link } from "react-router-dom";

type LinkProps = {
  text: string;
  style?: any;
};
export default function Chip({ text, style }: LinkProps) {
  return (
    <Link to={`/tags/${text}`} style={{ ...defaultStyle, ...style }}>
      {text}
    </Link>
  );
}

const defaultStyle = {
  textDecoration: "none",
  color: "inherit",
  backgroundColor: "rgba(242, 242, 242, 1)",
  padding: "8px 10px",
  borderRadius: "17px",
  fontSize: "12.5px",
  fontFamily: "Questrial",
};
