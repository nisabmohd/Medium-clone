import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

type SyntaxProps = {
  children: any;
};
export default function Syntax({ children }: SyntaxProps) {
  return (
    <div
      style={{
        margin: "20px 0",
        fontSize: "13.85px",
        lineHeight: "27px",
        fontFamily: "Roboto Slab",
      }}
    >
      <SyntaxHighlighter language="javascript" style={oneLight}>
        {children[0] ?? ""}
      </SyntaxHighlighter>
    </div>
  );
}
