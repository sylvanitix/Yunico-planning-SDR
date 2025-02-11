import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

function Header() {
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

  const notifications = [
    {
      id: 1,
      type: 'view',
      title: 'Nouveau visiteur',
      message: 'Un recruteur a consulté votre profil',
      time: 'Il y a 2h',
      avatar: '/company-logos/tech.png',
      unread: true
    },
    {
      id: 2,
      type: 'contact',
      title: 'Nouvelle opportunité',
      message: 'Une entreprise souhaite vous contacter',
      time: 'Il y a 3h',
      avatar: '/company-logos/startup.png',
      unread: true
    },
    {
      id: 3,
      type: 'certification',
      title: 'Certification à renouveler',
      message: 'Votre certification Growth expire bientôt',
      time: 'Il y a 1j',
      avatar: '/company-logos/growth.png',
      unread: false
    }
  ];

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleSettingsOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800,
              fontFamily: 'monospace',
              letterSpacing: 1,
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            C
            <Typography
              component="span"
              variant="h4"
              sx={{
                color: 'error.main',
                fontWeight: 800,
                fontFamily: 'monospace',
                fontSize: '1.8rem',
                mx: 0.2,
              }}
            >
              v
            </Typography>
            RM
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="large"
            aria-label="aide"
            color="inherit"
          >
            <HelpIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="afficher les notifications"
            color="inherit"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="paramètres du compte"
            color="inherit"
            onClick={handleSettingsOpen}
          >
            <SettingsIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsClose}
          PaperProps={{
            sx: { width: 360 }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Notifications</Typography>
            <Typography variant="body2" color="text.secondary">
              2 nouvelles notifications
            </Typography>
          </Box>
          <Divider />
          <List sx={{ py: 0 }}>
            {notifications.map((notification) => (
              <ListItem 
                key={notification.id}
                sx={{ 
                  bgcolor: notification.unread ? 'action.hover' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemAvatar>
                  <Avatar src={notification.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {notification.message}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Typography 
              variant="body2" 
              color="primary" 
              align="center" 
              sx={{ cursor: 'pointer' }}
            >
              Voir toutes les notifications
            </Typography>
          </Box>
        </Menu>

        <Menu
          anchorEl={settingsAnchorEl}
          open={Boolean(settingsAnchorEl)}
          onClose={handleSettingsClose}
        >
          <MenuItem onClick={handleSettingsClose}>Mon profil</MenuItem>
          <MenuItem onClick={handleSettingsClose}>Paramètres</MenuItem>
          <MenuItem onClick={handleSettingsClose}>Préférences</MenuItem>
          <Divider />
          <MenuItem onClick={handleSettingsClose}>Se déconnecter</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
