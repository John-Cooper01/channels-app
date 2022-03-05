import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#3487e1',
      main: '#0269DA ',
      dark: '#014998',
      contrastText: '#fff',
    },
    secondary: {
      light: '#34aff7',
      main: '#029BF6',
      dark: '#016cac',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
    text: {
      primary: '#EFEFEF',
      secondary: '#78909c',
    },
  },
});

export default theme;
