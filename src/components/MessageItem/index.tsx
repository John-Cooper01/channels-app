import { Box } from '@mui/material';
import { useReduxSelector } from '../../hooks/useReduxSelector';
import { MessageItemProps } from './types';

export default function MessageItem({
  author,
  body,
  idUser,
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
        bgcolor="#44484e"
        borderRadius=".5rem"
      >
        <Box
          textAlign={userInfo.id === idUser ? 'end' : 'start'}
          fontSize="1.25rem"
          fontWeight="medium"
          color={userInfo.id === idUser ? '' : '#0269DA'}
        >
          {author}
        </Box>
        <Box fontSize=".875rem"> {body} </Box>
      </Box>
    </Box>
  );
}
