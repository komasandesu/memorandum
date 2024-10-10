import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';

interface MenuItem {
  icon: React.ElementType;
  text: string;
  href: string;
  isExternal?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: InfoIcon,
    text: 'About me',
    href: '/bio'
  },
  {
    icon: TwitterIcon,
    text: 'Twitter',
    href: 'https://twitter.com/k0masandesu',
    isExternal: true
  },
  {
    icon: GitHubIcon,
    text: 'GitHub',
    href: 'https://github.com/komasandesu',
    isExternal: true
  }
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: 2,
        boxShadow: 2,
        display: { xs: 'block', md: 'none' },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            href={item.href}
            {...(item.isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer'
            })}
          >
            <item.icon sx={{ mr: 1 }} />
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default MobileMenu;