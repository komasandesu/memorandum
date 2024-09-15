import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@mui/material"; // MUIのボタンを使用

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const CodeBlock: React.FC<Props> = ({ className, children = "" }: Props) => {
  const [isCopied, setIsCopied] = useState(false); // コピー状態を管理
  const match = /language-(\w+)/.exec(className || "");
  const language = match && match[1] ? match[1] : "";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2秒後にコピー状態をリセット
    });
  };

  return (
    <div style={{ position: "relative" }}>
      {/* コピーボタン */}
      <Button
        variant="contained"
        size="small"
        onClick={handleCopy}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        {isCopied ? "Copied!" : "Copy"}
      </Button>
      {/* コード表示 */}
      <SyntaxHighlighter language={language} style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
