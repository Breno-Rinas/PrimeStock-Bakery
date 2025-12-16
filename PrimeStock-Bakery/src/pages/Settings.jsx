import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
} from '@mui/icons-material';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [_mobileOpen, _setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, _setSaveSuccess] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    role_id: null
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);

  const drawerWidth = 240;
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    let parsed;
    try {
      parsed = JSON.parse(stored);
    } catch {
      console.warn('Could not parse stored user');
      return;
    }
    const id = parsed && parsed.id;
    if (!id) return;

    const fetchProfile = async () => {
      setLoadingProfile(true);
      setProfileError(null);
      try {
        const res = await fetch(`http://localhost:3002/user/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar usuário');
        const data = await res.json();
        setUserProfile((prev) => ({
          ...prev,
          name: data.name || prev.name,
          email: data.email || prev.email,
          role_id: data.role_id ?? prev.role_id
        }));
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setProfileError(err.message || 'Erro ao carregar perfil');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      const permissions = parsed && parsed.permissions ? parsed.permissions : [];
      if (!Array.isArray(permissions) || !permissions.includes('settings')) {
        if (Array.isArray(permissions) && permissions.includes('shopping-list')) {
          navigate('/shopping');
        } else if (Array.isArray(permissions) && permissions.includes('dashboard')) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch {
    }
  }, []);



  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF7F2' }}>
      <Menu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 }
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: '#5A2D2D',
              fontWeight: 'bold'
            }}
          >
            Configurações
          </Typography>

          {saveSuccess && (
            <Alert
              severity="success"
              sx={{ mb: 3, backgroundColor: '#C08A5A', color: '#FFFFFF' }}
            >
              Configurações salvas com sucesso!
            </Alert>
          )}

          {loadingProfile && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Carregando perfil...
            </Alert>
          )}

          {profileError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {profileError}
            </Alert>
          )}
          <Paper sx={{ mb: 3, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                borderBottom: '1px solid #E0E0E0'
              }}
            >
              <Button
                fullWidth={isMobile}
                onClick={() => setActiveTab('profile')}
                startIcon={<PersonIcon />}
                sx={{
                  justifyContent: { xs: 'flex-start', sm: 'center' },
                  p: 2,
                  borderBottom: activeTab === 'profile' ? '3px solid #C08A5A' : 'none',
                  color: activeTab === 'profile' ? '#C08A5A' : '#5A2D2D',
                  fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#FFF7F2'
                  }
                }}
              >
                Perfil
              </Button>
            </Box>
          </Paper>
          {activeTab === 'profile' && (
            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#5A2D2D', fontWeight: 'bold' }}>
                  Informações Pessoais
                </Typography>
              </Box>

              <Box>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#C08A5A', fontSize: '0.9rem' }}>
                    Nome Completo
                  </Typography>
                  <Typography sx={{ color: '#5A2D2D', fontWeight: 'bold' }}>
                    {userProfile.name}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#C08A5A', fontSize: '0.9rem' }}>
                    E-mail
                  </Typography>
                  <Typography sx={{ color: '#5A2D2D', fontWeight: 'bold' }}>
                    {userProfile.email}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#C08A5A', fontSize: '0.9rem' }}>
                    Papel
                  </Typography>
                  <Typography sx={{ color: '#5A2D2D', fontWeight: 'bold' }}>
                    {(() => {
                      const map = { 1: 'Confeiteiro', 2: 'Comprador' };
                      return map[userProfile.role_id] || 'Usuário';
                    })()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Settings;
