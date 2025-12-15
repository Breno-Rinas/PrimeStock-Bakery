import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  AppBar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Produtos', icon: <InventoryIcon />, path: '/products' },
  { text: 'Lista de Compras', icon: <ShoppingBasketIcon />, path: '/shopping' }
];

const bottomMenuItems = [
  { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' }
];

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const drawerWidth = 240;

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: '#5A2D2D', color: '#FFF7F2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFF7F2' }}>
          PrimeStock
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleMenuClick(item.path);
                if (isMobile) {
                  setMobileOpen(false);
                }
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#C08A5A'
                },
                py: { xs: 2, md: 3 }
              }}
            >
              <ListItemIcon sx={{ color: '#F6C1CC', fontSize: '1.5rem' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: { xs: '1.1rem', md: '1.3rem' }, 
                  fontWeight: 'medium' 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleMenuClick(item.path);
                if (isMobile) {
                  setMobileOpen(false);
                }
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#C08A5A'
                },
                py: { xs: 2, md: 3 }
              }}
            >
              <ListItemIcon sx={{ color: '#F6C1CC', fontSize: '1.5rem' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: { xs: '1.1rem', md: '1.3rem' }, 
                  fontWeight: 'medium' 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleLogout();
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
            sx={{
              '&:hover': {
                backgroundColor: '#C08A5A'
              },
              py: { xs: 2, md: 3 }
            }}
          >
            <ListItemIcon sx={{ color: '#F6C1CC', fontSize: '1.5rem' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Sair" 
              primaryTypographyProps={{ 
                fontSize: { xs: '1.1rem', md: '1.3rem' }, 
                fontWeight: 'medium' 
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF7F2' }}>
      {/* AppBar para mobile */}
      <AppBar
        position="fixed"
        sx={{
          display: { md: 'none' },
          backgroundColor: '#5A2D2D'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PrimeStock-Bakery
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu lateral */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Drawer para mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer permanente para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Menu;