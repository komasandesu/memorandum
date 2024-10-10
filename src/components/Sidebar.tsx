import { Box, Typography, Chip } from '@mui/material';
import Link from 'next/link';
import SellIcon from '@mui/icons-material/Sell';

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
      }}
    >
      {/* タイトルを固定 */}
      <Typography 
        variant="h6" 
        component="h4" 
        sx={{ 
          mb: 2, 
          position: 'sticky', 
          top: 0, 
          backgroundColor: 'background.paper', // バックグラウンドの色を設定
          zIndex: 2, // 他のコンテンツより上に表示
        }}
      >
        タグ
      </Typography>

      {/* タグリスト */}
      <Box sx={{ 
        overflowY: 'auto', 
        maxHeight: 'calc(80vh - 48px)', // タイトルの高さを引いてリストの高さを制限
        paddingTop: 1, // タグリストの最初にパディングを追加
      }}>
        {tags.map(tag => (
          <Link href={`/tags/${tag}`} passHref key={tag}>
            <Chip
              label={tag}
              icon={<SellIcon sx={{ mr: 0.5, fontSize: 16 }} />} // アイコンを追加
              sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
              color="primary"
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;