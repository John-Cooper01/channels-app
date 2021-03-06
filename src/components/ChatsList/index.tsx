import { Box, Avatar, Typography, Divider } from '@mui/material';
import { useChat } from '../../hooks/useChat';
import { ChatsListProps } from './types';

export default function ChatsList({ id, name, date }: ChatsListProps) {
  const { handleChat } = useChat();

  return (
    <>
      <Box
        key={id}
        width="100%"
        sx={{ '& :hover': { bgcolor: '#44484e' } }}
        onClick={() => handleChat(id)}
      >
        <Box
          height="5rem"
          px={2}
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
        >
          <Avatar
            alt={name}
            src="/images/jhonatas3.jpg"
            sx={{ width: '3.125rem', height: '3.125rem' }}
          />
          <Box ml={2} display="flex" flexDirection="column">
            <Typography fontSize="1rem" component="span">
              {name}
            </Typography>
            <Typography
              color="text.secondary"
              fontSize=".875rem"
              fontWeight="medium"
              component="span"
            >
              {date}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            ml: '80px',
            borderColor: '#78909c',
          }}
        />
      </Box>
    </>
  );
}
