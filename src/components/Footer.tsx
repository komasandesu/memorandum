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
            padding: '24px', // パディングを増やして余白を確保
           }}
        >
            <Container maxWidth="lg">
                <Box
                    display='flex'
                    justifyContent='space-between'  // 要素を左右に配置
                    alignItems='center'              // 要素を縦方向に中央揃え
                    sx={{
                        display: 'flex', 
                        flexDirection: 'row', // 横に配置
                        gap: 2, // 要素間に余白を追加
                    }}
                >
                    <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ 
                            fontSize: 'medium',
                            justifyContent: 'center',
                            textAlign: 'center', // テキストを中央に配置
                            flexGrow: 1, // テキストを真ん中に寄せるために成長させる
                        }}
                    >
                        © 2024 koma.
                    </Typography>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={scrollToTop}
                        // startIcon={<ArrowUpwardIcon />} // ボタンにアイコンを追加
                        sx={{ 
                            marginLeft: 'auto', // ボタンを右に寄せる
                        }}
                    >
                        {<ArrowUpwardIcon />}
                    </Button>
                </Box>
            </Container>
        </AppBar>
      );
};

export default Footer;
