// _app.tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import { Nav, Footer } from '../components';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });


  return (
    <>
      <Head>
        <title>こまの備忘録</title>
        <link rel="icon" href={`${process.env.BASE_PATH || ''}/favicon.ico`} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI のデフォルトスタイリングをリセット */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          <main style={{ flexGrow: 1, marginBottom: '32px' }}> {/* フッター用の余白 */}
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
