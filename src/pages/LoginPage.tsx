import { Container, Box, TextField, Divider } from '@mui/material';
import ButtonStyle from '../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const hedlesignIn: SubmitHandler<FormData> = async data => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
      console.log('login feito com sucesso');
    } catch (error) {
      console.log(error);
    }
  };

  const hedleSignInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
      console.log('login fieto com sucesso');
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ height: '90vh' }}>
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={{ xs: '100%', md: '600px' }}
            p={{ xs: 1, md: 5 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="background.paper"
            border="1px solid #3487e1"
            borderRadius={4}
            sx={{ '& h1': { margin: '0 0 1rem 0' } }}
          >
            <h1>Faça seu login</h1>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="initial"
              component="form"
              onSubmit={handleSubmit(hedlesignIn)}
            >
              <TextField
                {...register('email')}
                label="Email"
                color="primary"
                type="email"
                //defaultValue=""
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
                sx={{ width: '100%' }}
              >
                Entrar
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
                onClick={hedleSignInGoogle}
                sx={{ width: '100%' }}
              >
                Google
              </ButtonStyle>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
