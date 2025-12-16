import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeWithClear = (e) => {
    if (loginError) setLoginError(null);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLoginError(null);
    const doLogin = async () => {
      try {
        const res = await fetch('http://localhost:3002/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: formData.email, password: formData.password })
        });

        if (!res.ok) {
          const txt = await res.text();
          setLoginError(txt || 'Login falhou');
          return;
        }

        const json = await res.json();
        const token = json.token;
        if (!token) {
          setLoginError('Token não retornado pelo servidor');
          return;
        }

        localStorage.setItem('token', token);

        try {
          const meRes = await fetch('http://localhost:3002/auth/me');
          if (!meRes.ok) throw new Error('Não foi possível obter usuário');
          const meJson = await meRes.json();
          const user = meJson.user || {};
          let permissions = meJson.permissions || [];
          if (user.role_id === 2 && !permissions.includes('settings')) permissions.push('settings');

          const userWithPerms = { ...user, permissions };
          localStorage.setItem('user', JSON.stringify(userWithPerms));

          if (permissions.includes('dashboard')) {
            navigate('/dashboard');
          } else if (permissions.includes('shopping-list') || permissions.includes('shopping')) {
            navigate('/shopping');
          } else {
            navigate('/dashboard');
          }
        } catch (err) {
          console.warn('Erro ao obter /me:', err);
          navigate('/dashboard');
        }
      } catch (err) {
        console.error(err);
        setLoginError(err.message || 'Erro ao efetuar login');
      } finally {
        setSubmitting(false);
      }
    };

    doLogin();
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
              onChange={handleChangeWithClear}
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
              onChange={handleChangeWithClear}
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

            {loginError && (
              <Alert severity="error" sx={{ mt: 2 }}>{loginError}</Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitting}
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
              {submitting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Entrar'}
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
