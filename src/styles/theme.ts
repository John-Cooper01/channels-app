import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0269DA ',
    },
    secondary: {
      main: '#029BF6',
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
      secondary: '#0269DA',
    },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1200,
  //     xl: 1800,
  //   },
  // },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: {
  //       body: {
  //         '&::-webkit-scrollbar': { width: '0.6rem' },
  //         '&::-webkit-scrollbar-track': { background: '#434F5C' },
  //         '&::-webkit-scrollbar-thumb': {
  //           background: '#0269DA ',
  //           borderRadius: '0.2rem',
  //         },
  //       },
  //     },
  //   },
  // },
});

export default theme;
