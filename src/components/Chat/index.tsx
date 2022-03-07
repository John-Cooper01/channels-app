import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, IconButton } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { useReduxSelector } from '../../hooks/useReduxSelector';
import MessageItem from '../MessageItem';
import { useChat } from '../../hooks/useChat';
import { FormData } from './types';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';

export default function Chat() {
  const { sendMessage } = useChat();

  const [message, setMessages] = useState<DocumentData[]>([]);

  const { chatMessage } = useReduxSelector(state => state.chat);

  const { register, handleSubmit } = useForm<FormData>();
  const messagesCollectionRef = collection(db, 'messages');

  const queryChatsE = query(
    messagesCollectionRef,
    where('chatId', '==', chatMessage.id),
  );

  const querySnapshot = getDocs(queryChatsE);

  useEffect(() => {
    async function QueryChats() {
      const queryChats = await query(
        messagesCollectionRef,
        where('chatId', '==', chatMessage.id),
        orderBy('createdUp', 'asc'),
      );

      const querySnapshot = await getDocs(queryChats);
      const messagesForEach: DocumentData[] = [];
      querySnapshot.forEach(item => {
        const data = item.data();
        messagesForEach.push(data);
      });
      setMessages(messagesForEach);
    }
    QueryChats();
  }, [chatMessage.uid, querySnapshot]);

  return (
    <>
      <Box flex={1} bgcolor="background.paper">
        <Box
          width="100%"
          height="4.375rem"
          px={1}
          display="flex"
          alignItems="center"
          bgcolor="#44484e"
        >
          <h1>{chatMessage.chatName}</h1>
        </Box>

        <Box
          px={4}
          display="flex"
          flexDirection="column"
          width="100%"
          height="583px"
          sx={{
            overflow: 'overlay',
            '&::-webkit-scrollbar': { width: '0.4rem' },
            '&::-webkit-scrollbar-track': { background: '#434F5C' },
            '&::-webkit-scrollbar-thumb': {
              background: '#0269DA ',
              borderRadius: '0.2rem',
            },
          }}
        >
          {message.map(item => (
            <MessageItem
              key={item.createdUp}
              idUser={item.userId}
              author={item.username}
              body={item.message}
            />
          ))}
        </Box>

        <Box
          height="3.9rem"
          px={4}
          display="flex"
          alignItems="center"
          bgcolor="#44484e"
          sx={{
            '& input': {
              width: '100%',
              height: '2.2rem',
              px: 1,
              borderRadius: '.3rem',
              fontSize: '1.25rem',
              border: 'none',
              outline: 'none',
            },
            '& svg': {
              width: '2rem',
              height: '2rem',
              ml: 2,
              cursor: 'pointer',
            },
          }}
        >
          <input
            {...register('body', { required: true })}
            autoComplete="off"
            type="text"
            placeholder="Mensagem"
          />

          <IconButton
            color="primary"
            component="span"
            onClick={handleSubmit(sendMessage)}
          >
            <AiOutlineSend />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
