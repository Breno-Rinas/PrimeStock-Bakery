import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Divider, Box, IconButton, CircularProgress } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProductCard = ({ product, onUpdated, onDeleted, onError }) => {
  const [loadingDel, setLoadingDel] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(Number(product.quantity || 0));
  const [incPending, setIncPending] = useState(0);
  const [decPending, setDecPending] = useState(0);

  React.useEffect(() => {
    setLocalQuantity(Number(product.quantity || 0));
  }, [product.quantity]);

  const handleIncrease = async () => {
    setLocalQuantity(q => q + 1);
    setIncPending(n => n + 1);
    const newQuantity = localQuantity + 1;
    try {
      const res = await fetch(`http://localhost:3002/product/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock_quantity: newQuantity })
      });
      const text = await res.text();
      let parsed = null;
      try { parsed = JSON.parse(text); } catch { parsed = null; }
      if (!res.ok) {
        const message = (parsed && (parsed.message || parsed.error)) || text || 'Erro ao atualizar quantidade';
        setLocalQuantity(q => Math.max(0, q - 1));
        onError?.(message);
        return;
      }
      const updated = parsed || null;
      if (updated && (updated.stock_quantity !== undefined || updated.quantity !== undefined || updated.quantidade !== undefined)) {
        const serverQty = Number(updated.stock_quantity ?? updated.quantity ?? updated.quantidade ?? newQuantity);
        setLocalQuantity(serverQty);
      }
      onUpdated?.(updated);
    } catch (err) {
      console.error('Erro ao aumentar quantidade (card):', err);
      setLocalQuantity(q => Math.max(0, q - 1));
      onError?.(err.message || 'Erro ao atualizar quantidade');
    } finally {
      setIncPending(n => Math.max(0, n - 1));
    }
  };

  const handleDecrease = async () => {
    if (localQuantity <= 0) return;
    setLocalQuantity(q => Math.max(0, q - 1));
    setDecPending(n => n + 1);
    const newQuantity = Math.max(0, localQuantity - 1);
    try {
      const res = await fetch(`http://localhost:3002/product/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock_quantity: newQuantity })
      });
      const text = await res.text();
      let parsed = null;
      try { parsed = JSON.parse(text); } catch { parsed = null; }
      if (!res.ok) {
        const message = (parsed && (parsed.message || parsed.error)) || text || 'Erro ao atualizar quantidade';
        setLocalQuantity(q => q + 1);
        onError?.(message);
        return;
      }
      const updated = parsed || null;
      if (updated && (updated.stock_quantity !== undefined || updated.quantity !== undefined || updated.quantidade !== undefined)) {
        const serverQty = Number(updated.stock_quantity ?? updated.quantity ?? updated.quantidade ?? newQuantity);
        setLocalQuantity(serverQty);
      }
      onUpdated?.(updated);
    } catch (err) {
      console.error('Erro ao diminuir quantidade (card):', err);
      setLocalQuantity(q => q + 1);
      onError?.(err.message || 'Erro ao atualizar quantidade');
    } finally {
      setDecPending(n => Math.max(0, n - 1));
    }
  };

  const handleDelete = async () => {
    console.log('[ProductCard] delete clicked, optimistic remove id=', product.id);
    onDeleted?.(Number(product.id));
    setLoadingDel(true);
    try {
      const res = await fetch(`http://localhost:3002/product/${product.id}`, { method: 'DELETE' });
      const text = await res.text();
      let parsed = null;
      try { parsed = JSON.parse(text); } catch { parsed = null; }
      if (!res.ok) {
        const message = (parsed && (parsed.message || parsed.error)) || text || 'Erro ao deletar produto';
        onError?.(message);
        onUpdated?.(product);
        return;
      }
    } catch (err) {
      console.error('Erro ao deletar produto (card):', err);
      onError?.(err.message || 'Erro ao deletar produto');
      onUpdated?.(product);
    } finally {
      setLoadingDel(false);
    }
  };

  return (
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
        {product.description && (
          <Typography
            variant="body2"
            sx={{ color: '#5A2D2D', mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {product.description}
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{ color: '#C08A5A', fontWeight: 'bold', mb: 1 }}
        >
          R$ {Number(product.price || 0).toFixed(2)}
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
              onClick={handleDecrease}
              sx={{ color: '#C08A5A' }}
            >
              {decPending > 0 ? <CircularProgress size={18} /> : <RemoveCircleIcon fontSize="small" />}
            </IconButton>
            <Typography
              sx={{
                color: '#5A2D2D',
                fontWeight: 'bold',
                minWidth: '30px',
                textAlign: 'center'
              }}
            >
              {localQuantity}
            </Typography>
            <IconButton
              size="small"
              onClick={handleIncrease}
              sx={{ color: '#C08A5A' }}
            >
              {incPending > 0 ? <CircularProgress size={18} /> : <AddCircleIcon fontSize="small" />}
            </IconButton>
          </Box>
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{ color: '#F6C1CC' }}
            disabled={loadingDel}
          >
            {loadingDel ? <CircularProgress size={18} /> : <DeleteIcon fontSize="small" />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
