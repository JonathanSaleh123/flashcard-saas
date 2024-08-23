'use client'

import { useState } from 'react'
import AppLayout from '../AppLayout';
import AuthenticatedLayout from '../Authenticated';
import {
  AppBar,
  Container,
  TextField,
  Button,
  Typography,
  Toolbar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress
} from '@mui/material'
import { doc, collection, getDoc, writeBatch } from "firebase/firestore"
import { db } from "../utils/firebase"
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [flipped, setFlipped] = useState({})
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)

      const batch = writeBatch(db)

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }

      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })

      await batch.commit()

      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    } finally{
      setLoading(false)
    }
  }

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
      <Box sx={{ my: 4 }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>

        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2}}  
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
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
                            <Typography variant="h6" align='center'>
                                {flipped[index] ? flashcard.back : flashcard.front}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Box>
        )}
        {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Save Flashcards
            </Button>
        </Box>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
            Save
            </Button>
        </DialogActions>
        </Dialog>
    </Container>
    </AuthenticatedLayout>  
    </AppLayout>
  )
}
