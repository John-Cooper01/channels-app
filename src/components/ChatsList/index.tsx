import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Box, Avatar, Typography, Divider } from '@mui/material';
import { useChat } from '../../hooks/useChat';

interface ChatsListProps {
  id: string;
  name: string;
}

export default function ChatsList({ id, name }: ChatsListProps) {
  const chatCollectionRef = collection(db, 'chat');
  const chatRef = doc(chatCollectionRef, id);
  const { handleChat } = useChat();

  return (
    <>
      <Box
        key={id}
        width="100%"
        sx={{ '& :hover': { bgcolor: '#44484e' } }}
        onClick={() => handleChat(id)}
      >
        <Box
          height="5rem"
          px={2}
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
        >
          <Avatar
            alt={name}
            src="/images/jhonatas3.jpg"
            sx={{ width: '3.125rem', height: '3.125rem' }}
          />
          <Box ml={2} display="flex" flexDirection="column">
            <Typography fontSize="1rem" component="span">
              {name}
            </Typography>
            <Typography
              color="text.secondary"
              fontSize=".875rem"
              fontWeight="medium"
              component="span"
            >
              Ok, entao.
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            ml: '80px',
            borderColor: '#78909c',
          }}
        />
      </Box>
    </>
  );
}
