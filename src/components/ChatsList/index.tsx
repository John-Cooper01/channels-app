import { Box, Avatar, Typography, Divider } from '@mui/material';
import { dbTeste } from './dbTeste';

export default function ChatsList() {
  console.log(dbTeste);
  return (
    <>
      {dbTeste.map((chat: any) => (
        <Box key={chat.id}>
          <Box
            px={2}
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
          >
            <Avatar
              alt={chat.name}
              src="/images/jhonatas3.jpg"
              sx={{ width: '3.125rem', height: '3.125rem' }}
            />
            <Box ml={2} display="flex" flexDirection="column">
              <Typography fontSize="1rem" component="span">
                {chat.name}
              </Typography>
              <Typography
                color="text.secondary"
                fontSize=".875rem"
                fontWeight="medium"
                component="span"
              >
                Ok, entao.
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              margin: '10px 0px 10px 80px',
              width: '70%',
              borderColor: '#78909c',
            }}
          />
        </Box>
      ))}
    </>
  );
}
