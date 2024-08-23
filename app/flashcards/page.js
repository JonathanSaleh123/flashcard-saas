'use client'

import React, { useState, useEffect } from 'react';
import AppLayout from '../AppLayout';
import AuthenticatedLayout from '../Authenticated';
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppBar, Toolbar, Button, Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "../utils/firebase";
import App from 'next/app';

export default function Flashcard() {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
      async function getFlashcards() {
          if (!user) return;

          const docRef = doc(db, 'users', user.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              const userFlashcards = docSnap.data().flashcardSets || [];
              setFlashcards(userFlashcards);
          } else {
              console.log("No flashcards found");
          }
      }
      getFlashcards();
  }, [user]);

  const handleCardClick = (id) => {
      router.push(`/flashcard?id=${id}`);
  };

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

      <Container maxWidth="md">

          <Grid container spacing={3} sx={{ mt: 4 }}>
              {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ 
                    width: 250, 
                    height: 200, 
                    bgcolor:  'rgba(0, 0, 139, 0.3)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)', 
                    color: 'white', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                          <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                              <CardContent>
                                  <Typography variant="h5" component="div">
                                      {flashcard.name}
                                  </Typography>
                              </CardContent>
                          </CardActionArea>
                      </Card>
                  </Grid>
              ))}
          </Grid>
      </Container>
      </AuthenticatedLayout>
    </AppLayout>
  );
}