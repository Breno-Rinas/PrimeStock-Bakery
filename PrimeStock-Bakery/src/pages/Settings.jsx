import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Switch,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  ShoppingBasket as ShoppingBasketIcon
} from '@mui/icons-material';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: 'João Silva',
    email: 'joao@primestock.com',
    phone: '(11) 98765-4321',
    company: 'PrimeStock-Bakery'
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: false,
    weeklyReport: true
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const drawerWidth = 240;

  const handleSaveProfile = () => {
    setUserProfile(tempProfile);
    setEditingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancelEdit = () => {
    setTempProfile(userProfile);
    setEditingProfile(false);
  };

  const handleNotificationChange = (key) => {
    const updatedNotifications = { ...notifications, [key]: !notifications[key] };
    setNotifications(updatedNotifications);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (security.newPassword === security.confirmPassword && security.newPassword) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setOpenPasswordDialog(false);
    }
  };

  

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF7F2' }}>
        <Menu />

      {/* Conteúdo principal */}
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

          {/* Abas de navegação */}
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
              <Button
                fullWidth={isMobile}
                onClick={() => setActiveTab('notifications')}
                startIcon={<NotificationsIcon />}
                sx={{
                  justifyContent: { xs: 'flex-start', sm: 'center' },
                  p: 2,
                  borderBottom: activeTab === 'notifications' ? '3px solid #C08A5A' : 'none',
                  color: activeTab === 'notifications' ? '#C08A5A' : '#5A2D2D',
                  fontWeight: activeTab === 'notifications' ? 'bold' : 'normal',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#FFF7F2'
                  }
                }}
              >
                Notificações
              </Button>
              <Button
                fullWidth={isMobile}
                onClick={() => setActiveTab('security')}
                startIcon={<LockIcon />}
                sx={{
                  justifyContent: { xs: 'flex-start', sm: 'center' },
                  p: 2,
                  borderBottom: activeTab === 'security' ? '3px solid #C08A5A' : 'none',
                  color: activeTab === 'security' ? '#C08A5A' : '#5A2D2D',
                  fontWeight: activeTab === 'security' ? 'bold' : 'normal',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#FFF7F2'
                  }
                }}
              >
                Segurança
              </Button>
            </Box>
          </Paper>

          {/* Conteúdo das abas */}
          {activeTab === 'profile' && (
            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#5A2D2D', fontWeight: 'bold', flex: 1 }}>
                  Informações Pessoais
                </Typography>
                {!editingProfile && (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setEditingProfile(true)}
                    sx={{
                      color: '#C08A5A',
                      textTransform: 'none'
                    }}
                  >
                    Editar
                  </Button>
                )}
              </Box>

              {editingProfile ? (
                <Box>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
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
                  />
                  <TextField
                    fullWidth
                    label="E-mail"
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
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
                  />
                  <TextField
                    fullWidth
                    label="Telefone"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
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
                  />
                  <TextField
                    fullWidth
                    label="Empresa"
                    value={tempProfile.company}
                    onChange={(e) => setTempProfile({ ...tempProfile, company: e.target.value })}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
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
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveProfile}
                      sx={{
                        backgroundColor: '#C08A5A',
                        color: '#FFFFFF',
                        '&:hover': {
                          backgroundColor: '#5A2D2D'
                        }
                      }}
                    >
                      Salvar
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      sx={{
                        color: '#5A2D2D',
                        border: '1px solid #5A2D2D'
                      }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              ) : (
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
                      Telefone
                    </Typography>
                    <Typography sx={{ color: '#5A2D2D', fontWeight: 'bold' }}>
                      {userProfile.phone}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography sx={{ color: '#C08A5A', fontSize: '0.9rem' }}>
                      Empresa
                    </Typography>
                    <Typography sx={{ color: '#5A2D2D', fontWeight: 'bold' }}>
                      {userProfile.company}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>
          )}

          {activeTab === 'notifications' && (
            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: '#5A2D2D', fontWeight: 'bold', mb: 3 }}>
                Preferências de Notificações
              </Typography>

              <List>
                <ListItem
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={notifications.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#C08A5A'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#C08A5A'
                        }
                      }}
                    />
                  }
                  sx={{ borderBottom: '1px solid #E0E0E0' }}
                >
                  <ListItemText
                    primary="Notificações por E-mail"
                    secondary="Receba atualizações importantes por e-mail"
                    primaryTypographyProps={{ sx: { color: '#5A2D2D', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ sx: { color: '#C08A5A' } }}
                  />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={notifications.pushNotifications}
                      onChange={() => handleNotificationChange('pushNotifications')}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#C08A5A'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#C08A5A'
                        }
                      }}
                    />
                  }
                  sx={{ borderBottom: '1px solid #E0E0E0' }}
                >
                  <ListItemText
                    primary="Notificações Push"
                    secondary="Receba notificações em tempo real"
                    primaryTypographyProps={{ sx: { color: '#5A2D2D', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ sx: { color: '#C08A5A' } }}
                  />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={notifications.orderUpdates}
                      onChange={() => handleNotificationChange('orderUpdates')}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#C08A5A'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#C08A5A'
                        }
                      }}
                    />
                  }
                  sx={{ borderBottom: '1px solid #E0E0E0' }}
                >
                  <ListItemText
                    primary="Atualizações de Pedidos"
                    secondary="Notificações sobre status dos pedidos"
                    primaryTypographyProps={{ sx: { color: '#5A2D2D', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ sx: { color: '#C08A5A' } }}
                  />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={notifications.promotions}
                      onChange={() => handleNotificationChange('promotions')}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#C08A5A'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#C08A5A'
                        }
                      }}
                    />
                  }
                  sx={{ borderBottom: '1px solid #E0E0E0' }}
                >
                  <ListItemText
                    primary="Promoções e Ofertas"
                    secondary="Receba informações sobre promoções especiais"
                    primaryTypographyProps={{ sx: { color: '#5A2D2D', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ sx: { color: '#C08A5A' } }}
                  />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <Switch
                      edge="end"
                      checked={notifications.weeklyReport}
                      onChange={() => handleNotificationChange('weeklyReport')}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#C08A5A'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#C08A5A'
                        }
                      }}
                    />
                  }
                >
                  <ListItemText
                    primary="Relatório Semanal"
                    secondary="Receba um resumo semanal das atividades"
                    primaryTypographyProps={{ sx: { color: '#5A2D2D', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ sx: { color: '#C08A5A' } }}
                  />
                </ListItem>
              </List>
            </Paper>
          )}

          {activeTab === 'security' && (
            <Paper sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: '#5A2D2D', fontWeight: 'bold', mb: 3 }}>
                Segurança da Conta
              </Typography>

              <Button
                variant="contained"
                startIcon={<LockIcon />}
                onClick={() => setOpenPasswordDialog(true)}
                sx={{
                  backgroundColor: '#C08A5A',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#5A2D2D'
                  }
                }}
              >
                Alterar Senha
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" sx={{ color: '#5A2D2D', mb: 2 }}>
                <strong>Dicas de Segurança:</strong>
              </Typography>
              <ul style={{ color: '#C08A5A', marginLeft: '20px' }}>
                <li>Use uma senha forte com letras, números e símbolos</li>
                <li>Não compartilhe sua senha com ninguém</li>
                <li>Altere sua senha regularmente</li>
                <li>Faça logout em dispositivos públicos</li>
              </ul>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Dialog de alterar senha */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: '#FFFFFF'
          }
        }}
      >
        <DialogTitle
          sx={{
            color: '#5A2D2D',
            fontWeight: 'bold',
            backgroundColor: '#FFF7F2'
          }}
        >
          Alterar Senha
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Senha Atual"
            type="password"
            value={security.currentPassword}
            onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
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
          />
          <TextField
            fullWidth
            label="Nova Senha"
            type="password"
            value={security.newPassword}
            onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
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
          />
          <TextField
            fullWidth
            label="Confirmar Nova Senha"
            type="password"
            value={security.confirmPassword}
            onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
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
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenPasswordDialog(false)}
            sx={{ color: '#5A2D2D' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            sx={{
              backgroundColor: '#C08A5A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#5A2D2D'
              }
            }}
          >
            Alterar Senha
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
