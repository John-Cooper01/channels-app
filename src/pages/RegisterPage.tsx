import { Container, Box, TextField, Divider } from '@mui/material';
import ButtonStyle from '../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import MainAppBar from '../components/AppBar';
import { useAuth } from '../hooks/useAuth';

interface FormData {
  username?: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const { LoginGoogle } = useAuth();

  const registerUser: SubmitHandler<FormData> = async data => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const userDoc = await collection(db, 'users');

      await addDoc(userDoc, {
        name: data.username,
        email: userInfo.user.email,
        userId: userInfo.user.uid,
        createdUp: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userInfoGoogle = await signInWithPopup(auth, provider);
      const docRef = await doc(db, 'users', userInfoGoogle.user.uid);

      setDoc(
        docRef,
        {
          name: userInfoGoogle.user.displayName,
          email: userInfoGoogle.user.email,
          userId: userInfoGoogle.user.uid,
          createdUp: new Date(),
        },
        { merge: true },
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };

  /*
 const userDoc = await collection(db, 'chat');
userId
createdUp: Date
messages: [{
  userId: string
  message: string
  createdUp: Date
}]
name: string



      const chatDoc = await collection(db, 'chat');
      await addDoc(chat, {
        userId: userInfo.user.uid,
        name: string
        createdUp: Date
        messages: []
        usersId: [userInfo.user.uid]
      });

      // const dadta = await query(chatDoc, where('usersId', "array-contains", userInfo.user.uid,));


*/

  return (
    <>
      <MainAppBar />

      <Container maxWidth="xl" sx={{ height: '90vh' }}>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width="600px"
            p={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="background.paper"
            border="1px solid #3487e1"
            borderRadius={4}
            sx={{ '& h1': { margin: '0 0 1rem 0' } }}
          >
            <h1>Crie sua conta</h1>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="initial"
              component="form"
              onSubmit={handleSubmit(registerUser)}
            >
              <TextField
                {...register('email')}
                label="Email"
                color="primary"
                type="email"
                variant="outlined"
                size="medium"
                sx={{
                  width: { xs: '300px', md: '350px' },
                  mb: 5,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.dark',
                    },
                  },
                }}
              />
              <TextField
                {...register('username')}
                label="Name"
                color="primary"
                type="text"
                variant="outlined"
                size="medium"
                sx={{
                  width: { xs: '300px', md: '350px' },
                  mb: 5,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.dark',
                    },
                  },
                }}
              />
              <TextField
                {...register('password')}
                label="password"
                color="primary"
                type="password"
                //defaultValue=""
                variant="outlined"
                size="medium"
                sx={{
                  width: { xs: '300px', md: '350px' },
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.dark',
                    },
                  },
                }}
              />

              <ButtonStyle
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                CADASTRAR
              </ButtonStyle>

              <Divider
                light={true}
                sx={{
                  my: 2,
                  fontSize: '1.25rem',
                  '&.MuiDivider-root': {
                    '&::before': {
                      borderTop: 'thin solid #3487e1',
                    },
                    '&::after': {
                      borderTop: 'thin solid #3487e1',
                    },
                  },
                }}
              >
                ou
              </Divider>
              <ButtonStyle
                variant="outlined"
                startIcon={<FcGoogle />}
                color="primary"
                size="large"
                onClick={LoginGoogle}
              >
                Google
              </ButtonStyle>
              <Box
                width="350px"
                mt={2}
                textAlign="center"
                sx={{
                  '& a': {
                    fontWeight: 'bold',
                    color: '#014998',
                    cursor: 'pointer',
                  },
                }}
              >
                Ao se registrar, você aceita nossos <a>termos de uso</a> e a
                nossa <a>política de privacidade</a>.
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
