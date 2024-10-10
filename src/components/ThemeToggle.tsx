import { IconButton, Menu, MenuItem } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';

const ThemeToggle = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    handleMenuClose();
  };

  if (!mode) return null;

  const ThemeIcon = {
    light: LightModeIcon,
    dark: DarkModeIcon,
    system: SettingsBrightnessIcon
  }[mode];

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        aria-label="Change theme"
      >
        <ThemeIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleThemeChange('light')}>
          <LightModeIcon sx={{ mr: 1 }} /> Light
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('dark')}>
          <DarkModeIcon sx={{ mr: 1 }} /> Dark
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('system')}>
          <SettingsBrightnessIcon sx={{ mr: 1 }} /> System
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle;