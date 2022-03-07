import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useReduxSelector } from '../hooks/useReduxSelector';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {
  Box,
  Container,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { VscCommentDiscussion } from 'react-icons/vsc';
import MainAppBar from '../components/AppBar';
import ChatsList from '../components/ChatsList';
import Chat from '../components/Chat';
import { useChat } from '../hooks/useChat';
import { FormDataChannel, listChatsProps, ChatAllProps } from './types';
import Drawer from '../components/Drawer';
import AllChatsList from '../components/AllChatsList';

export default function ChannelPage() {
  const [chatAll, setChatAll] = useState<ChatAllProps[]>([]);
  const [chats, setChats] = useState<listChatsProps[]>([]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<FormDataChannel>();
  const { userInfo, isAuth } = useReduxSelector(state => state.user);
  const { statusCreate } = useReduxSelector(state => state.chat);
  const chatCollectionRef = collection(db, 'chat');
  const { createChat } = useChat();

  useEffect(() => {
    const busca = async () => {
      if (userInfo.id) {
        const queryChats = await query(
          chatCollectionRef,
          where('usersId', 'array-contains', userInfo.id),
        );
        const querySnapshot = await getDocs(queryChats);

        const listChats: listChatsProps[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          listChats.push({
            ...data,
            idChat: doc.id,
            idUser: data.userId,
            name: data.name,
            date: formatRelative(
              new Date(data.createdUp.toDate()),
              new Date(),
              { locale: ptBR },
            ),
          });
        });
        setChats(listChats);
      } else {
        console.log('Error em busca chat');
      }
    };
    busca();
  }, [isAuth, statusCreate]);

  useEffect(() => {
    const buscaAll = async () => {
      try {
        const queryChats = await query(chatCollectionRef);
        const querySnapshot = await getDocs(queryChats);

        const listChats: listChatsProps[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          listChats.push({
            ...data,
            idChat: doc.id,
            idUser: data.userId,
            name: data.name,
            date: formatRelative(
              new Date(data.createdUp.toDate()),
              new Date(),
              { locale: ptBR },
            ),
          });
        });
        setChatAll(listChats);
      } catch (error) {
        console.log('Error em buscas todos os chat', error);
      }
    };
    buscaAll();
  }, [statusCreate, open]);

  const handleDrawer = () => {
    setOpen(true);
  };

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
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#44484e"
            >
              <Avatar
                src="/images/none.jpg"
                sx={{ width: '3.125rem', height: '3.125rem' }}
              />
              <Tooltip title="Encontre outros canais">
                <IconButton
                  color="primary"
                  component="span"
                  onClick={handleDrawer}
                  sx={{ '& svg': { height: '2rem', width: '2rem' } }}
                >
                  <VscCommentDiscussion />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              my={2}
              display="flex"
              alignItems="center"
              component="form"
              onSubmit={handleSubmit(createChat)}
              sx={{
                '& input': {
                  width: '100%',
                  height: '2.2rem',
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
                  width: '2.2rem',
                  height: '2.2rem',
                  cursor: 'pointer',
                  mr: 0.2,
                },
              }}
            >
              <input
                {...register('nameChat', { required: true })}
                autoComplete="off"
                type="text"
                placeholder="Criar novo canal"
              />
              <Tooltip title="Crier um canal">
                <IconButton color="primary" component="span">
                  <BiMessageSquareAdd />
                </IconButton>
              </Tooltip>
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
                  date={chat.date}
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
      <Drawer
        width={350}
        anchor="left"
        open={open}
        onOpen={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          textAlign="center"
          color="white"
          fontSize="2rem"
          fontWeight="medium"
        >
          Todos os Canais
        </Box>
        {chatAll.map((chat: ChatAllProps) => (
          <AllChatsList
            key={chat.idChat}
            id={chat.idChat}
            name={chat.name}
            date={chat.date}
          />
        ))}
      </Drawer>
    </>
  );
}
