'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../utils/firebase";

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
        <Container maxWidth="md">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.length > 0 ? (
                    flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
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
    );
}
