import MarkdownCompiler from "markdown-to-jsx";
import Syntax from "./Syntax";

type MarkdownProps = {
  children: string;
};

export default function Markdown({ children }: MarkdownProps) {
  return (
    <MarkdownCompiler
      options={{
        forceBlock: true,
        overrides: {
          code: {
            component: Syntax,
            props: {
              className: "code",
            },
          },
        },
      }}
    >
      {children}
    </MarkdownCompiler>
  );
}
