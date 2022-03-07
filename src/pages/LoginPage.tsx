import { Container, Box, TextField, Divider } from '@mui/material';
import ButtonStyle from '../components/Button';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../hooks/useAuth';
import MainAppBar from '../components/AppBar';
import { FormDataLoginPage } from './types';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormDataLoginPage>();

  const { LoginGoogle, loginEmailAndPassword } = useAuth();

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
              onSubmit={handleSubmit(loginEmailAndPassword)}
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
                onClick={LoginGoogle}
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
