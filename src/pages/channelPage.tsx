import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../utils/firebase';
import { auth } from '../utils/firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { useReduxSelector } from '../hooks/useReduxSelector';

import { Box, Container, Divider, Avatar, IconButton } from '@mui/material';
import { BiMessageSquareAdd } from 'react-icons/bi';

import MainAppBar from '../components/AppBar';
import ChatsList from '../components/ChatsList';
import Chat from '../components/Chat';
import { listChatsProps } from './types';

interface FormData {
  nameChat: string;
}

export default function ChannelPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const usersCollectionRef = collection(db, 'chat');
  const [chats, setChats] = useState<any>([]);
  console.log(chats, 'teste');

  const { userId, isAuth } = useReduxSelector(state => state.user);

  const createchat: SubmitHandler<FormData> = async data => {
    await onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user, 'user');
        addDoc(usersCollectionRef, {
          userId: user.uid,
          name: data.nameChat,
          createdUp: new Date(),
          messages: [],
          usersId: [user.uid],
        });
      } else {
        console.log('error');
      }
    });
  };

  useEffect(() => {
    const busca = async () => {
      if (userId) {
        console.log('TESTANDO');
        const queryChats = await query(
          usersCollectionRef,
          where('usersId', 'array-contains', userId),
        );
        const querySnapshot = await getDocs(queryChats);
        console.log(
          querySnapshot.docs.map(doc => doc.id),
          'querySnapshot',
        );

        const listChats: listChatsProps[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          // console.log(data.messages, 'data');
          listChats.push({
            id: data.userId,
            name: data.name,
          });
        });
        setChats(listChats);
      } else {
        console.log('Error em busca chat');
      }
    };
    busca();
  }, [isAuth]);
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
          <Box
            width="30%"
            height="100%"
            sx={{
              overflow: 'overlay',
              '&::-webkit-scrollbar': { width: '0.1rem' },
              '&::-webkit-scrollbar-track': { background: '#434F5C' },
              '&::-webkit-scrollbar-thumb': {
                background: '#0269DA ',
                borderRadius: '0.2rem',
              },
            }}
          >
            <Box
              width="100%"
              height="4.375rem"
              px={2}
              display="flex"
              alignItems="center"
              bgcolor="#44484e"
            >
              <Avatar alt="Jho" src="/images/jhonatas.jpg" />
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
                type="text"
                placeholder="Criar novo grupo"
              />
              {/* {errors.nameChat && errors.nameChat.type === 'required' && (
                <span>This is required</span>
              )} */}
              <IconButton
                color="primary"
                component="span"
                onClick={handleSubmit(createchat)}
              >
                <BiMessageSquareAdd />
              </IconButton>
            </Box>
            {chats.map((chat: listChatsProps, index: number) => (
              <ChatsList key={index} id={index} name={chat.name} />
            ))}
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
{
  /* <pre>{JSON.stringify(userData, null, 2)}</pre> */
}
