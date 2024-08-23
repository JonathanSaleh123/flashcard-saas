'use client'

import Image from "next/image";
import styles from "./page.module.css";
// import { getStripe } from './utils/get-stripejs'
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// const handleSubmit = async () => {
//   const checkoutSession = await fetch('/api/checkout_sessions', {
//     method: 'POST',
//     headers: { origin: 'http://localhost:3000' },
//   })
//   const checkoutSessionJson = await checkoutSession.json()

//   const stripe = await getStripe()
//   const {error} = await stripe.redirectToCheckout({
//     sessionId: checkoutSessionJson.id,
//   })

//   if (error) {
//     console.warn(error.message)
//   }
// }

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
            <Button variant="outlined" color="primary" sx={{mt: 2}}>
              Learn More
            </Button>
          </Box>

          <Box sx={{my: 6}}>
            <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
            <Grid container spacing={4}>
              {/* Feature items */}
            </Grid>
          </Box>

          <Box sx={{my: 6, textAlign: 'center'}}>
            <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
            <Grid container spacing={4} justifyContent="center">
              {/* Pricing plans */}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

// export default function Home() {
//   return (
    
//     <AppBar position="static">

//     <Toolbar>
//       <Typography variant="h6" style={{flexGrow: 1}}>
//         Flashcard SaaS
//       </Typography>
//       {/* <SignedOut>
//         <Button color="inherit" href="/sign-in">Login</Button>
//         <Button color="inherit" href="/sign-up">Sign Up</Button>
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn> */}
//     </Toolbar>

//     <Box sx={{textAlign: 'center', my: 4}}>
//     <Typography variant="h2" component="h1" gutterBottom>
//         Welcome to Flashcard SaaS
//       </Typography>
//       <Typography variant="h5" component="h2" gutterBottom>
//         The easiest way to create flashcards from your text.
//       </Typography>
//       <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
//         Get Started
//       </Button>
//       <Button variant="outlined" color="primary" sx={{mt: 2}}>
//         Learn More
//       </Button>
//     </Box>
//     <Box sx={{my: 6}}>
//     <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
//     <Grid container spacing={4}>
//       {/* Feature items */}
//     </Grid>
//   </Box>
// <Box sx={{my: 6, textAlign: 'center'}}>
//   <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
//   <Grid container spacing={4} justifyContent="center">
//     {/* Pricing plans */}
//   </Grid>
// </Box>
//   </AppBar>

//   );
// }
