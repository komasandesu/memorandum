// _app.tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import type { AppProps } from 'next/app';
import { PaletteMode } from '@mui/material';
import { useMediaQuery } from '@mui/material';

// MUIのテーマを作成する関数
const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#68ACD1', // ダークモード時は明るい青
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1', // ダークモード時は明るいピンク
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff', // ライトモード時は黒、ダークモード時は白
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212', // ダークモード時の背景色
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e', // ダークモード時のカード色
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'inherit', // リンクの色を親要素から継承
            textDecoration: 'none', // デフォルトのリンク装飾をなくす
            '&:hover': {
              textDecoration: 'underline', // ホバー時の下線
            },
          },
        },
      },
    },
  });

export default function App({ Component, pageProps }: AppProps) {
  // クライアントサイドでのみ実行されるフラグ
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドかどうかをチェック
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ユーザーのデフォルト設定に基づくモード（システムのダークモード設定を取得）
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // ダークモードを切り替えるための状態管理（初期モードをユーザーの設定に基づいて決定）
  const [mode, setMode] = useState<PaletteMode>('light'); // 初期状態はライトに設定

  // クライアントサイドでのみ、ユーザーの設定に基づいてモードを決定
  useEffect(() => {
    if (isClient) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode, isClient]);

  // モードを切り替える関数
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // テーマをメモ化してパフォーマンスを最適化
  const theme = useMemo(() => createAppTheme(mode), [mode]);


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
          <Nav toggleMode={toggleMode} currentMode={mode} />
          <main style={{ flexGrow: 1, marginBottom: '32px' }}> {/* フッター用の余白 */}
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
