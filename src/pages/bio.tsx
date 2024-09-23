import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';
import CodeIcon from '@mui/icons-material/Code';

const Bio: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {/* タイトル */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    自己紹介
                </Typography>
                <Typography variant="body1">
                    こまです。プログラミングとなぞなぞが好きです。
                </Typography>
            </Box>

            {/* 扱うプログラミング言語 */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                    <CodeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    使えるプログラミング言語
                </Typography>
                <Typography variant="body1">
                    競技プログラミングではC++を使用しています。
                    このサイトの作成はNext.js(TypeScript)を使用して作りました。
                    Pythonとかも使います。
                </Typography>
            </Box>

            {/* SNSアカウント */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                    <PublicIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    SNS等のアカウント
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<TwitterIcon />}
                        href="https://twitter.com/k0masandesu"
                        target="_blank"
                        rel="noopener"
                        fullWidth={true} // スマホの場合はボタンをフル幅に
                    >
                        Twitter
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GitHubIcon />}
                        href="https://github.com/komasandesu"
                        target="_blank"
                        rel="noopener"
                        fullWidth={true} // スマホの場合はボタンをフル幅に
                    >
                        GitHub
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        href="https://atcoder.jp/users/komasan"
                        target="_blank"
                        rel="noopener"
                        fullWidth={true} // スマホの場合はボタンをフル幅に
                    >
                        AtCoder
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        href="https://shitforces.herokuapp.com/account/atmosphere"
                        target="_blank"
                        rel="noopener"
                        fullWidth={true} // スマホの場合はボタンをフル幅に
                    >
                        Shitforces
                    </Button>
                </Box>
            </Box>


        </Container>
    );
};

export default Bio;
