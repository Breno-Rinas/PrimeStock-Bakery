import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  Checkbox,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ShoppingList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const _isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: 'Farinha de Trigo', quantity: 5, unit: 'kg', checked: false },
    { id: 2, name: 'Açúcar', quantity: 3, unit: 'kg', checked: false },
    { id: 3, name: 'Ovos', quantity: 2, unit: 'dúzia', checked: true },
    { id: 4, name: 'Manteiga', quantity: 1, unit: 'kg', checked: false },
    { id: 5, name: 'Leite', quantity: 2, unit: 'L', checked: false }
  ]);

  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'kg' });
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity) {
      if (editingId) {
        setShoppingList(
          shoppingList.map(item =>
            item.id === editingId
              ? { ...item, name: newItem.name, quantity: parseInt(newItem.quantity), unit: newItem.unit }
              : item
          )
        );
        setEditingId(null);
      } else {
        const item = {
          id: Math.max(...shoppingList.map(i => i.id), 0) + 1,
          name: newItem.name,
          quantity: parseInt(newItem.quantity),
          unit: newItem.unit,
          checked: false
        };
        setShoppingList([...shoppingList, item]);
      }
      setNewItem({ name: '', quantity: '', unit: 'kg' });
      setOpenModal(false);
    }
  };

  const handleDeleteItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setShoppingList(
      shoppingList.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleEditItem = (item) => {
    setNewItem({ name: item.name, quantity: item.quantity.toString(), unit: item.unit });
    setEditingId(item.id);
    setOpenModal(true);
  };

  const handleOpenModal = () => {
    setNewItem({ name: '', quantity: '', unit: 'kg' });
    setEditingId(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewItem({ name: '', quantity: '', unit: 'kg' });
    setEditingId(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Pedidos', icon: <ShoppingCartIcon />, path: '/orders' },
    { text: 'Produtos', icon: <InventoryIcon />, path: '/products' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Relatórios', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Configurações', icon: <SettingsIcon />, path: '/settings' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

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
              onClick={() => handleMenuClick(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: '#C08A5A'
                }
              }}
            >
              <ListItemIcon sx={{ color: '#F6C1CC' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: '#C08A5A'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#F6C1CC' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  const completedCount = shoppingList.filter(item => item.checked).length;
  const totalCount = shoppingList.length;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF7F2' }}>
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
            Lista de Compras
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 }
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                color: '#5A2D2D',
                fontWeight: 'bold'
              }}
            >
              Lista de Compras
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#C08A5A',
                fontWeight: 'bold'
              }}
            >
              {completedCount} de {totalCount} itens concluídos
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              height: 8,
              backgroundColor: '#E0E0E0',
              borderRadius: 4,
              mb: 4,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                backgroundColor: '#C08A5A',
                transition: 'width 0.3s ease'
              }}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              backgroundColor: '#C08A5A',
              color: '#FFFFFF',
              mb: 3,
              '&:hover': {
                backgroundColor: '#5A2D2D'
              }
            }}
          >
            Adicionar Item
          </Button>
          <Paper
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            {shoppingList.length > 0 ? (
              <List sx={{ p: 0 }}>
                {shoppingList.map((item, index) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          edge="end"
                          onClick={() => handleEditItem(item)}
                          sx={{ color: '#C08A5A' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteItem(item.id)}
                          sx={{ color: '#F6C1CC' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                    sx={{
                      borderBottom: index < shoppingList.length - 1 ? '1px solid #E0E0E0' : 'none',
                      backgroundColor: item.checked ? '#FFF7F2' : '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#FFF7F2'
                      }
                    }}
                  >
                    <Checkbox
                      edge="start"
                      checked={item.checked}
                      onChange={() => handleToggleItem(item.id)}
                      sx={{
                        color: '#C08A5A',
                        '&.Mui-checked': {
                          color: '#C08A5A'
                        }
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: '#5A2D2D',
                            fontWeight: 'bold',
                            textDecoration: item.checked ? 'line-through' : 'none',
                            opacity: item.checked ? 0.6 : 1
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            color: '#C08A5A',
                            fontSize: '0.9rem'
                          }}
                        >
                          {item.quantity} {item.unit}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography sx={{ color: '#5A2D2D' }}>
                  Nenhum item na lista. Adicione um novo item para começar!
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: '#FFFFFF'
          }
        }}
      >
        <DialogTitle
          sx={{
            color: '#5A2D2D',
            fontWeight: 'bold',
            backgroundColor: '#FFF7F2'
          }}
        >
          {editingId ? 'Editar Item' : 'Novo Item'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Nome do Item"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#F6C1CC'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C08A5A'
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#5A2D2D'
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Quantidade"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              inputProps={{ min: '1' }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#F6C1CC'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C08A5A'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#5A2D2D'
                }
              }}
            />
            <TextField
              select
              label="Unidade"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              SelectProps={{
                native: true
              }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#F6C1CC'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C08A5A'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#5A2D2D'
                }
              }}
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="un">un</option>
              <option value="dúzia">dúzia</option>
              <option value="pct">pct</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseModal}
            sx={{ color: '#5A2D2D' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddItem}
            variant="contained"
            sx={{
              backgroundColor: '#C08A5A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#5A2D2D'
              }
            }}
          >
            {editingId ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShoppingList;
