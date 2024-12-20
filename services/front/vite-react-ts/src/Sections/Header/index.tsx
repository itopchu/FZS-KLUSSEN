import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme, Box } from "@mui/material";
import { Stack } from "@mui/system";
import { useWindowContext } from "../../Providers/Windows";
import { Img } from "react-image";
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const BACKEND_URL: string = import.meta.env.VITE_URL_BACKEND as string;
const siteShortName: string = import.meta.env.VITE_SITE_SHORT_NAME as string;
const siteLogo: string = import.meta.env.VITE_SITE_LOGO as string;

function Header() {
  const theme = useTheme();
  const { screenSize } = useWindowContext();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/gallery" onClick={handleDrawerToggle}>
          <ListItemText primary="Gallery" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/services" onClick={handleDrawerToggle}>
          <ListItemText primary="Services" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/contact"
          onClick={handleDrawerToggle}
          sx={{
            '& .MuiListItemText-primary': {
              background: 'linear-gradient(45deg, #FFEB3B, #FFC107)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }
          }}
        >
          <ListItemText primary="Contact" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          height: screenSize === 'mobile' ? 48 : 64,
          justifyContent: "center",
          paddingY: "1em",
          backgroundColor: theme.palette.background.default,
          boxShadow: `0 0.2em 0.1 ${theme.palette.text.secondary}`,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ height: '95%' }}>
          <Stack
            flexGrow={1}
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Button variant='text' disableFocusRipple disableRipple onClick={handleLogoClick} style={{ cursor: 'pointer' }} sx={{ height: "100%", alignContent: 'center' }}>
              <Img src={`${BACKEND_URL}/${siteLogo}`} alt="Logo" style={{ height: '80%' }} />
            </Button>
            <Box height={"120%"} alignContent={'center'}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  fontSize: '2rem',
                  color: '#FF5E1A',
                  height: '80%',
                  padding: 0,
                }}
              >
                {siteShortName}
              </Button>
            </Box>

            {screenSize === 'mobile' ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Stack height={'100%'} direction="row" spacing={1} alignItems="center" flexGrow={1}>
                  <Button
                    color="primary"
                    variant="text"
                    component={Link}
                    to="/gallery"
                    disableRipple
                  >
                    Gallery
                  </Button>
                  <Button
                    color="primary"
                    variant="text"
                    component={Link}
                    to="/services"
                    disableRipple
                  >
                    Services
                  </Button>
                </Stack>
                <Button
                  color="inherit"
                  component={Link}
                  to="/contact"
                  sx={{
                    height: '50%',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                    background: 'linear-gradient(45deg, #FFEB3B, #FFC107)',
                    color: theme.palette.common.black,
                    border: '2px solid rgba(255, 235, 59, 0.8)',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FFC107, #FFEB3B)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.4)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  Contact
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={screenSize === 'mobile' && mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          zIndex: 1502,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: theme.palette.background.default,
            position: 'fixed',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Header;