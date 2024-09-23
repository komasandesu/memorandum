import { AppBar, Toolbar, Typography, Container, IconButton, Box, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from '@mui/icons-material/Menu';
import { PaletteMode } from '@mui/material';
import { useState } from 'react';

interface NavProps {
  toggleMode: () => void;
  currentMode: PaletteMode;
}

const Nav: React.FC<NavProps> = ({ toggleMode, currentMode }) => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev); // 状態をトグルする
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
            {/* ダークモード切替ボタン */}
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={toggleMode}
            >
              {currentMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>


            {/* タイトルを中央に配置 */}
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <Link href="/" passHref style={{ textDecoration: 'none' }}>
                <Typography variant="h5" component="div" sx={{ color: '#FFF8E1' }}>
                  こまの備忘録
                </Typography>
              </Link>
            </Box>

            {/* 右側のメニューボタン（小さい画面用） */}
            <IconButton 
              color="inherit" 
              edge="end" 
              sx={{ 
                display: { xs: 'block', md: 'none' } 
              }} 
              onClick={toggleDrawer} // Drawer の開閉を切り替え
            >
              <MenuIcon />
            </IconButton>

            {/* 右側のリンクボタン（md以上の場合表示） */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, marginLeft: 'auto', alignItems: 'center' }}>
              <IconButton color="inherit" component={Link} href="/bio" passHref >
                <InfoIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://twitter.com/k0masandesu" target="_blank" rel="noopener">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://github.com/komasandesu" target="_blank" rel="noopener">
                <GitHubIcon />
              </IconButton>
            </Box>
          </Toolbar>

        </Container>
      </AppBar>

      {/* メニューをナビゲーションバーの下に表示 */}
      {drawerOpen && (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            padding: 2,
            boxShadow: 2,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <List>
            <ListItemButton component={Link} href="/bio" passHref >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon />
                <ListItemText primary="About me" />
              </Box>
            </ListItemButton>
            <ListItemButton component={Link} href="https://twitter.com/k0masandesu" target="_blank" rel="noopener noreferrer">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TwitterIcon />
                <ListItemText primary="Twitter" />
              </Box>
            </ListItemButton>
            <ListItemButton component={Link} href="https://github.com/komasandesu" target="_blank" rel="noopener noreferrer">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GitHubIcon />
                <ListItemText primary="GitHub" />
              </Box>
            </ListItemButton>
          </List>
        </Box>
      )}
    </>
  );
};

export default Nav;
