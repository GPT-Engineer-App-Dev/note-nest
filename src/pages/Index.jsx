import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="md" bg="gray.100">
    <Text mb={2}>{note.text}</Text>
    <Flex justifyContent="space-between">
      <Button size="sm" leftIcon={<FaEdit />} onClick={() => onEdit(note.id)}>
        Edit
      </Button>
      <Button size="sm" colorScheme="red" leftIcon={<FaTrash />} onClick={() => onDelete(note.id)}>
        Delete
      </Button>
    </Flex>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddNote = () => {
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

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (id) => {
    const newText = prompt('Edit your note:', notes.find(note => note.id === id).text);
    if (newText) {
      setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
    }
  };

  return (
    <VStack spacing={4} p={4}>
      <Input
        placeholder="Add a new note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
      />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddNote}>
        Add Note
      </Button>
      <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={4} w="full">
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
        ))}
      </Grid>
    </VStack>
  );
};

export default Index;