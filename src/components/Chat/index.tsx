import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useForm } from 'react-hook-form';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Box, IconButton, Typography } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { useReduxSelector } from '../../hooks/useReduxSelector';
import MessageItem from '../MessageItem';
import { useChat } from '../../hooks/useChat';
import { FormData } from './types';

export default function Chat() {
  const [message, setMessages] = useState<DocumentData[]>([]);
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const { chatMessage } = useReduxSelector(state => state.chat);
  const chatCollectionRef = collection(db, 'chat');
  const { sendMessage } = useChat();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ body: '' });
    }
  }, [formState, reset]);

  useEffect(() => {
    async function QueryChats() {
      const queryChats = await query(
        chatCollectionRef,
        where('uid', '==', chatMessage.uid),
      );

      const querySnapshot = await getDocs(queryChats);

      querySnapshot.forEach(item => {
        const data = item.data();
        const response = data.messages.map((item: DocumentData) => {
          return {
            ...item,
            idMessege: item.uid,
            idUser: item.userId,
            username: item.username,
            message: item.message,
            createdUp: formatRelative(
              new Date(item.createdUp.toDate()),
              new Date(),
              {
                locale: ptBR,
              },
            ),
          };
        });
        setMessages(response);
      });
    }
    QueryChats();
  }, [chatMessage.uid, sendMessage]);

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
              key={item.idMessege}
              idUser={item.idUser}
              author={item.username}
              date={item.createdUp}
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
