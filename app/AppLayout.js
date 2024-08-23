'use client'

import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

export default function AppLayout({ children }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 50%, #1a237e 0%, #121212 100%)',
        overflow: 'hidden',
        position: 'relative',
        p:5,
      }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}