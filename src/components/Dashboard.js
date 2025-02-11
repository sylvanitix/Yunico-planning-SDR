import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Visibility as ViewsIcon,
  TrendingUp as TrendingIcon,
  Person as PersonIcon,
  Business as CompanyIcon,
  School as CertificationIcon,
  Campaign as MarketingIcon,
  MoreVert as MoreIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  CalendarToday as CalendarIcon,
  NotificationsActive as NotificationIcon,
} from '@mui/icons-material';

function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleClick = (event, metric) => {
    setAnchorEl(event.currentTarget);
    setSelectedMetric(metric);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMetric(null);
  };

  const metrics = {
    views: {
      current: 245,
      previous: 180,
      change: '+36%',
      label: 'Vues du profil',
      icon: ViewsIcon,
      color: '#2196f3'
    },
    leads: {
      current: 12,
      previous: 8,
      change: '+50%',
      label: 'Nouveaux leads',
      icon: TrendingIcon,
      color: '#4caf50'
    },
    meetings: {
      current: 5,
      previous: 3,
      change: '+66%',
      label: 'Rendez-vous',
      icon: CalendarIcon,
      color: '#ff9800'
    },
    responses: {
      current: 8,
      previous: 5,
      change: '+60%',
      label: 'Réponses',
      icon: EmailIcon,
      color: '#f44336'
    }
  };

  const recentActivity = [
    {
      type: 'view',
      name: 'Tech Recruiter',
      company: 'Entreprise Innovation',
      time: 'Il y a 2h',
      avatar: '/company-logos/tech.png'
    },
    {
      type: 'contact',
      name: 'Lead Developer',
      company: 'Startup Prometteuse',
      time: 'Il y a 3h',
      avatar: '/company-logos/startup.png'
    },
    {
      type: 'certification',
      name: 'Growth Hacking Pro',
      company: 'Growth.co',
      time: 'Il y a 1j',
      avatar: '/company-logos/growth.png'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Entretien Tech Lead',
      company: 'Entreprise Innovation',
      date: 'Demain, 14:00',
      type: 'meeting'
    },
    {
      title: 'Certification Growth',
      company: 'Growth.co',
      date: 'Dans 2 jours',
      type: 'certification'
    },
    {
      title: 'Suivi Candidature',
      company: 'Startup Prometteuse',
      date: 'Dans 3 jours',
      type: 'follow-up'
    }
  ];

  const profileCompletion = {
    total: 92,
    sections: [
      { name: 'Informations', progress: 100 },
      { name: 'Expériences', progress: 95 },
      { name: 'Certifications', progress: 90 },
      { name: 'Projets', progress: 85 }
    ]
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Tableau de bord
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<NotificationIcon />}
          >
            3 nouvelles notifications
          </Button>
          <Button
            variant="contained"
            startIcon={<LinkedInIcon />}
          >
            Synchroniser LinkedIn
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Métriques */}
        {Object.entries(metrics).map(([key, metric]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Paper 
              sx={{ 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
              }}
            >
              <IconButton
                size="small"
                sx={{ position: 'absolute', right: 8, top: 8 }}
                onClick={(e) => handleClick(e, key)}
              >
                <MoreIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: metric.color, mr: 2 }}>
                  <metric.icon />
                </Avatar>
                <Typography variant="h6">
                  {metric.current}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                {metric.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingIcon sx={{ color: 'success.main', mr: 0.5, fontSize: '1rem' }} />
                <Typography variant="body2" color="success.main">
                  {metric.change} vs semaine précédente
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* Activité Récente */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Activité Récente
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={activity.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {activity.company}
                          </Typography>
                          {` — ${activity.time}`}
                        </>
                      }
                    />
                    <Chip
                      label={activity.type === 'view' ? 'Vue' : activity.type === 'contact' ? 'Contact' : 'Certification'}
                      size="small"
                      variant="outlined"
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Événements à venir */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              À venir
            </Typography>
            <List>
              {upcomingEvents.map((event, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: event.type === 'meeting' ? 'primary.main' : event.type === 'certification' ? 'secondary.main' : 'warning.main' }}>
                        {event.type === 'meeting' ? <CalendarIcon /> : event.type === 'certification' ? <CertificationIcon /> : <EmailIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {event.company}
                          </Typography>
                          {` — ${event.date}`}
                        </>
                      }
                    />
                    <Button size="small" variant="outlined">
                      Voir
                    </Button>
                  </ListItem>
                  {index < upcomingEvents.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Complétion du profil */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Complétion du profil
              </Typography>
              <Typography variant="h4" color="primary">
                {profileCompletion.total}%
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {profileCompletion.sections.map((section) => (
                <Grid item xs={12} sm={6} md={3} key={section.name}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {section.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={section.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 0.5 }}>
                    {section.progress}%
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Voir les détails</MenuItem>
        <MenuItem onClick={handleClose}>Exporter les données</MenuItem>
        <MenuItem onClick={handleClose}>Définir un objectif</MenuItem>
      </Menu>
    </Box>
  );
}

export default Dashboard;
