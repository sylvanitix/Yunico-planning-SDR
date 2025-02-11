import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Card,
  CardContent,
} from '@mui/material';

function Skills() {
  const skillCategories = [
    {
      category: 'Growth Hacking',
      skills: [
        { name: 'Outbound B2B', level: 90, projects: 2 },
        { name: 'Cold Emailing', level: 85, projects: 2 },
        { name: 'Scraping No Code', level: 85, projects: 1 },
        { name: 'Automatisation', level: 80, projects: 2 },
      ],
    },
    {
      category: 'Marketing Digital',
      skills: [
        { name: 'FB Ads', level: 85, projects: 2 },
        { name: 'Web Ads', level: 80, projects: 2 },
        { name: 'Data Analysis', level: 75, projects: 2 },
        { name: 'Copywriting', level: 85, projects: 3 },
      ],
    },
    {
      category: 'Outils',
      skills: [
        { name: 'Hubspot', level: 85, projects: 1 },
        { name: 'Lemlist', level: 85, projects: 1 },
        { name: 'Make (Integromat)', level: 80, projects: 1 },
        { name: 'Sales Navigator', level: 85, projects: 1 },
      ],
    },
  ];

  const certifications = [
    { name: 'Mastère 2 Communication Digitale', date: '2023', issuer: 'European Communication School' },
    { name: 'Mastère 1 RP, Presse, Événementielle', date: '2022', issuer: 'European Communication School' },
    { name: 'Bachelor Communication & Marketing', date: '2022', issuer: 'European Communication School' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tableau des Compétences
      </Typography>
      <Grid container spacing={3}>
        {skillCategories.map((category) => (
          <Grid item xs={12} key={category.category}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {category.category}
              </Typography>
              <Grid container spacing={2}>
                {category.skills.map((skill) => (
                  <Grid item xs={12} sm={6} key={skill.name}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body1" sx={{ flexGrow: 1 }}>
                            {skill.name}
                          </Typography>
                          <Chip
                            label={`${skill.projects} projets`}
                            size="small"
                            color="primary"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ flexGrow: 1, mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={skill.level}
                              sx={{ height: 8, borderRadius: 4 }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {skill.level}%
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Certifications
            </Typography>
            <Grid container spacing={2}>
              {certifications.map((cert) => (
                <Grid item xs={12} sm={4} key={cert.name}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {cert.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {cert.issuer}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Obtenu en {cert.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Skills;
