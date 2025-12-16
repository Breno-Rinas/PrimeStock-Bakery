import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import ProductSearch from './ProductSearch';
import Menu from './Menu';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleProductUpdated = (updated) => {
    if (!updated || !updated.id) return;
    const mapped = {
      id: updated.id,
      name: updated.name,
      price: Number(updated.price || 0),
      quantity: Number(updated.stock_quantity ?? updated.quantidade ?? updated.quantity ?? 0),
      image: updated.image_url || updated.image || '',
      description: updated.description || ''
    };
    setProducts(prev => {
      const exists = prev.some(p => Number(p.id) === Number(mapped.id));
      if (exists) {
        return prev.map(p => Number(p.id) === Number(mapped.id) ? mapped : p);
      }
      return [mapped, ...prev];
    });
    setSnackbar({ open: true, message: 'Produto atualizado', severity: 'success' });
  };

  const handleProductDeleted = (id) => {
    const idNum = Number(id);
    setProducts(prev => prev.filter(p => Number(p.id) !== idNum));
    setSnackbar({ open: true, message: 'Produto removido com sucesso', severity: 'success' });
  };

  const handleProductError = (message) => {
    setSnackbar({ open: true, message: message || 'Erro ao processar produto', severity: 'error' });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3002/product/todos');
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        const json = await res.json();
        const list = json.products || [];
        const mapped = list.map(p => ({
          id: p.id,
          name: p.name || p.nome || p.product_name,
          price: Number(p.price ?? p.valor ?? 0),
          quantity: Number(p.stock_quantity ?? p.quantidade ?? p.quantity ?? 0),
          image: p.image_url || p.image || p.imagem || ''
        }));
        setProducts(mapped);
      } catch (err) {
        console.error(err);
        setProductsError(err.message);
      }
    };

    fetchProducts();
  }, []);

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

          <ProductSearch value={searchTerm} onChange={setSearchTerm} onAdd={handleOpenModal} />
          {productsError && (
            <Paper sx={{ p: 2, mt: 2, backgroundColor: '#fff3f0' }}>
              <Typography sx={{ color: '#5A2D2D' }}>Erro ao carregar produtos: {productsError}</Typography>
            </Paper>
          )}
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <ProductCard
                        product={product}
                        onUpdated={handleProductUpdated}
                        onDeleted={handleProductDeleted}
                        onError={handleProductError}
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
            onSave={async (data) => {
          try {
            const payload = {
              name: data.name,
              price: data.price,
              stock_quantity: data.quantity,
              image_url: data.image,
              description: data.description || null
            };
            console.log('[Products] POST /product payload:', payload);
            const res = await fetch('http://localhost:3002/product', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            const textBody = await res.text();
            console.log('[Products] POST /product response status:', res.status, 'body:', textBody);

            let parsed = null;
            try { parsed = JSON.parse(textBody); } catch { parsed = null; }

            if (!res.ok) {
              const message = (parsed && (parsed.message || parsed.error)) || textBody || 'Erro ao criar produto';
              if (res.status === 400) {
                setSnackbar({ open: true, message, severity: 'error' });
              } else if (res.status === 409) {
                setSnackbar({ open: true, message: message || 'Produto já existe', severity: 'error' });
              } else {
                setSnackbar({ open: true, message, severity: 'error' });
              }
              return;
            }

            const created = (parsed && parsed.product) ? parsed.product : parsed || null;
            const newProduct = {
              id: created.id,
              name: created.name,
              price: Number(created.price || 0),
              quantity: Number(created.stock_quantity || created.quantidade || 0),
              image: created.image_url || created.image || '',
              description: created.description || ''
            };
            setProducts(prev => [newProduct, ...prev]);
            setSnackbar({ open: true, message: 'Produto criado com sucesso', severity: 'success' });
            handleCloseModal();
          } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: err.message || 'Erro ao criar produto', severity: 'error' });
          }
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;
