import { Box, Card, CardContent, CardMedia, Typography, Container, Chip, Pagination } from '@mui/material';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useEffect, useState } from 'react';

const BASE_PATH = process.env.BASE_PATH || ''; //サムネイル用

interface PostType {
    slug: string;
    frontMatter: {
        title: string;
        description: string;
        date: string;
        tags: string[];
        thumbnailUrl: string;
    };
}

interface TagPageProps {
    posts: PostType[];
    tag: string;
}

const POSTS_PER_PAGE = 10; // 1ページあたりの投稿数

const TagPage: React.FC<TagPageProps> = ({ posts, tag }) => {
  const [page, setPage] = useState<number>(1);
  const [paginatedPosts, setPaginatedPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    setPaginatedPosts(posts.slice(startIndex, startIndex + POSTS_PER_PAGE));
  }, [page, posts]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" gutterBottom>
        タグ 「{tag}」 がついている投稿一覧です。
        </Typography>
        {paginatedPosts.length > 0 ? (
          <Box>
            {paginatedPosts.map((post) => (
              <Card 
                key={post.slug} 
                sx={{ 
                  mb: 3, 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }
                }}
              >
                <Link href={`/blog/${post.slug}`} passHref>
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', md: 200 }, 
                      height: 170, 
                      objectFit: 'cover', // 画像のアスペクト比を維持しつつ、カードのサイズにフィットさせる
                      margin: 0, // マージンをゼロに設定
                      padding: 0 // パディングもゼロに設定
                    }}
                    image={`${BASE_PATH}/thumbnails/${post.frontMatter.thumbnailUrl || 'default-thumbnail.png'}`}
                    alt="thumbnail"
                  />
                </Link>
              
                <CardContent 
                  sx={{ 
                    overflowX: 'auto', 
                    overflowY: 'hidden', 
                    maxHeight: 300,
                  }}
                > {/* 高さを制限し、オーバーフロー時にスクロール可能に */}
                  <Link href={`/blog/${post.slug}`} passHref style={{ textDecoration: 'none' }}>
                    <Typography 
                      variant="h5" 
                      component="div"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {post.frontMatter.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.frontMatter.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                    {post.frontMatter.date}
                  </Typography>
              
                  {/* タグの実装 */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'nowrap', // 改行を防止
                      overflowX: 'auto', // 横方向にスクロールを有効にする
                      overflowY: 'hidden', // 横方向にスクロールを有効にする
                      width: '100%', // 幅を100%に設定
                      padding: 1,
                      height: 40, // 高さを固定することでタグの有無で幅が変わらないようにする
                    }}
                  >
                    {post.frontMatter.tags?.map((tag: string) => (
                      <Link key={tag} href={`/tags/${tag}`} passHref>
                        <Chip label={tag} sx={{ marginRight: 1 }} color="primary" />
                      </Link>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(posts.length / POSTS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">No posts found for this tag.</Typography>
        )}
      </Box>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const tags: string[] = [];

  files.forEach((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    if (frontMatter.tags) {
      tags.push(...frontMatter.tags);
    }
  });

  const uniqueTags = Array.from(new Set(tags));

  const paths = uniqueTags.map(tag => ({
    params: { tag }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
      const { data: frontMatter } = matter(markdownWithMeta);
      return {
        frontMatter,
        slug: filename.split('.')[0]
      };
    })
    .filter(post => post.frontMatter.tags.includes(params!.tag as string));

    
  // 投稿を更新日が新しい順にソート
  posts.sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());

  return {
    props: {
      posts,
      tag: params!.tag
    }
  };
};

export default TagPage;