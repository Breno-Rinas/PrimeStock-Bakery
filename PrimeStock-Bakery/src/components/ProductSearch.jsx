import React from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

const ProductSearch = ({ value, onChange, onAdd, placeholder = 'Buscar por nome do produto...' }) => {
  return (
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
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        onKeyPress={(e) => { if (e.key === 'Enter' && onAdd) onAdd(); }}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
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
  );
};

export default ProductSearch;
