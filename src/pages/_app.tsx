// import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Head from 'next/head';
import Nav from '../components/Nav';
import type { AppProps } from 'next/app';

// MUIのテーマを作成します
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // メインカラーを変更できます
    },
    secondary: {
      main: '#dc004e', // セカンダリーカラーを変更できます
    },
    background: {
      default: '#f5f5f5', // デフォルト背景色を変更できます
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>こまの備忘録</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI のデフォルトスタイリングをリセットします */}
        <div>
          <Nav />
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
