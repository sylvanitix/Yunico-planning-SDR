import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';

function Projects() {
  const projects = [
    {
      name: 'Growth Hacker Outbound B2B',
      company: 'Yunico',
      period: '2024',
      status: 'En cours',
      progress: 100,
      technologies: ['Hubspot', 'Lemlist', 'Dropcontact', 'Sales Navigator'],
      description: 'Mise en place et optimisation des stratégies d\'outbound B2B',
    },
    {
      name: 'Growth Hacker Ops',
      company: 'BD Multimedia',
      period: '2023',
      status: 'Terminé',
      progress: 100,
      technologies: ['Scraping No Code', 'Automatisation (Make)', 'AI', 'Cold Emailing'],
      description: 'Développement et automatisation des processus de growth hacking',
    },
    {
      name: 'Chargé de Communication',
      company: 'Centaure Avocats',
      period: '2022',
      status: 'Terminé',
      progress: 100,
      technologies: ['Création de contenu RS', 'Graphisme', 'Web Ads', 'Newsletters'],
      description: 'Gestion de la communication digitale et création de contenu',
    },
    {
      name: 'Social Media Manager',
      company: 'Taliacademie',
      period: '2021',
      status: 'Terminé',
      progress: 100,
      technologies: ['FB Ads', 'Data Analyst', 'Graphisme', 'Copywriting'],
      description: 'Gestion des réseaux sociaux et analyse des performances',
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return 'success';
      case 'En cours':
        return 'warning';
      case 'En attente':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Pipeline Projets
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.name}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {project.name}
                </Typography>
                <Chip
                  label={project.status}
                  color={getStatusColor(project.status)}
                  sx={{ ml: 2 }}
                />
              </Box>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography color="text.secondary" gutterBottom>
                        Entreprise
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {project.company}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        Période
                      </Typography>
                      <Typography variant="body1">
                        {project.period}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography color="text.secondary" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography color="text.secondary" gutterBottom>
                          Progression
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Typography color="text.secondary" gutterBottom>
                      Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Projects;
