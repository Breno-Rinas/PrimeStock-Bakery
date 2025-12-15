import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  InputAdornment
} from '@mui/material';
import { ShoppingBasket as ShoppingBasketIcon } from '@mui/icons-material';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import ProductSearch from './ProductSearch';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

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

          {/* Barra de pesquisa e botão adicionar (componente modular) */}
          <ProductSearch value={searchTerm} onChange={setSearchTerm} onAdd={handleOpenModal} />

          {/* Grid de produtos */}
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <ProductCard
                        product={product}
                        onIncrease={handleIncreaseQuantity}
                        onDecrease={handleDecreaseQuantity}
                        onDelete={handleDeleteProduct}
                      />
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

      <ProductForm
        open={openModal}
        initialData={null}
        onClose={handleCloseModal}
        onSave={(data) => {
          const product = {
            id: products.length + 1,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            image: data.image || 'https://via.placeholder.com/200?text=Produto'
          };
          setProducts([...products, product]);
          handleCloseModal();
        }}
      />
    </Box>
  );
};

export default Products;
