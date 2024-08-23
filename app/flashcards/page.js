'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "../utils/firebase";

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
      <Container maxWidth="md">
          <Grid container spacing={3} sx={{ mt: 4 }}>
              {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
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
  );
}