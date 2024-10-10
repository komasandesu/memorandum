// components/TagList.tsx
import { Box, Chip } from '@mui/material';
import Link from 'next/link';
import SellIcon from '@mui/icons-material/Sell';

interface TagListProps {
  tags: string[]; // undefined を除外
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        width: '100%',
        padding: 1,
        position: 'relative', // スクロールバーと被らないようにするためのスタイル
        '&::-webkit-scrollbar': {
          height: '8px', // スクロールバーの高さを指定
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // スクロールバーの色
          borderRadius: '4px', // スクロールバーの角を丸くする
        },
      }}
    >
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${tag}`} passHref>
          <Chip 
            label={tag} 
            icon={<SellIcon sx={{ mr: 0.5, fontSize: 16 }} />} // アイコンを追加
            sx={{ marginRight: 1 }} 
            color="primary" 
          />
        </Link>
      ))}
    </Box>
  );
};

export default TagList;
