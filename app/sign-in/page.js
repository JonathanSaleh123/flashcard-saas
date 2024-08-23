import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <Button color="inherit">
              <Link href="/sign-in" passHref>
                Sign In
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{textAlign: 'center', mt: 4}}>
          <Typography variant="h4">Sign Up</Typography>
          <Box sx={{mt: 2}}>
            <SignIn />
          </Box>
        </Container>
      </>
    )
}