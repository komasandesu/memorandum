import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box } from '@mui/material';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { PaletteMode } from '@mui/material';

interface NavProps {
  toggleMode: () => void;
  currentMode: PaletteMode;
}

const Nav: React.FC<NavProps> = ({ toggleMode, currentMode }) => {
  return (
    <AppBar 
      position="static" 
      color="primary"
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color="inherit" onClick={toggleMode}>
            {currentMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
          {/* 左側の要素 */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 3 
            }}
          >
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ 
                  flexGrow: 1, 
                  alignSelf: 'flex-end', 
                  textDecoration: 'none', 
                  color: '#FFF8E1' 
                }}
              >
                こまの備忘録
              </Typography>
            </Link>
            <Link href="/bio" passHref>
              <Button color="inherit" sx={{ color: '#FFF8E1' }}>
                About me
              </Button>
            </Link>
          </Box>

          {/* 右側の要素 */}
          <Box>
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
  );
};

export default Nav;
