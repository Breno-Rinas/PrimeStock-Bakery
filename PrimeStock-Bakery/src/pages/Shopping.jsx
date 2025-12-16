import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Checkbox,
  Chip,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import ProductPicker from '../components/ProductPicker';

const Shopping = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const _isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [_mobileOpen, _setMobileOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const drawerWidth = 240;

  const [shoppingList, setShoppingList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setLoadingList(true);
      try {
        const res = await fetch('http://localhost:3002/shopping-list/todos');
  console.log('[Shopping] GET /shopping-list/todos status:', res.status);
  const json = await res.json();
  console.log('[Shopping] GET /shopping-list/todos body:', json);
        if (!res.ok) throw new Error('Erro ao buscar lista de compras: ' + (json.message || res.statusText));
        const raw = json.items || json.shoppingList || json;
        const list = (raw && Array.isArray(raw)) ? raw : [];
        const mapped = list.map(i => ({
          id: i.id,
          item: i.product_name || i.item || i.name,
          quantity: String(i.quantity || 1),
          completed: (i.status === 'completed') || false,
          priority: i.priority || 'medium'
        }));
        setShoppingList(mapped);
      } catch {
        console.error('Erro ao buscar lista de compras');
        setListError('Erro ao buscar lista de compras');
      } finally {
        setLoadingList(false);
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      const permissions = parsed && parsed.permissions ? parsed.permissions : [];
      if (!Array.isArray(permissions) || !permissions.includes('shopping-list')) {
        if (Array.isArray(permissions) && permissions.includes('dashboard')) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch {
    }
  }, []);

  const handleOpenPicker = () => setPickerOpen(true);
  const handleClosePicker = () => setPickerOpen(false);
  const handleProductAdded = (item) => {
    setShoppingList(prev => [...prev, item]);
  };

  const toggleComplete = (id) => {
    const item = shoppingList.find(i => i.id === id);
    if (!item) return;

    const updated = { ...item, completed: !item.completed };

    setShoppingList(shoppingList.map(i => i.id === id ? updated : i));

    (async () => {
      try {
        const res = await fetch(`http://localhost:3002/shopping-list/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            product_name: updated.item,
            quantity: Number(updated.quantity),
            priority: updated.priority,
            status: updated.completed ? 'completed' : 'pending'
          })
        });

        if (!res.ok) {
          console.error('[Shopping] Falha ao atualizar shopping-list', res.status);
          setShoppingList(prev => prev.map(i => i.id === id ? { ...i, completed: !updated.completed } : i));
          return;
        }

        if (updated.completed) {
          try {
            const prodRes = await fetch('http://localhost:3002/product/todos');
            if (!prodRes.ok) throw new Error('Falha ao buscar produtos');
            const prodJson = await prodRes.json();
            const products = prodJson.items || prodJson.products || prodJson;
            const match = (Array.isArray(products) ? products : []).find(p => {
              const name = (p.product_name || p.name || '').toString().trim().toLowerCase();
              return name === (updated.item || '').toString().trim().toLowerCase();
            });

            if (!match) {
              console.warn('[Shopping] Produto não encontrado para atualizar quantidade:', updated.item);
              return;
            }

            const newQuantity = Number(match.stock_quantity || 0) + 10;

            const payload = {
              product_name: match.product_name || match.name,
              product_price: match.product_price || match.price || 0,
              product_unit: match.product_unit || match.unit || '',
              stock_quantity: newQuantity
            };

            const putRes = await fetch(`http://localhost:3002/product/${match.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            if (!putRes.ok) {
              console.error('[Shopping] Falha ao atualizar produto', putRes.status);
            }
          } catch (err) {
            console.error('[Shopping] Erro ao atualizar quantidade do produto:', err);
          }
        }
      } catch (err) {
        console.error('Erro ao atualizar item na shopping-list:', err);
        setShoppingList(prev => prev.map(i => i.id === id ? { ...i, completed: !updated.completed } : i));
      }
    })();
  };

  const deleteItem = (id) => {
    (async () => {
      try {
        await fetch(`http://localhost:3002/shopping-list/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Erro ao deletar item:', err);
      }
    })();
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  const completedItems = shoppingList.filter(item => item.completed).length;
  const totalItems = shoppingList.length;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF7F2' }}>
      <Menu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 },
          minHeight: '100vh'
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, maxWidth: '1900px' }}>
          <Typography
            variant="h3"
            sx={{
              mb: { xs: 3, md: 4 },
              color: '#5A2D2D',
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Lista de Compras
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#E8F5E8' }}>
                <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  {completedItems}
                </Typography>
                <Typography variant="body1" sx={{ color: '#4CAF50' }}>
                  Itens Concluídos
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#FFF3E0' }}>
                <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 'bold' }}>
                  {totalItems - completedItems}
                </Typography>
                <Typography variant="body1" sx={{ color: '#FF9800' }}>
                  Itens Pendentes
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#E3F2FD' }}>
                <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                  {totalItems}
                </Typography>
                <Typography variant="body1" sx={{ color: '#2196F3' }}>
                  Total de Itens
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={handleOpenPicker}
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: '#5A2D2D',
                  '&:hover': {
                    backgroundColor: '#C08A5A'
                  },
                  minWidth: '200px'
                }}
              >
                Adicionar produto cadastrado
              </Button>
            </Box>
          </Paper>
          <ProductPicker open={pickerOpen} onClose={handleClosePicker} onAdded={handleProductAdded} />

          {loadingList ? (
            <Paper sx={{ p: 2, mb: 3, textAlign: 'center' }}>
              <Typography variant="body1">Carregando lista de compras...</Typography>
            </Paper>
          ) : listError ? (
            <Paper sx={{ p: 2, mb: 3, backgroundColor: '#FFEBEE' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#C62828' }}>Erro: {listError}</Typography>
                <Button variant="outlined" onClick={() => window.location.reload()}>Tentar novamente</Button>
              </Box>
            </Paper>
          ) : null}

          <Paper elevation={3} sx={{ backgroundColor: '#FFFFFF', borderRadius: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#FFF7F2' }}>
                    <TableCell sx={{ width: '50px' }}></TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#5A2D2D', fontSize: '1.2rem' }}>
                      Item
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#5A2D2D', fontSize: '1.2rem' }}>
                      Quantidade
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#5A2D2D', fontSize: '1.2rem' }}>
                      Prioridade
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#5A2D2D', fontSize: '1.2rem' }}>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shoppingList.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#FFF7F2'
                        },
                        opacity: item.completed ? 0.6 : 1,
                        textDecoration: item.completed ? 'line-through' : 'none'
                      }}
                    >
                      <TableCell>
                        <Checkbox
                          checked={item.completed}
                          onChange={() => toggleComplete(item.id)}
                          sx={{
                            color: '#C08A5A',
                            '&.Mui-checked': {
                              color: '#4CAF50',
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: '1.1rem',
                        textDecoration: item.completed ? 'line-through' : 'none'
                      }}>
                        {item.item}
                      </TableCell>
                      <TableCell sx={{ fontSize: '1.1rem' }}>
                        {item.quantity}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getPriorityText(item.priority)}
                          sx={{
                            backgroundColor: getPriorityColor(item.priority),
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => deleteItem(item.id)}
                          sx={{
                            color: '#F44336',
                            '&:hover': {
                              backgroundColor: '#FFF7F2'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Shopping;