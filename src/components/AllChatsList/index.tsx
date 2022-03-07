import { Box, Divider, Avatar, Typography } from '@mui/material';
import { useChat } from '../../hooks/useChat';
import { ChatItemsProps } from './types';

export default function AllChatsList({ id, name, date }: ChatItemsProps) {
  const { handleChatAll } = useChat();
  return (
    <>
      <Box
        width="100%"
        sx={{
          '& :hover': {
            bgcolor: '#44484e',
          },
        }}
      >
        <Box
          key={id}
          height="5rem"
          px={2}
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => handleChatAll(id)}
        >
          <Avatar
            alt={name}
            src="/images/null.jpg"
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
            borderColor: '#78909c',
          }}
        />
      </Box>
    </>
  );
}
