import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Registro:', formData);
    // Aqui você pode adicionar a lógica de registro
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF7F2'
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: '#FFFFFF',
            borderRadius: 2
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: '#5A2D2D',
                fontWeight: 'bold',
                mb: 1
              }}
            >
              PrimeStock-Bakery
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#C08A5A'
              }}
            >
              Crie sua conta
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome completo"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#F6C1CC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C08A5A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#5A2D2D',
                },
              }}
            />

            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#F6C1CC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C08A5A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#5A2D2D',
                },
              }}
            />

            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#F6C1CC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C08A5A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#5A2D2D',
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirmar senha"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#F6C1CC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C08A5A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#5A2D2D',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#C08A5A',
                color: '#FFFFFF',
                padding: '12px',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#5A2D2D',
                },
              }}
            >
              Cadastrar
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#5A2D2D' }}>
                Já tem uma conta?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/')}
                  sx={{
                    color: '#F6C1CC',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: '#C08A5A',
                    },
                  }}
                >
                  Faça login
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
