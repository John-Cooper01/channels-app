import { Box } from '@mui/material';
import { useReduxSelector } from '../../hooks/useReduxSelector';
import { MessageItemProps } from './types';

export default function MessageItem({
  author,
  body,
  idUser,
  date,
}: MessageItemProps) {
  const {
    user: { userInfo },
  } = useReduxSelector(state => state);

  return (
    <Box
      display="flex"
      justifyContent={userInfo.id === idUser ? 'flex-end' : 'flex-start'}
    >
      <Box
        maxWidth="60%"
        p={1}
        my={1}
        display="flex"
        flexDirection="column"
        bgcolor={userInfo.id === idUser ? '#3C4E69' : '#44484e'}
        //#3C4E69
        borderRadius=".5rem"
      >
        <Box
          textAlign={userInfo.id === idUser ? 'end' : 'start'}
          fontSize=".8rem"
          fontWeight="medium"
          color={userInfo.id === idUser ? 'white' : '#029BF6'}
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
        >
          {author}
        </Box>
        <Box py={0.6} fontSize=".8875rem" lineHeight="1.1875rem">
          {body}
        </Box>
        <Box mt={-1} textAlign="end" fontSize=".700rem">
          {date}
        </Box>
      </Box>
    </Box>
  );
}
