import React from 'react';
import { AppBar, Typography, Container, Box, Button  } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // 上向きのアイコン

const Footer = () => {
    // ページトップへスクロールする関数
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // スムーズにスクロール
        });
    };

    return (
        <AppBar
          color="primary"
          component="footer"
          position="static"
          sx={{ 
            marginTop: 'auto',
            padding: '24px',
           }}
        >
            <Container maxWidth="lg">
                <Box
                    display='flex'
                    justifyContent='space-between'  // 左右に配置
                    alignItems='center'
                    sx={{
                        flexDirection: 'row', // 横に配置
                        gap: 2,
                    }}
                >
                    <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                            fontSize: 'medium',
                            textAlign: 'left', // テキストを左寄せ
                        }}
                    >
                        © 2024 koma.
                    </Typography>

                    <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        onClick={scrollToTop}
                        sx={{ 
                            marginLeft: 'auto', // ボタンを右に寄せる
                        }}
                    >
                        <ArrowUpwardIcon />
                    </Button>
                </Box>
            </Container>
        </AppBar>
      );
};

export default Footer;
