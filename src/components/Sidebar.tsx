import { Box, Typography, Chip } from '@mui/material';
import Link from 'next/link';

interface SidebarProps {
  tags: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ tags }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        minWidth: 250,
        position: 'sticky', // または 'fixed' 
        top: 0, // スクロール時にトップに固定
        height: '100vh', // 高さを画面全体にする
        overflowY: 'auto', // コンテンツが多い場合にスクロール可能にする
      }}
    >
      <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
        タグ
      </Typography>
      <Box>
        {tags.map(tag => (
          <Link href={`/tags/${tag}`} passHref key={tag}>
            <Chip
              label={tag}
              sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
              color="secondary"
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
