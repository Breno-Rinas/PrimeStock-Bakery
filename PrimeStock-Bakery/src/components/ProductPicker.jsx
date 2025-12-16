import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    CircularProgress,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ProductPicker = ({ open, onClose, onAdded }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addingId, setAddingId] = useState(null);

    useEffect(() => {
        if (!open) return;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3002/product/todos');
                const json = await res.json();
                const list = json.products || [];
                const mapped = list.map(p => ({
                    id: p.id,
                    name: p.name || p.nome || p.product_name || 'Produto',
                    price: Number(p.price ?? p.valor ?? 0),
                    image: p.image_url || p.image || ''
                }));
                setProducts(mapped);
            } catch (err) {
                console.error('Erro ao carregar produtos para picker:', err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [open]);

    const handleAdd = async (product) => {
        setAddingId(product.id);
        try {
            const payload = {
                product_id: product.id,
                product_name: product.name,
                quantity: 10,
                product_unit: '',
                priority: 'normal',
                status: 'pending'
            };
            const res = await fetch('http://localhost:3002/shopping-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Erro ao adicionar item');
            }
            const created = await res.json();
            const item = {
                id: created.id || payload.id,
                item: created.product_name || payload.product_name,
                quantity: String(created.quantity || payload.quantity),
                completed: (created.status === 'completed') || false,
                priority: created.priority || payload.priority
            };
            onAdded?.(item);
            onClose?.();
        } catch (err) {
            console.error('Erro ao adicionar produto na lista:', err);
        } finally {
            setAddingId(null);
        }
    };

    return (
        <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Selecione um produto
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : products.length === 0 ? (
                    <Typography sx={{ p: 2 }}>Nenhum produto cadastrado.</Typography>
                ) : (
                    <List>
                        {products.map(p => (
                            <ListItem disablePadding key={p.id}>
                                <ListItemButton onClick={() => handleAdd(p)} disabled={addingId === p.id}>
                                    <ListItemAvatar>
                                        <Avatar src={p.image} alt={p.name} />
                                    </ListItemAvatar>
                                    <ListItemText primary={p.name} secondary={`R$ ${p.price.toFixed(2)}`} />
                                    {addingId === p.id && <CircularProgress size={20} />}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProductPicker;
