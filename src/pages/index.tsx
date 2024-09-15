import { Box, Card, CardContent, CardMedia, Typography, Container, Chip, Pagination } from '@mui/material';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Sidebar from '../components/Sidebar'; // インポート
import { useState } from 'react';

interface FrontMatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  thumbnailUrl?: string;
}

interface PostType {
  slug: string;
  frontMatter: FrontMatter;
}

interface HomeProps {
  posts: PostType[];
  tags: string[];
}

const POSTS_PER_PAGE = 10; // 1ページあたりの投稿数

const Home: React.FC<HomeProps> = ({ posts, tags }) => {
  const [page, setPage] = useState<number>(1);

  // ページネーションのための投稿データの計算
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {paginatedPosts.map((post, index) => (
            <Card key={index} sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <CardMedia
                component="img"
                sx={{ width: { xs: '100%', md: 200 }, height: 140, objectFit: 'cover' }}
                image={post.frontMatter.thumbnailUrl || ''}
                alt="thumbnail"
              />
              <CardContent>
                <Link href={`/blog/${post.slug}`} passHref>
                  <Typography variant="h5" component="div">
                    {post.frontMatter.title}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {post.frontMatter.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                  {post.frontMatter.date}
                </Typography>
                <div>
                  {post.frontMatter.tags?.map((tag: string) => (
                    <Link key={tag} href={`/tags/${tag}`} passHref>
                      <Chip label={tag} sx={{ mr: 1, mb: 1, cursor: 'pointer' }} color="primary" />
                    </Link>
                  ))}
                </div>
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
        <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 300px' }, minWidth: 0 }}>
          <Sidebar tags={tags} />
        </Box>
      </Box>
    </Container>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split('.')[0]
    };
  });
  // 投稿を更新日が新しい順にソート
  posts.sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());


  // タグのリストを取得
  const tags = Array.from(new Set(posts.flatMap(post => post.frontMatter.tags || [])));

  return {
    props: {
      posts,
      tags
    }
  };
};

export default Home;
