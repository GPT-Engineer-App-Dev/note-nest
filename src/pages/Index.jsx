import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  useToast,
  VStack,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="lg" bg="white">
    <Text mb={2}>{note.text}</Text>
    <Flex justifyContent="space-between">
      <IconButton icon={<FaEdit />} onClick={() => onEdit(note)} aria-label="Edit note" />
      <IconButton icon={<FaTrash />} onClick={() => onDelete(note.id)} aria-label="Delete note" />
    </Flex>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();
  const gridTemplateColumns = useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' });

  const addNote = () => {
    if (input.trim() === '') {
      toast({
        title: 'Error',
        description: "Note can't be empty",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = { id: Date.now(), text: input };
    setNotes([...notes, newNote]);
    setInput('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <VStack p={8} spacing={8}>
      <Input
        placeholder="Add a new note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
      />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNote}>
        Add Note
      </Button>
      <Grid templateColumns={gridTemplateColumns} gap={6} w="full">
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </Grid>
    </VStack>
  );
};

export default Index;