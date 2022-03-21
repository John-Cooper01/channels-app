import { Container, Box, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../hooks/useAuth';
import { FormDataLoginPage } from './types';

import ButtonStyle from '../components/Button';
import { Input } from '../components/InputBase';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormDataLoginPage>();

  const { LoginGoogle, loginEmailAndPassword } = useAuth();

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
              onSubmit={handleSubmit(loginEmailAndPassword)}
            >
              <Input
                {...register('email')}
                label="Email"
                color="primary"
                type="email"
                size="medium"
                width={{ xs: '300px', md: '350px' }}
                m={{ xs: '0 0 1.5rem 0', md: '0 0 1.5rem 0' }}
              />

              <Input
                {...register('password')}
                label="password"
                color="primary"
                type="password"
                size="medium"
                m={{ xs: '0 0 1.5rem 0', md: '0 0 1.5rem 0' }}
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
              <Box
                mt={3}
                textAlign="center"
                sx={{
                  '& a': {
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: '#014998',
                    '&:hover': {
                      color: '#3487e1',
                    },
                  },
                }}
              >
                Não tem uma conta? <Link to="/cadastrar">Registre-se</Link>
              </Box>
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
