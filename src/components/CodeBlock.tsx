import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button, Tooltip, Box } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const CodeBlock: React.FC<Props> = ({ className, children = "" }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  // childrenがReact要素の場合は、props.childrenから取得
  const codeContent = React.isValidElement(children)
    ? children.props.children
    : children;

  // childrenがReact要素の場合は、props.classNameから取得
  const codeClassName = React.isValidElement(children)
    ? children.props.className
    : className;

  // classNameから言語とファイル名を取得
  const match = /language-(\w+)(?::(.+))?/.exec(codeClassName || "");
  const language = match && match[1] ? match[1] : "";
  const filename = match && match[2] ? match[2] : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Box sx={{ position: "relative", mt: 2, p: 1, borderRadius: "4px", backgroundColor: "#2d2d2d" }}>
      {/* 高さを揃えるためのBox */}
      <Box
        sx={{
          fontWeight: "bold",
          color: "#ccc",
          mb: 1,
          ml: 1,
        }}
      >
        {filename || <span>&nbsp;</span>} {/* ファイル名がない場合は空のスペースを表示 */}
      </Box>

      {/* コピーボタンをアイコン形式に変更 */}
      <Tooltip title={isCopied ? "Copied!" : "Copy"}>
        <Button
          variant="contained"
          size="small"
          onClick={handleCopy}
          sx={{
            position: "absolute",
            top: "5px",
            right: "10px",
            backgroundColor: "#555",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#444"
            },
            mr: 1,
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </Button>
      </Tooltip>

      {/* コード表示 */}
      <SyntaxHighlighter language={language} style={atomDark}>
        {codeContent}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock;
