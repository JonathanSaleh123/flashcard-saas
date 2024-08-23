'use client'

// import Image from "next/image";
// import styles from "./page.module.css";
import { getStripe } from './utils/get-stripe'
import AppLayout from './AppLayout';
import { useState } from 'react'
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container, Card, CardContent, CardActions, List, ListItem } from '@mui/material'
import { School, FlashOn, Devices } from '@mui/icons-material'; 
import App from 'next/app';
import AuthenticatedLayout from './Authenticated';

const handleSubmit = async () => {
  const checkoutSession = await fetch('/api/checkout_sessions', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000' },
  })
  const checkoutSessionJson = await checkoutSession.json()

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  })

  if (error) {
    console.warn(error.message)
  }
}


export default function Home() {
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

        
        {/* Hero */}
        <Container maxWidth="md">
          <Box sx={{
            textAlign: 'center',
            my: 8,
            p: 4,
            borderRadius: 2,
            boxShadow: '0 0 20px rgba(144, 202, 249, 0.2)',
          }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to CardDrop
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Generate Some fun and interactive flashcards for your needs.
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Get started with our free plan or upgrade to premium for advanced features.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
              Get Started
            </Button>

          </Box>

          {/* Features */}
          <Box sx={{ my: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={4} justifyContent="center">

              <Grid item xs={12} sm={4}>
                <Card sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)', 
                  borderRadius: 2,
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <School sx={{ fontSize: 50, color: '#90caf9', mb: 2 }} /> 
                    <Typography variant="h5" component="div" sx={{mb:2}}>
                      Personalized Learning
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create Custom Flashcards for any subject. Personalize these flashcards even further and tailor them to your learning style.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <FlashOn sx={{ fontSize: 50, color: '#90caf9', mb: 2 }} /> 
                    <Typography variant="h5" component="div" sx={{mb:2}}>
                      Instant AI Flashcard Creation 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uses OpenAI GPT-4o model to generate flashcards instantly. Just enter the text and let the AI do the rest.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Devices sx={{ fontSize: 50, color: '#90caf9', mb: 2 }} />
                    <Typography variant="h5" component="div" sx={{mb:2}}>
                      Multi-Device Syncing and Data Saving
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      By Logging in with Clerk, your flashcards are synced across all your devices. Start on your phone and finish on your laptop.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>


          {/* Pricing */}
          <Box sx={{ my: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
            <Grid container spacing={4} justifyContent="center">

            <Grid item xs={12} sm={4}>
            <Card sx={{
              backgroundColor: 'rgba(100, 200, 250, 0.2)', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)', 
              borderRadius: 2,
            }}>
              <CardContent>
                <Typography variant="h5" component="div">Free Plan</Typography>
                <Typography variant="h2" component="div" sx={{ color: '#ffffff', mt: 2 }}>
                $0
              </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ m: 2,  color: '#ffffff' }}>
                  Basic features for personal use.
                </Typography>
                <List >
                  <ListItem>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>- Limited Generation</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>- Maximum Storage of 10 sets </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>- No further customization</Typography>
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Button size="small" variant="contained" color="primary" href="/generate">Get Started</Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{
              backgroundColor: 'rgba(100, 200, 250, 0.2)', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)', 
              borderRadius: 2,
            }}>
              <CardContent>
                <Typography variant="h5" component="div">Premium Plan</Typography>
                <Typography variant="h2" component="div" sx={{ color: '#ffffff', mt: 2 }}>
                $0.99
              </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ m: 2,  color: '#ffffff' }}>
                  Advance Features, One Time Payment
                </Typography>
                <List >
                  <ListItem>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>- Unlimited generation</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>- Unlimited Sets</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>- More Customization</Typography>
                  </ListItem>
                </List>
              </CardContent>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Button size="small" variant="contained" color="primary" onClick={handleSubmit}>Get Premium</Button>
              </Box>
            </Card>
          </Grid>
            </Grid>
            
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">©2024 CardDrop, Built By Davel and Jonathan. All rights reserved </Typography>
        </Container>
        </AuthenticatedLayout>
    </AppLayout>
  );
}

