import { Box, Divider, Avatar, Typography } from '@mui/material';
import { ChatItemsProps } from './types';

export default function AllChatsList({ id, name }: ChatItemsProps) {
  return (
    <>
      <Box
        key={id}
        width="100%"
        sx={{
          '& :hover': {
            bgcolor: '#44484e',
          },
        }}
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
              Ok, entao.
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
