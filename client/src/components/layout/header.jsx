import React, {useState, useEffect  } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import 'tw-elements';
import axios from "axios";
import Cookies from "js-cookie";

// const pages = ['Shirts', 'Hoodies'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [categoryshome, setCategoryshome] = useState([]);
  // const getCookies = () => {
  //   if (Cookies.get('user_id')) {
  //     return true;
  //   }
  //   return false;
  // }
  // const a = getCookies();
  useEffect( () => {
    console.log('1');
    axios.get('http://localhost:3001/categories/').then((res) => {
      setCategoryshome(res.data);
    })
    if(Cookies.get('user_id')){
      console.log('2');
      axios.post('http://localhost:3001/users/get_user/', { token: Cookies.get('user_id') }).then((res) => {
        console.log(res.data);
        setUser(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }else{
      console.log('no user');
    }

  },[]);

  // console.log('isLogin', isLogin);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookies.remove('user_id');
    window.location.reload();
  }
  //back to top
  function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );

      if (anchor) {
        anchor.scrollIntoView({
          block: 'center',
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }
  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };
  //end back to top




  return (
      <header >
        <React.Fragment>
          <CssBaseline />
          <AppBar style={{ position: "fixed", top: 0, backgroundColor: "black" }} sx={{ width: 1 }}>
            {/* sx={{width: 1}} */}
            <Container sx={{ width: 1 }}>
              <Toolbar disableGutters >
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  LOGO
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
                    <MenuIcon />
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
                    {categoryshome.map((category) => (
                      <MenuItem key={category._id} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          <Link to={`/categorys/${category._id}`} key={category._id}>
                            {category.name}
                          </Link>

                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {categoryshome.map((category) => (
                    <Link to={`/categorys/${category._id}`} key={category._id} style={{ textDecoration: 'none' }}>
                      <Button
                        key={category._id}
                        // onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      > {category.name}
                      </Button>
                    </Link>
                  ))}

                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  {Cookies.get('user_id') ?
                    <>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt={user != undefined? user.name:"" } src="/static/images/avatar/2.jpg" />
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

                        <Link to={"/Profile"} style={{ textDecoration: 'none' }}>
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Profile</Typography>
                          </MenuItem>
                        </Link>
                        <Link style={{ textDecoration: 'none' }}>
                          <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                          </MenuItem>
                        </Link>
                      </Menu>
                    </>
                    :
                    <div>
                      <Link to="/login" style={{ textDecoration: 'none' }}>
                        Đăng nhập
                      </Link>
                    </div>
                  }

                </Box>
              </Toolbar>
            </Container>
            {/* back to top */}
            <ScrollTop {...props}>
              <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </AppBar>
          <Toolbar id="back-to-top-anchor" />
        </React.Fragment>
      </header>
  );
}

export default Header;