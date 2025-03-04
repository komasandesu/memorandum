// 必要なインポート（SyntaxHighlighter はここでは不要）
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Youtube from "react-youtube";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Container, Typography, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useTheme } from "@mui/material/styles";
import React, { ReactNode } from "react";

// 他コンポーネントのインポート（例: Button, Math, TagList, TableOfContents）
import { Button, CodeBlock, Math, TagList, TableOfContents } from "../../components";

const BASE_PATH = process.env.BASE_PATH || "";

const LinkRenderer = (props: { href?: string; children?: ReactNode }) => {
  const { href, children } = props;
  const theme = useTheme();
  return (
    <a href={href ?? ""} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <span style={{ color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000", textDecoration: "none" }}>
        {children}
      </span>
    </a>
  );
};

const components = (file_name: string) => ({
  Button,
  Math,
  // MDX 内のコードブロックは pre タグとして渡されるので、CodeBlock でラップする
  pre: (props: { children?: ReactNode; className?: string }) => <CodeBlock {...props} />,
  // インラインコード用
  code: (props: { children?: ReactNode }) => (
    <Typography
      component="code"
      sx={{
        backgroundColor: "rgba(27,31,35,0.05)",
        fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
        padding: "0.2em 0.4em",
        borderRadius: "3px",
        fontSize: "85%",
      }}
    >
      {props.children}
    </Typography>
  ),
  Tweet: ({ id, url }: { id?: string; url?: string }) => {
    const tweetId = id || (url ? url.match(/status\/(\d+)/)?.[1] : undefined);
    return tweetId ? <TwitterTweetEmbed tweetId={tweetId} /> : null;
  },
  Youtube: ({ id, url }: { id?: string; url?: string }) => {
    const videoId = id || (url ? url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1] : undefined);
    return videoId ? <Youtube videoId={videoId} /> : null;
  },
  a: LinkRenderer,
  img: (props: JSX.IntrinsicElements["img"]) => (
    <img {...props} src={`${BASE_PATH}/images/${file_name}/${props.src}`} alt={props.title} style={{ maxWidth: "100%" }} />
  ),
});

interface FrontMatter {
  title: string;
  date: string;
  tags: string[];
}

interface PostPageProps {
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult;
  allTags: string[];
  slug: string;
  toc: { id: string; text: string; level: number }[];
}

const PostPage: React.FC<PostPageProps> = ({ frontMatter: { title, date, tags }, mdxSource, slug, toc }) => {
  const mdxComponents = components(slug);
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h2" component="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <EventIcon sx={{ mr: 0.5, fontSize: 16, color: "primary.main" }} />
          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 30 }}>
            {date}
          </Typography>
        </Typography>
        <TagList tags={tags || []} />
        <Box sx={{ mb: 4 }} />
        <TableOfContents toc={toc} />
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </Container>
    </Box>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".mdx", "") },
  }));
  return { paths, fallback: false };
};

const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const markdownWithMeta = fs.readFileSync(path.join("posts", slug + ".mdx"), "utf-8");
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const headingList: { id: string; text: string; level: number }[] = [];
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeSlug, [rehypeHeadingLinks, headingList], rehypeKatex],
    },
  });
  return { props: { frontMatter, slug, mdxSource, toc: headingList } };
};

import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Element, Properties } from "hast";
import type { Node } from "unist";

interface HeadingNode extends Element {
  tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  properties: Properties;
}

function isHeadingNode(node: Node): node is HeadingNode {
  return node.type === "element" && typeof (node as Element).tagName === "string" && /^h[1-6]$/.test((node as Element).tagName);
}

function rehypeHeadingLinks(headingList: { id: string; text: string; level: number }[]) {
  const headingCounts: Record<string, number> = {};
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (isHeadingNode(node)) {
        const level = parseInt(node.tagName.charAt(1));
        const textContent = toString(node);
        const baseId = (node.properties?.id as string | undefined) || textContent.toLowerCase().replace(/\s+/g, "-");
        let id = baseId;
        if (headingCounts[baseId]) {
          id = `${baseId}-${headingCounts[baseId]}`;
          headingCounts[baseId] += 1;
        } else {
          headingCounts[baseId] = 1;
        }
        if (!node.properties) node.properties = {};
        node.properties.id = id;
        headingList.push({ id, text: textContent, level });
      }
    });
  };
}

export { getStaticProps, getStaticPaths };
export default PostPage;
