import { Box } from '@mui/material';
//import { useReduxSelector } from '../../hooks/useReduxSelector';

interface MessageItemProps {
  idUser: number;
  author: string;
  body: string;
}
export default function MessageItem({
  author,
  body,
  idUser,
}: MessageItemProps) {
  // const { userId } = useReduxSelector(state => state.user);
  const id = 12;
  return (
    <Box
      display="flex"
      justifyContent={id === idUser ? 'flex-end' : 'flex-start'}
      sx={{}}
    >
      <Box maxWidth="60%" p={1} my={1} bgcolor="#44484e" borderRadius=".5rem">
        <Box
          textAlign={id === idUser ? 'end' : 'start'}
          fontSize="1.25rem"
          fontWeight="medium"
          color={id === idUser ? '' : '#0269DA'}
        >
          {author}
        </Box>
        <Box fontSize=".875rem"> {body} </Box>
      </Box>
    </Box>
  );
}
