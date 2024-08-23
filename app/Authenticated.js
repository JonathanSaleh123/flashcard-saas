'use client'

import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { CircularProgress, Box } from '@mui/material';
import AppLayout from './AppLayout';

export default function AuthenticatedLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <AppLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  return <>{children}</>;
}