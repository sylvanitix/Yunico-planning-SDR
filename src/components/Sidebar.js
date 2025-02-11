import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Divider,
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FilterNone as PipelineIcon,
  People as ContactsIcon,
  Business as CompaniesIcon,
  Campaign as MarketingIcon,
  Language as WebScraperIcon,
  AutoAwesome as InnovationIcon,
  Keyboard as KeyboardIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import Logo from './Logo';

const drawerWidth = 240;

const menuItems = [
  { path: '/', label: 'Tableau de bord', icon: DashboardIcon, shortcut: 'Alt+1' },
  { path: '/pipeline', label: 'Pipeline', icon: PipelineIcon, shortcut: 'Alt+2' },
  { path: '/contacts', label: 'Contacts', icon: ContactsIcon, shortcut: 'Alt+3' },
  { path: '/companies', label: 'Entreprises', icon: CompaniesIcon, shortcut: 'Alt+4' },
  { path: '/marketing', label: 'Marketing', icon: MarketingIcon, shortcut: 'Alt+5' },
  { path: '/webscraper', label: 'Web Scraper', icon: WebScraperIcon, shortcut: 'Alt+6' },
  { path: '/innovation', label: 'Innovation Lab', icon: InnovationIcon, shortcut: 'Alt+7' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        const menuItem = menuItems[parseInt(event.key) - 1];
        if (menuItem) {
          navigate(menuItem.path);
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '?' && event.shiftKey) {
        setShowShortcuts(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Toolbar>
        <Logo />
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <Tooltip 
                title={`${item.label} (${item.shortcut})`} 
                placement="right"
              >
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                      color: location.pathname === item.path ? 'white' : 'inherit',
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Tooltip title="Afficher les raccourcis (Shift + ?)" placement="right">
          <ListItemButton
            onClick={() => setShowShortcuts(true)}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
              <KeyboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Raccourcis"
              primaryTypographyProps={{
                fontSize: '0.75rem',
                color: 'text.secondary',
              }}
            />
          </ListItemButton>
        </Tooltip>
      </Box>

      <Dialog
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Raccourcis clavier
          <IconButton
            aria-label="close"
            onClick={() => setShowShortcuts(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  secondary={item.shortcut}
                />
              </ListItem>
            ))}
            <Divider sx={{ my: 2 }} />
            <ListItem>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Recherche globale"
                secondary="Ctrl + K"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Notifications"
                secondary="Ctrl + N"
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </Drawer>
  );
}

export default Sidebar;
