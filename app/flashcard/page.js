'use client'

import React, { useState, useEffect } from 'react';
import AppLayout from '../AppLayout';
import AuthenticatedLayout from '../Authenticated';
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { AppBar, Toolbar, Button,Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../utils/firebase";
import App from 'next/app';

export default function Flashcard() {
    const { user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;

            try {
                // Fetch the document containing the flashcard set
                const docRef = doc(db, 'users', user.id, 'flashcardSets', search);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Retrieve the 'flashcards' array from the document
                    const flashcardsArray = docSnap.data().flashcards || [];
                    setFlashcards(flashcardsArray);
                } else {
                    console.log('No flashcards found for this set');
                }
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        }
        getFlashcard();
    }, [search, user]);
    const handleCardClick = (index) => {
        setFlipped((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
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
        <Typography variant="h4" component="div" sx={{ mb: 2 }}> 
                {flashcards.length > 0 ? search : 'Flashcard Set'}
                </Typography>
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.length > 0 ? (
                    flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ 
                                    width: 250, 
                                    height: 200, 
                                    bgcolor: flipped[index] ? 'rgba(0, 0, 240, 0.8)' : 'rgba(0, 0, 139, 0.3)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    backdropFilter: 'blur(10px)', 
                                    color: 'white', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center' 
                                }}>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box>
                                            <Typography variant="h5" component="div">
                                                {flipped[index] ? flashcard.back : flashcard.front}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" component="div" sx={{ mt: 4, textAlign: 'center' }}>
                        No flashcards found for this set.
                    </Typography>
                )}
            </Grid>
        </Container>
            </AuthenticatedLayout>
        </AppLayout>
    );
}
