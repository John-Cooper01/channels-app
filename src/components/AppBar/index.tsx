import * as React from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import {
  Container,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
} from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai';
import AppBar from '@mui/material/AppBar';
import { useAuth } from '../../hooks/useAuth';

const pages = [''];
const urls = ['/'];

export default function MainAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [userData, setUserData] = React.useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUserData(user ? user : null);
    });
  }, [userData]);

  const { Logout } = useAuth();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            ChannelsDEVS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <AiOutlineMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={urls[pages.indexOf(page)]}>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              {userData ? (
                <Tooltip title="Deseja mesmo sair ? :( ">
                  <MenuItem onClick={Logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Tooltip>
              ) : (
                ''
              )}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            ChannelsDEVS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, display: { xs: 'none', md: 'initial' } }}
              >
                <Avatar alt="Jho" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">ChannelsDevs</Typography>
              </MenuItem>
              {userData ? (
                <Tooltip title="Deseja mesmo sair ? :( ">
                  <MenuItem onClick={Logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Tooltip>
              ) : (
                ''
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
