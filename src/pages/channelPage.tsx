import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useReduxSelector } from '../hooks/useReduxSelector';

import { Box, Container, Divider, Avatar, IconButton } from '@mui/material';
import { BiMessageSquareAdd } from 'react-icons/bi';
import MainAppBar from '../components/AppBar';
import ChatsList from '../components/ChatsList';
import Chat from '../components/Chat';
import { useChat } from '../hooks/useChat';
import { FormDataChannel, listChatsProps } from './types';

export default function ChannelPage() {
  const { register, handleSubmit } = useForm<FormDataChannel>();
  const usersCollectionRef = collection(db, 'chat');
  const [chats, setChats] = useState<listChatsProps[]>([]);
  const { userId, isAuth } = useReduxSelector(state => state.user);
  const { statusCreate } = useReduxSelector(state => state.chat);
  const { createChat } = useChat();

  useEffect(() => {
    const busca = async () => {
      if (userId) {
        console.log('TESTANDO');
        const queryChats = await query(
          usersCollectionRef,
          where('usersId', 'array-contains', userId),
        );
        const querySnapshot = await getDocs(queryChats);

        const listChats: listChatsProps[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          listChats.push({
            idChat: doc.id,
            idUser: data.userId,
            name: data.name,
          });
        });
        setChats(listChats);
      } else {
        console.log('Error em busca chat');
      }
    };
    busca();
  }, [isAuth, statusCreate]);

  return (
    <>
      <MainAppBar />
      <Container maxWidth="xl">
        <Box
          height={{ xs: '100%', md: '715px' }}
          mt={3.2}
          display="flex"
          justifyContent="center"
          bgcolor="background.paper"
        >
          <Box width="30%" height="100%" sx={{}}>
            <Box
              width="100%"
              height="4.375rem"
              px={2}
              display="flex"
              alignItems="center"
              bgcolor="#44484e"
            >
              <Avatar
                alt="Jho"
                src="/images/jhonatas.jpg"
                sx={{ width: '3.125rem', height: '3.125rem' }}
              />
            </Box>

            <Box
              my={2}
              display="flex"
              alignItems="center"
              sx={{
                '& input': {
                  width: '100%',
                  height: '2.75rem',
                  px: 1,
                  ml: 2,
                  mr: 0.5,
                  fontSize: '1.25rem',
                  color: 'text.primary',
                  bgcolor: '#44484e',
                  borderRadius: '.3rem',
                  border: 'none',
                  outline: 'none',
                },
                '& svg': {
                  width: '3rem',
                  height: '3rem',
                  cursor: 'pointer',
                  mr: 0.2,
                },
              }}
            >
              <input
                {...register('nameChat', { required: true })}
                autoComplete="off"
                type="text"
                placeholder="Criar novo grupo"
              />

              <IconButton
                color="primary"
                component="span"
                onClick={handleSubmit(createChat)}
              >
                <BiMessageSquareAdd />
              </IconButton>
            </Box>

            <Box
              height="549px"
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
              {chats.map((chat: listChatsProps) => (
                <ChatsList
                  key={chat.idChat}
                  id={chat.idChat}
                  name={chat.name}
                />
              ))}
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: '#78909c' }}
          />
          <Chat />
        </Box>
      </Container>
    </>
  );
}
