import React from 'react';
import { Card, CardMedia, CardContent, Typography, Divider, Box, IconButton } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProductCard = ({ product, onIncrease, onDecrease, onDelete }) => {
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
              onClick={() => onDecrease(product.id)}
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
              onClick={() => onIncrease(product.id)}
              sx={{ color: '#C08A5A' }}
            >
              <AddCircleIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton
            size="small"
            onClick={() => onDelete(product.id)}
            sx={{ color: '#F6C1CC' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
