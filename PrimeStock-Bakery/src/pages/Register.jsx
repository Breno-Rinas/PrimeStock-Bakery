import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'comprador' 
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setSubmitError('As senhas não coincidem!');
      return;
    }
    const doRegister = async () => {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      try {
        const roleMap = { confeiteiro: 1, comprador: 2 };
        const role_id = roleMap[formData.role] ?? 2;

        const payload = {
          username: formData.email,
          password: formData.password,
          name: formData.name,
          role_id
        };

        const res = await fetch('http://localhost:3002/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const textBody = await res.text();
          let parsed = null;
          try {
            parsed = JSON.parse(textBody);
          } catch {
            parsed = null;
          }
          const message = (parsed && (parsed.message || parsed.error)) || textBody || '';
          if (res.status === 409 || /e-?mail|email|já cadastrado|already exists/i.test(message)) {
            throw new Error('Usuário com esse e-mail já existe');
          }
          throw new Error(message || 'Erro ao criar usuário');
        }

        setSubmitSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      } catch (err) {
        console.error(err);
        setSubmitError(err.message || 'Erro no cadastro');
      } finally {
        setSubmitting(false);
      }
    };

    doRegister();
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

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend" sx={{ color: '#5A2D2D', mb: 1 }}>Sou:</FormLabel>
              <RadioGroup
                row
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <FormControlLabel value="confeiteiro" control={<Radio sx={{ color: '#C08A5A' }} />} label="Confeiteiro" />
                <FormControlLabel value="comprador" control={<Radio sx={{ color: '#C08A5A' }} />} label="Comprador" />
              </RadioGroup>
            </FormControl>

            {submitError && (
              <Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>
            )}

            {submitSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>Cadastro realizado com sucesso! Redirecionando para login...</Alert>
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
              {submitting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Cadastrar'}
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
