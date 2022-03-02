import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

import { Box, Container, Divider, Avatar } from '@mui/material';
import { BiMessageSquareAdd } from 'react-icons/bi';

import ChatsList from '../components/ChatsList';
import Chat from '../components/Chat';

export default function HomePage() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserData(user ? user : null);
      // if (user) {
      //   setUserData(user);
      // } else {
      //   setUserData(null);
      // }
    });
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          height="86vh"
          mt={3.2}
          display="flex"
          justifyContent="center"
          bgcolor="background.paper"
        >
          <Box width="30%">
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
                  mr: 2,
                  cursor: 'pointer',
                },
              }}
            >
              <input type="text" placeholder="Criar novo grupo" />
              <BiMessageSquareAdd />
            </Box>
            <ChatsList />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: '#0f1217' }}
          />
          <Box width="70%" bgcolor="#0f1217">
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
            <Chat />
          </Box>
        </Box>
      </Container>
    </>
  );
}
{
  /* <pre>{JSON.stringify(userData, null, 2)}</pre> */
}
