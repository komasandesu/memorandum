import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  IconButton, 
  Box, 
} from '@mui/material';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';


const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
            {/* テーマ切替ボタン */}
            <ThemeToggle />


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
              sx={{ display: { xs: 'block', md: 'none' } }}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
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

      <MobileMenu isOpen={isMobileMenuOpen} />
    </>
  );
};

export default Nav;
