import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  className?: string;
  children?: React.ReactNode;
};
const CodeBlock: React.FC<Props> = ({ className, children = "" }: Props) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match && match[1] ? match[1] : "";
  const code = String(children).replace(/\n$/, "");
  return (
    <>
      <div>
        <SyntaxHighlighter language={language} style={atomDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeBlock;