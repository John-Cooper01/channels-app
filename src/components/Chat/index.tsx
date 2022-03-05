import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Box, IconButton } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
import { useReduxSelector } from '../../hooks/useReduxSelector';

export default function Chat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [messages, setMessages] = useState([]);
  const usersCollectionRef = collection(db, 'chat');

  const { userId } = useReduxSelector(state => state.user);

  interface FormData {
    body: string;
  }

  const sendMessage: SubmitHandler<FormData> = async data => {
    try {
      const docRef = await doc(usersCollectionRef);

      const queryChats = await query(
        usersCollectionRef,
        where('usersId', 'array-contains', userId),
      );
      const querySnapshot = await getDocs(queryChats);

      onSnapshot(usersCollectionRef, snapshot => {
        const chatIds = snapshot.docs.map(doc => doc.id);
      });

      // setDoc(
      //   docRef,
      //   {
      //     messages: [...messages, author, data.body, new Date()],
      //   },
      //   { merge: true },
      // );
    } catch (error) {
      console.log(error, 'error');
    }
  };

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
          <h1>Conversa</h1>
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
          TEXTO
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
