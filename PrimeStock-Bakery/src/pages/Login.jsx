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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Aqui você pode adicionar a lógica de autenticação
    // Por enquanto, redireciona direto para o dashboard
    navigate('/dashboard');
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
              Bem-vindo de volta!
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
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
              Entrar
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#5A2D2D' }}>
                Não tem uma conta?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/register')}
                  sx={{
                    color: '#F6C1CC',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: '#C08A5A',
                    },
                  }}
                >
                  Cadastre-se
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
