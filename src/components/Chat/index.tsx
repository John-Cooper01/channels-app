import { Box } from '@mui/material';
import { AiOutlineSend } from 'react-icons/ai';

export default function Chat() {
  return (
    <>
      <Box height="70vh" flex={1} bgcolor="background.paper">
        <Box px={4} width="100%" height="100%">
          Texto
        </Box>
        <Box
          height="3.9rem"
          px={4}
          display="flex"
          alignItems="center"
          bgcolor="#44484e"
          sx={{
            '& input': {
              width: '100%',
              height: '2.2rem',
              px: 1,
              borderRadius: '.3rem',
              fontSize: '1.25rem',
              border: 'none',
              outline: 'none',
            },
            '& svg': {
              width: '2rem',
              height: '2rem',
              ml: 2,
              cursor: 'pointer',
            },
          }}
        >
          <input type="text" placeholder="Mensagem" />
          <AiOutlineSend />
        </Box>
      </Box>
    </>
  );
}
