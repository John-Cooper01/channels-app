import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Box, IconButton, Typography } from '@mui/material';
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
  const [message, setMessages] = useState<DocumentData[]>([]);
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const { chatMessage } = useReduxSelector(state => state.chat);
  const messagesCollectionRef = collection(db, 'messages');
  const { sendMessage } = useChat();

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
        messagesForEach.push({
          ...data,
          idMsg: data.uid,
          idUser: data.userId,
          author: data.username,
          message: data.message,
          date: formatRelative(new Date(data.createdUp.toDate()), new Date(), {
            locale: ptBR,
          }),
        });
      });
      setMessages(messagesForEach);
    }
    QueryChats();
  }, [chatMessage.uid, querySnapshot]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ body: '' });
    }
  }, [formState, reset]);

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
          <Typography component="h1" fontSize="2rem" fontWeight="medium">
            {chatMessage.chatName}
          </Typography>
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
              key={item.idMsg}
              idUser={item.idUser}
              author={item.username}
              date={item.date}
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
          component="form"
          onSubmit={handleSubmit(sendMessage)}
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
            color="secondary"
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
