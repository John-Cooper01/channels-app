import { useForm } from 'react-hook-form';

import { Container, Box, TextField, Divider } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import ButtonStyle from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormDataRegisterUser } from './types';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormDataRegisterUser>();
  const { registerUser, LoginGoogle } = useAuth();

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
