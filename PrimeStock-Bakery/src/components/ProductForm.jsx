import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

const ProductForm = ({ open, initialData = null, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', price: '', quantity: '', image: '' });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        price: initialData.price || '',
        quantity: initialData.quantity || '',
        image: initialData.image || ''
      });
    } else {
      setForm({ name: '', price: '', quantity: '', image: '' });
    }
  }, [initialData, open]);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || form.price === '' || form.quantity === '') return;
    onSave({
      name: form.name,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10),
      image: form.image
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, backgroundColor: '#FFFFFF' } }}
    >
      <DialogTitle sx={{ color: '#5A2D2D', fontWeight: 'bold', backgroundColor: '#FFF7F2' }}>
        {initialData ? 'Editar Produto' : 'Novo Produto'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <TextField
          fullWidth
          label="Nome do Produto"
          value={form.name}
          onChange={handleChange('name')}
          margin="normal"
          sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#F6C1CC' }, '&.Mui-focused fieldset': { borderColor: '#C08A5A' } }, '& .MuiInputLabel-root.Mui-focused': { color: '#5A2D2D' } }}
        />
        <TextField
          fullWidth
          label="Preço (R$)"
          type="number"
          value={form.price}
          onChange={handleChange('price')}
          margin="normal"
          inputProps={{ step: '0.01' }}
          sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#F6C1CC' }, '&.Mui-focused fieldset': { borderColor: '#C08A5A' } }, '& .MuiInputLabel-root.Mui-focused': { color: '#5A2D2D' } }}
        />
        <TextField
          fullWidth
          label="Quantidade"
          type="number"
          value={form.quantity}
          onChange={handleChange('quantity')}
          margin="normal"
          inputProps={{ min: '0' }}
          sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#F6C1CC' }, '&.Mui-focused fieldset': { borderColor: '#C08A5A' } }, '& .MuiInputLabel-root.Mui-focused': { color: '#5A2D2D' } }}
        />
        <TextField
          fullWidth
          label="URL da Imagem (opcional)"
          value={form.image}
          onChange={handleChange('image')}
          margin="normal"
          sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#F6C1CC' }, '&.Mui-focused fieldset': { borderColor: '#C08A5A' } }, '& .MuiInputLabel-root.Mui-focused': { color: '#5A2D2D' } }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: '#5A2D2D' }}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#C08A5A', color: '#FFFFFF', '&:hover': { backgroundColor: '#5A2D2D' } }}>{initialData ? 'Atualizar' : 'Adicionar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
