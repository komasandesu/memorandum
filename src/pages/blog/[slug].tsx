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

import { useState, useEffect } from 'react';

import { ReactNode } from "react";


const BASE_PATH = process.env.BASE_PATH || ''; //画像用

const LinkRenderer = (props: { href?: string; children?: ReactNode }) => {
  const { href, children } = props;

  // 通常のリンクとして扱う
  return (
    <a
      href={href ?? ''}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Typography
        component="span"
        sx={{
          color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {children}
      </Typography>
    </a>
  );
};

const extractYoutubeId = (url: string): string | undefined => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
};

const extractTweetId = (url: string): string | undefined => {
  const regex = /(twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/;
  const match = url.match(regex);
  return match ? match[4] : undefined;
};

const components = (file_name: string) => ({
  Nav,
  Button,
  SyntaxHighlighter,
  Math,
  code: (props: JSX.IntrinsicAttributes & { children?: ReactNode; className?: string }) => (
    <CodeBlock {...props} />
  ),
  Tweet: ({ id, url }: { id?: string; url?: string }) => {
    // IDまたはURLのいずれかが指定されている場合に対応
    const tweetId = id || (url ? extractTweetId(url) : undefined);
    return tweetId ? <TwitterTweetEmbed tweetId={tweetId} /> : null;
  },
  Youtube: ({ id, url }: { id?: string; url?: string }) => {
    // IDまたはURLのいずれかが指定されている場合に対応
    const videoId = id || (url ? extractYoutubeId(url) : undefined);
    return videoId ? <Youtube videoId={videoId} /> : null;
  },
  a: LinkRenderer,  // aタグの代わりにLinkRendererコンポーネントを使用
  img: (props: JSX.IntrinsicElements['img']) => (
    <img {...props} src={`${BASE_PATH}/images/${file_name}/${props.src}`} alt={props.title} style={{ maxWidth: '100%' }} />
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
}

const PostPage: React.FC<PostPageProps> = ({ frontMatter: { title, date, tags }, mdxSource, slug }) => {
  const mdxComponents = components(slug); // 画像フォルダ名をmdxファイル名と同じにする
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

        <MDXRemote {...mdxSource} components={mdxComponents} />
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
