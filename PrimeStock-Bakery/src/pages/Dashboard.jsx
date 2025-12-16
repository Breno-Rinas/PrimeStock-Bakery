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
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ShoppingBasket as ShoppingBasketIcon
} from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [_mobileOpen, _setMobileOpen] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      const permissions = parsed && parsed.permissions ? parsed.permissions : [];
      if (!Array.isArray(permissions) || !permissions.includes('dashboard')) {
        if (Array.isArray(permissions) && permissions.includes('shopping-list')) {
          navigate('/shopping');
        } else {
          navigate('/');
        }
      }
    } catch {
    }
  }, []);


  const [productsData, setProductsData] = useState([]);
  const [_productsDataLoading, setLoadingProducts] = useState(false);
  const [_productsError, setProductsError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch('http://localhost:3002/product/todos');
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const json = await res.json();
        const products = json.products || [];
        const mapped = products.map(p => ({
          id: p.id,
          name: p.name || p.nome || p.product_name,
          quantity: p.stock_quantity ?? p.quantidade ?? 0,
          value: (p.price ?? p.valor ?? 0) * (p.stock_quantity ?? p.quantidade ?? 0)
        }));
        setProductsData(mapped);
      } catch (err) {
        console.error(err);
        setProductsError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const chartData = productsData.map((product, index) => ({ id: index, value: product.value, label: product.name }));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF7F2' }}>
      <Menu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` },
          mt: { xs: 8, md: 0 }
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: '#5A2D2D',
              fontWeight: 'bold'
            }}
          >
            Dashboard
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', width: '100%' }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  height: '100%',
                  minHeight: { md: 600, xs: 'auto' },
                  width: '100%',
                  maxWidth: { md: 600, xs: '100%' }
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: '#5A2D2D',
                    fontWeight: 'bold'
                  }}
                >
                  Gastos por Produto
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PieChart
                    series={[
                      {
                        data: chartData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
                      }
                    ]}
                    colors={['#5A2D2D', '#C08A5A', '#F6C1CC', '#D4A574', '#8B4513']}
                    width={420}
                    height={400}
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  height: '100%',
                  width: '100%',
                  maxWidth: { md: 1200, xs: '100%' },
                  
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: '#5A2D2D',
                    fontWeight: 'bold'
                  }}
                >
                  Produtos
                </Typography>
                <TableContainer sx={{ width: '100%', height: '100%' }}>
                  <Table size="small" sx={{ width: '100%' ,minWidth: 600, minHeight: 500, tableLayout: 'auto', height: '100%' }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#FFF7F2' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#5A2D2D' }}>
                          Produto
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#5A2D2D' }}>
                          Qtd.
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#5A2D2D' }}>
                          Valor (R$)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productsData.map((product) => (
                        <TableRow
                          key={product.id}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#FFF7F2'
                            }
                          }}
                        >
                          <TableCell sx={{ color: '#5A2D2D' }}>{product.name}</TableCell>
                          <TableCell align="right" sx={{ color: '#5A2D2D' }}>{product.quantity}</TableCell>
                          <TableCell align="right" sx={{ color: '#C08A5A', fontWeight: 'bold' }}>{(product.value || 0).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: '#FFF7F2' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#5A2D2D' }}>
                          Total
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#5A2D2D' }}>
                          {productsData.reduce((sum, p) => sum + p.quantity, 0)}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#C08A5A' }}>
                          {productsData.reduce((sum, p) => sum + p.value, 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
