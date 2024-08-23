'use client'

import React from 'react';
import AppLayout from '../AppLayout';
import AuthenticatedLayout from '../Authenticated';
import { useState } from 'react'
import { Container, Box, Typography, AppBar, Button, Toolbar, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import Link from 'next/link';
import App from 'next/app';

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
    <AppLayout>
      <AuthenticatedLayout>
         {/* Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CardDrop
          </Typography>
          <Button color="inherit" href="/" sx={{ mx: 2 }}>
            Home
          </Button>
          <Button color="inherit" href="/generate" sx={{ mx: 2 }}>
            Generate
          </Button>
          <Button color="inherit" href="/flashcards" sx={{ mx: 2 }}>
            Saved Cards
          </Button>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ mx: 2 }}>
              Sign-In
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
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
      </AuthenticatedLayout>
    </AppLayout>
  );
}
