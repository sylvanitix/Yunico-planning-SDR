import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';

const companies = [
  {
    id: 1,
    name: 'EraB2B',
    role: 'Growth Hacker • Freelance',
    status: 'En Poste',
    description: 'Développement de stratégies de growth hacking B2B pour maximiser la croissance et l\'acquisition de clients.',
    skills: ['Growth Hacking', 'Marketing B2B', 'Prospection'],
    score: 100,
    period: 'Déc. 2024 - Aujourd\'hui',
    location: 'À distance'
  },
  {
    id: 2,
    name: 'Yunico',
    role: 'Growth Hacker • Freelance',
    status: 'En Poste',
    description: 'Utilisation de HubSpot comme CRM central, Sales Navigator pour l\'identification des prospects, et Lemlist pour l\'automatisation des séquences d\'emails. Mise en place de stratégies d\'acquisition et optimisation continue du ROI.',
    skills: ['Growth Hacking', 'Marketing B2B', 'CRM', 'Automatisation'],
    score: 100,
    period: 'Juin 2024 - Aujourd\'hui',
    location: 'À distance'
  },
  {
    id: 3,
    name: 'Skillcamp',
    role: 'Responsable des partenariats • E-sport',
    status: 'En Poste',
    description: 'Structure E-sport en division 2 LFL. Gestion des partenariats et développement commercial.',
    skills: ['Partenariats', 'E-sport', 'Développement commercial'],
    score: 95,
    period: 'Mars 2024 - Aujourd\'hui',
    location: 'Paris'
  },
  {
    id: 4,
    name: 'BD Multimedia',
    role: 'Growth Hacker • Alternance',
    status: 'Expérience Passée',
    description: 'Mise en place de stratégies de growth hacking et marketing digital.',
    skills: ['Growth Hacking', 'Marketing Digital'],
    score: 90,
    period: 'Avr. 2023 - Sept. 2023',
    location: 'Paris'
  },
  {
    id: 5,
    name: 'Centaure Avocats',
    role: 'Chargé de communication • Alternance',
    status: 'Expérience Passée',
    description: 'Planification et mise en place de stratégies de communication, création de supports, organisation d\'événements et gestion des newsletters.',
    skills: ['Communication', 'Marketing', 'Événementiel', 'Newsletter'],
    score: 85,
    period: 'Sept. 2022 - Févr. 2023',
    location: 'Paris'
  },
  {
    id: 6,
    name: 'TaliAcademie.com',
    role: 'Social Media Manager • Stage',
    status: 'Expérience Passée',
    description: 'Gestion des réseaux sociaux, création de contenu, montage vidéo et analyse des performances.',
    skills: ['Social Media', 'Création de contenu', 'Montage vidéo'],
    score: 80,
    period: 'Janv. 2022 - Juin 2022',
    location: 'Paris'
  },
  {
    id: 7,
    name: 'Epsilon eSports',
    role: 'Communication 360° • Stage',
    status: 'Expérience Passée',
    description: 'Organisation d\'événements, gestion de projet, coordination des équipes et promotion événementielle.',
    skills: ['Événementiel', 'Communication', 'Gestion de projet'],
    score: 75,
    period: 'Mars 2019 - Juin 2019',
    location: 'Bruxelles'
  }
];

export default function Entreprises() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Entreprises
        </Typography>
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          size="small"
        >
          Filtres
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher par nom d'entreprise, industrie ou poste..."
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entreprise</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Réalisations</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Période</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow 
                key={company.id}
                hover
                sx={{ 
                  '&:hover': { bgcolor: 'action.hover' },
                  cursor: 'pointer'
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'grey.200', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        color: 'primary.main'
                      }}
                    >
                      {company.name[0]}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {company.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {company.role}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={company.status}
                    size="small"
                    sx={{ 
                      bgcolor: company.status === 'En Poste' ? 'success.light' : 'grey.100',
                      color: company.status === 'En Poste' ? 'success.dark' : 'text.secondary',
                      '& .MuiChip-label': { px: 1 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {company.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderColor: 'grey.300',
                          color: 'text.primary',
                        }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 600 
                      }}
                    >
                      {company.score}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{company.period}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {company.location}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
