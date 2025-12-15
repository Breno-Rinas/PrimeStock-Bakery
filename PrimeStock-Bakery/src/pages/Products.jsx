import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  ShoppingBasket as ShoppingBasketIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Bolo de Chocolate',
      price: 30.00,
      quantity: 45,
      image: 'https://via.placeholder.com/200?text=Bolo+Chocolate'
    },
    {
      id: 2,
      name: 'Torta de Morango',
      price: 40.00,
      quantity: 32,
      image: 'https://via.placeholder.com/200?text=Torta+Morango'
    },
    {
      id: 3,
      name: 'Cupcakes',
      price: 8.00,
      quantity: 120,
      image: 'https://via.placeholder.com/200?text=Cupcakes'
    },
    {
      id: 4,
      name: 'Pão de Mel',
      price: 5.00,
      quantity: 80,
      image: 'https://via.placeholder.com/200?text=Pao+Mel'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    image: ''
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewProduct({ name: '', price: '', quantity: '', image: '' });
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.quantity) {
      const product = {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
        image: newProduct.image || 'https://via.placeholder.com/200?text=Produto'
      };
      setProducts([...products, product]);
      handleCloseModal();
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setProducts(products.map(p =>
      p.id === id && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 } : p
    ));
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Produtos
          </Typography>

          {/* Barra de pesquisa e botão adicionar */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' }
            }}
          >
            <TextField
              placeholder="Buscar por nome do produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#C08A5A' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
              sx={{
                backgroundColor: '#C08A5A',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#5A2D2D'
                },
                whiteSpace: 'nowrap'
              }}
            >
              Novo Produto
            </Button>
          </Box>

          {/* Grid de produtos */}
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 2,
                      boxShadow: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        objectFit: 'cover',
                        backgroundColor: '#FFF7F2'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          color: '#5A2D2D',
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#C08A5A', fontWeight: 'bold', mb: 1 }}
                      >
                        R$ {product.price.toFixed(2)}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDecreaseQuantity(product.id)}
                            sx={{ color: '#C08A5A' }}
                          >
                            <RemoveCircleIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            sx={{
                              color: '#5A2D2D',
                              fontWeight: 'bold',
                              minWidth: '30px',
                              textAlign: 'center'
                            }}
                          >
                            {product.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleIncreaseQuantity(product.id)}
                            sx={{ color: '#C08A5A' }}
                          >
                            <AddCircleIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProduct(product.id)}
                          sx={{ color: '#F6C1CC' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2
                  }}
                >
                  <Typography sx={{ color: '#5A2D2D' }}>
                    Nenhum produto encontrado
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Modal de adicionar produto */}
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
          Novo Produto
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Nome do Produto"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
          <TextField
            fullWidth
            label="Preço (R$)"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            margin="normal"
            inputProps={{ step: '0.01' }}
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
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            margin="normal"
            inputProps={{ min: '0' }}
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
          <TextField
            fullWidth
            label="URL da Imagem (opcional)"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
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
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseModal}
            sx={{ color: '#5A2D2D' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            sx={{
              backgroundColor: '#C08A5A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#5A2D2D'
              }
            }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
