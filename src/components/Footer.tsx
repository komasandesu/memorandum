import React from 'react';
import { AppBar, Typography, Container, Box } from '@mui/material';

const Footer = () => {
    return (
        <AppBar
          color="primary"
          component="footer"
          position="static"
          sx={{ 
            marginTop: 'auto',
            gap: 3 ,
            padding: '24px', // パディングを増やして余白を確保
           }}
        >
            <Container maxWidth="lg">
                <Box
                    display='flex'
                    
                    justifyContent={'space-between'}
                    sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 3 ,
                    }}
                >
                    <Box>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Footer
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </AppBar>
      );
};

export default Footer;
