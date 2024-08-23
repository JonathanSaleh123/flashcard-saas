'use client'
import React, { useEffect, useState } from 'react';
import AppLayout from '../AppLayout';
import AuthenticatedLayout from '../Authenticated';
import { AppBar, Toolbar, Button, Container, Box, Typography, CircularProgress } from '@mui/material';
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { useSearchParams } from 'next/navigation';
import App from 'next/app';

const ResultPage = () => {
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchCheckoutSession = async () => {
          if (!session_id) return
          try {
            const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
            const sessionData = await res.json()
            if (res.ok) {
              setSession(sessionData)
            } else {
              setError(sessionData.error)
            }
          } catch (err) {
            setError('An error occurred while retrieving the session.')
          } finally {
            setLoading(false)
          }
        }
        fetchCheckoutSession()
      }, [session_id])
      if (error) {
        return (
          <AppLayout>
            <AuthenticatedLayout>
          <Container maxWidth="sm" sx={{textAlign: 'center', mt: 4}}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Container>
          </AuthenticatedLayout>
          </AppLayout>
        )
      }
      if (loading) {
        return (
          <AppLayout>
            <AuthenticatedLayout>
          <Container maxWidth="sm" sx={{textAlign: 'center', mt: 4}}>
            <CircularProgress />
            <Typography variant="h6" sx={{mt: 2}}>
              Loading...
            </Typography>
          </Container>
          </AuthenticatedLayout>
          </AppLayout>
        )
      }
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
      
        <Container sx={{textAlign: 'center', mt: 4}}>
          

          {session.payment_status === 'paid' ? (
            <>
              <Typography variant="h4">Thank you for your purchase!</Typography>
              <Box sx={{mt: 2}}>
                <Typography variant="h6">Session ID: {session_id}</Typography>
                <Typography variant="body1">
                  We have received your payment. You will receive an email with the
                  order details shortly.
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4">Payment failed</Typography>
              <Box sx={{mt: 2}}>
                <Typography variant="body1">
                  Your payment was not successful. Please try again.
                </Typography>
              </Box>
            </>
          )}
        </Container>
        </AuthenticatedLayout>
        </AppLayout>
      )
  }

  export default ResultPage;