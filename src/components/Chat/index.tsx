import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, IconButton } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';
//import { useReduxSelector } from '../../hooks/useReduxSelector';
import MessageItem from '../MessageItem';
import { useChat } from '../../hooks/useChat';
import { FormData } from './type';

export default function Chat() {
  const { sendMessage } = useChat();
  const [listItem, setListItem] = useState([
    {
      id: 1,
      idUser: 12,
      author: 'Jhonatas',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem corporis libero architecto officiis, voluptas perferendis, sit iste mollitia aliquid dolor sed placeat quos eius quia, esse repellat ipsam maiores!',
    },
    {
      id: 2,
      idUser: 121,
      author: 'Jhonatas',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem corporis libero architecto officiis, voluptas perferendis, sit iste mollitia aliquid dolor sed placeat quos eius quia, esse repellat ipsam maiores!',
    },
    { id: 3, idUser: 122, author: 'joao', body: 'lorem' },
    { id: 4, idUser: 123, author: 'Guilherme', body: 'Hello' },
    { id: 5, idUser: 124, author: 'Jhonatas', body: 'Hello' },
    { id: 6, idUser: 124, author: 'Jhonatas', body: 'Hello' },
    { id: 7, idUser: 124, author: 'Jhonatas', body: 'Hello' },
    { id: 8, idUser: 124, author: 'Jhonatas', body: 'Hello' },
    { id: 9, idUser: 124, author: 'Jhonatas', body: 'Hello' },
  ]);

  const { register, handleSubmit } = useForm<FormData>();
  //const usersCollectionRef = collection(db, 'chat');
  //const { userId } = useReduxSelector(state => state.user);

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
          {listItem.map(item => (
            <MessageItem
              key={item.id}
              idUser={item.idUser}
              author={item.author}
              body={item.body}
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
