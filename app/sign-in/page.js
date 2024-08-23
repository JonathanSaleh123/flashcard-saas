'use client'

import React from 'react';
import { Container, Box, Typography, AppBar, Button, Toolbar, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

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

export default function SignInPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 50%, #1a237e 0%, #121212 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <Button color="inherit">
              <Link href="/sign-up" passHref>
                Sign Up
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <Box sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: '0 0 20px rgba(144, 202, 249, 0.2)',
            background: 'rgba(30, 30, 30, 0.7)',
          }}>
            <SignIn routing="hash" />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
