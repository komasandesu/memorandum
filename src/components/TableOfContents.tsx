import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number; // h1 = 1, h2 = 2, etc.
}

interface TocProps {
  toc: TocItem[];
}

const TableOfContents: React.FC<TocProps> = ({ toc }) => {
  const [isOpen, setIsOpen] = useState(true); // 目次の開閉状態を管理
  const theme = useTheme(); // テーマを取得

  const generateNumbering = (toc: TocItem[]): string[] => {
    const numbering: string[] = [];
    const counters: number[] = [];

    toc.forEach((heading) => {
      const level = heading.level;
      counters[level - 1] = (counters[level - 1] || 0) + 1;

      for (let i = level; i < counters.length; i++) {
        counters[i] = 0;
      }

      const numberingString = counters.slice(0, level).join('.');
      numbering.push(numberingString + '.');
    });

    return numbering;
  };

  const numbering = generateNumbering(toc);

  return (
    <>
      {isOpen ? ( // 目次が開いているとき
        <Box
          sx={{
            mb: 4,
            border: `1px solid`,
            borderColor: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => setIsOpen(false)}>
                <Typography variant="body1" component="div" >
                    目次
                </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {toc.map((heading, index) => (
              <Box
                key={heading.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: (heading.level - 1) * 2,
                  mb: 1,
                }}
              >
                <Box
                  component="a"
                  href={`#${heading.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Typography variant="body1">
                    {numbering[index]} {heading.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mb: 4,
            border: `1px solid`,
            borderColor: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => setIsOpen(true)} size="small">
              <Typography
                variant="body1"
                component="span"
                sx={{ ml: 1, color: theme.palette.text.primary }}
              >
                目次を表示
              </Typography>
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TableOfContents;
