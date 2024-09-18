import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Math from '../../components/Math';  // カスタムコンポーネントのインポート
import { Container, Typography, Box, Chip } from '@mui/material';
import { Nav, Button, CodeBlock } from '../../components';
import Link from 'next/link';
import { TwitterTweetEmbed } from 'react-twitter-embed';  // 追加
import Youtube from 'react-youtube';

import { ReactNode } from "react";

const components = {
  Nav,
  Button,
  SyntaxHighlighter,
  Math,  // カスタムコンポーネントを追加
  code: (props: JSX.IntrinsicAttributes & { children?: ReactNode }) => (
    <CodeBlock {...props} />
  ),
  Tweet: ({ id }: { id: string }) => <TwitterTweetEmbed tweetId={id} />,  // 追加
  Youtube: ({ id }: { id: string }) => <Youtube videoId={id} />,  // 追加
};

interface FrontMatter {
  title: string;
  date: string;
  tags: string[];
}

interface PostPageProps {
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult;
  allTags: string[];
}

const PostPage: React.FC<PostPageProps> = ({ frontMatter: { title, date, tags }, mdxSource }) => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h2" component="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          {date}
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map(tag => (
              <Link href={`/tags/${tag}`} passHref key={tag}>
                <Chip
                  label={tag}
                  clickable
                  color="primary"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              </Link>
            ))}
          </Box>
        </Box>

        <MDXRemote {...mdxSource} components={components} />
      </Container>
    </Box>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
};

interface StaticProps {
  params: {
    slug: string;
  };
}

const getStaticProps = async ({ params: { slug } }: StaticProps) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8');

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
