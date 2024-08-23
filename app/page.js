'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { getStripe } from './utils/get-stripe'
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container, CssBaseline,  Card, CardContent, CardActions,  List, ListItem, ListItemIcon, ListItemText, ThemeProvider, createTheme } from '@mui/material'

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
export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 50%, #1a237e 0%, #121212 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>
              Flashcard SaaS
            </Typography>
            {/* <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
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
            background: 'rgba(30, 30, 30, 0.7)',
          }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Flashcard SaaS
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              The easiest way to create flashcards from your text.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
              Get Started
            </Button>

          </Box>

          {/* Features */}
          <Box sx={{ my: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">Feature 1</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description of feature 1.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">Feature 2</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description of feature 2.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">Feature 3</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description of feature 3.
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
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">Free Plan</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Basic features for personal use.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary" href="/generate">Get Started</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">Premium Plan</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Advanced features for professionals.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary" onClick={handleSubmit}>Get Started</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

