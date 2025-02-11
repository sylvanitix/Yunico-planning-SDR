import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

export const companies = [
  {
    id: 1,
    name: 'EraB2B',
    role: 'Account Manager • SaaS B2B',
    status: 'En Poste',
    skills: ['Account Management', 'Business Development', 'Social Selling', 'CRM', 'Sales'],
    score: 100,
    period: 'Déc. 2024 - Présent',
    description: `Account Manager B2B spécialisé dans la gestion et le développement de comptes stratégiques.

🎯 Gestion de Comptes :
• Développement et fidélisation d'un portefeuille de clients B2B stratégiques
• Atteinte de 150% des objectifs de croissance sur les comptes existants
• Mise en place de stratégies d'expansion et de cross-selling
• Gestion de comptes représentant un CA annuel de 500K€+

💡 Business Development :
• Identification et qualification d'opportunités de développement
• Élaboration de propositions commerciales sur mesure
• Négociation et closing de contrats stratégiques
• Construction de relations long-terme avec les décideurs clés

🚀 Résultats & Impact :
• Augmentation de 120% du revenu moyen par compte
• Taux de rétention client de 95%
• Développement de 3 comptes majeurs générant 40% du CA
• Mise en place d'un processus de suivi client optimisé`,
    location: 'À distance'
  },
  {
    id: 2,
    name: 'Yunico',
    role: 'Growth Hacker • SaaS B2B',
    status: 'En Poste',
    skills: ['Growth Hacking', 'Marketing B2B', 'CRM', 'Automatisation', 'Social Selling'],
    score: 100,
    period: 'Juin 2024 - Présent',
    description: `Expert en Growth Marketing B2B focalisé sur l'optimisation des processus commerciaux et l'automatisation intelligente.

🎯 Réalisations Principales :
• Configuration avancée de HubSpot comme hub central avec personnalisation poussée des workflows
• Développement d'une stratégie de prospection LinkedIn générant 100+ leads qualifiés par mois
• Mise en place de séquences d'emails personnalisées avec un taux d'ouverture de 45%
• Création d'un système de scoring leads multicritères

💡 Optimisations & Automatisations :
• Intégration complète de la stack marketing (HubSpot, Sales Navigator, Lemlist, Make)
• Développement de templates de prospection personnalisés augmentant le taux de réponse de 80%
• Création de workflows d'enrichissement et de qualification automatiques
• Mise en place d'un système de reporting automatisé

🚀 Résultats Mesurables :
• Augmentation de 200% du pipeline commercial en 6 mois
• Réduction de 70% du temps de prospection manuelle
• Amélioration du taux de conversion de 35%
• ROI marketing multiplié par 3`,
    location: 'À distance'
  },
  {
    id: 3,
    name: 'Skillcamp',
    role: 'Responsable des partenariats • E-sport',
    status: 'En Poste',
    skills: ['Partenariats', 'Growth Hacking', 'E-sport', 'Marketing Digital'],
    score: 95,
    period: 'Mars 2024 - Présent',
    description: `Responsable du développement et de la gestion des partenariats stratégiques dans l'écosystème e-sport.

🎯 Développement Commercial :
• Identification et acquisition de 20+ partenaires stratégiques majeurs
• Négociation et closing de contrats de sponsoring d'une valeur totale de 500K€
• Création d'offres de partenariat personnalisées à haute valeur ajoutée
• Développement de nouvelles opportunités de revenus

💡 Stratégie & Innovation :
• Mise en place d'une stratégie de prospection digitale ciblée
• Création d'un programme d'activation des partenariats innovant
• Développement de KPIs spécifiques au secteur e-sport
• Organisation d'événements exclusifs pour les partenaires

🚀 Impact Business :
• Croissance de 150% du revenu partenariats en 6 mois
• Taux de rétention des partenaires de 90%
• Augmentation de 200% de la visibilité de la marque
• Création de 5 nouveaux formats d'activation digitale`,
    location: 'À distance'
  },
  {
    id: 4,
    name: 'BD Multimedia',
    role: 'Growth Hacker • Marketing Digital',
    status: 'Expérience Passée',
    skills: ['Growth Hacking', 'Marketing Digital', 'Analytics', 'Social Media', 'SEO'],
    score: 90,
    period: 'Avr. 2023 - Sept. 2023',
    description: `Expert en Growth Hacking et Marketing Digital spécialisé dans l'acquisition et la conversion.

🎯 Réalisations Marketing :
• Développement et exécution de campagnes marketing générant +150% de trafic qualifié
• Mise en place d'une stratégie SEO multipliant par 3 la visibilité organique
• Optimisation des tunnels de conversion augmentant le taux de conversion de 40%
• Création et test de multiples landing pages avec A/B testing

💡 Innovation & Analytics :
• Implémentation d'un système de tracking avancé avec Google Analytics 4
• Création de dashboards de performance personnalisés
• Développement de stratégies d'acquisition innovantes
• Mise en place d'automatisations marketing via Zapier

🚀 Résultats Clés :
• Augmentation de 200% du ROI des campagnes marketing
• Réduction de 45% du coût d'acquisition client
• Amélioration de 60% du taux d'engagement social media
• Croissance de 180% du nombre de leads générés`,
    location: 'Paris'
  },
  {
    id: 5,
    name: 'Centaure Avocats',
    role: 'Chargé de communication • Cabinet d\'avocats',
    status: 'Expérience Passée',
    skills: ['Communication', 'Marketing', 'Événementiel', 'Relations Publiques', 'Content Strategy'],
    score: 85,
    period: 'Sept. 2022 - Févr. 2023',
    description: `Responsable de la stratégie de communication globale et du développement de la présence digitale du cabinet.

🎯 Stratégie & Communication :
• Élaboration et déploiement d'une stratégie de communication 360°
• Organisation de 5 événements professionnels majeurs (50-200 participants)
• Création d'une newsletter mensuelle avec un taux d'ouverture de 35%
• Développement de partenariats stratégiques avec des médias juridiques

💡 Marketing Digital & Contenu :
• Refonte complète de l'identité visuelle du cabinet
• Production de contenus experts (articles, white papers, podcasts)
• Gestion et animation des réseaux sociaux professionnels
• Mise en place d'une stratégie de content marketing B2B

🚀 Impact & Performance :
• Augmentation de 120% de la visibilité du cabinet
• Croissance de 80% de l'engagement LinkedIn
• Génération de 30+ opportunités business via le digital
• Amélioration de 90% de la réputation en ligne`,
    location: 'Paris'
  },
  {
    id: 6,
    name: 'TaliAcademie.com',
    role: 'Social Media Manager • E-learning',
    status: 'Expérience Passée',
    skills: ['Social Media', 'Création de contenu', 'Montage vidéo', 'Community Management', 'Analytics'],
    score: 80,
    period: 'Janv. 2022 - Juin 2022',
    description: `Expert en gestion des réseaux sociaux et création de contenu pour une plateforme e-learning en croissance.

🎯 Content & Social Media :
• Création et gestion de contenus pour 5 plateformes sociales majeures
• Production de 100+ vidéos éducatives optimisées pour chaque plateforme
• Développement d'une stratégie de contenu viral générant 1M+ de vues
• Animation d'une communauté de 50K+ membres

💡 Créativité & Production :
• Mise en place d'un workflow de production vidéo optimisé
• Création de formats innovants augmentant l'engagement de 150%
• Développement d'une charte graphique cohérente
• Production de contenus pédagogiques engageants

🚀 Performances & Croissance :
• Croissance organique de 200% des abonnés en 6 mois
• Augmentation de 300% du taux d'engagement moyen
• Amélioration de 80% du temps de visionnage
• Génération de 40% du trafic site via les réseaux sociaux`,
    location: 'Paris'
  },
  {
    id: 7,
    name: 'Epsilon eSports',
    role: 'Communication 360° • E-sport',
    status: 'Expérience Passée',
    skills: ['Événementiel', 'Communication', 'Gestion de projet', 'Relations Presse', 'Sponsoring'],
    score: 75,
    period: 'Mars 2019 - Juin 2019',
    description: `Chef de projet événementiel et communication dans l'industrie de l'e-sport.

🎯 Gestion Événementielle :
• Organisation de 3 tournois majeurs avec 500+ participants chacun
• Coordination d'une équipe de 20 personnes
• Gestion de budgets événementiels de 50K€+
• Négociation et gestion des partenariats techniques

💡 Communication & RP :
• Développement de plans de communication événementielle
• Relations presse et obtention de 15+ retombées médiatiques
• Création de supports de communication impactants
• Gestion des relations avec les équipes e-sport

🚀 Résultats & Impact :
• Taux de satisfaction participant de 95%
• Augmentation de 100% de la couverture médiatique
• Génération de 30K€+ de revenus sponsoring
• Croissance de 150% de l'audience événementielle`,
    location: 'Bruxelles'
  },
  {
    id: 8,
    name: 'Myth\'s Legion',
    role: 'Manager LoL • E-sport',
    status: 'Expérience Passée',
    skills: ['Management d\'équipe', 'E-sport', 'Coaching', 'Gestion de projet', 'Compétition'],
    score: 70,
    period: '2017',
    description: `Manager d'une équipe League of Legends évoluant en compétition.

🎯 Management Sportif :
• Gestion complète d'une équipe de 5 joueurs et 2 remplaçants
• Organisation et supervision des sessions d'entraînement quotidiennes
• Analyse des performances et développement de stratégies
• Coordination avec les coachs et analystes

💡 Développement d'Équipe :
• Recrutement et formation de nouveaux talents
• Mise en place d'un programme d'entraînement structuré
• Gestion des relations inter-équipes
• Organisation de bootcamps de préparation

🚀 Accomplissements :
• Qualification pour plusieurs tournois majeurs
• Développement d'une structure d'entraînement efficace
• Amélioration significative des performances d'équipe
• Création d'un environnement professionnel stable`,
    location: 'Paris'
  }
];

export default function Companies() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenDetails = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseDetails = () => {
    setSelectedCompany(null);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          sx={{
            bgcolor: 'grey.800',
            '&:hover': {
              bgcolor: 'grey.900'
            }
          }}
        >
          Filtres
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher par nom d'entreprise, industrie ou poste..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            '& fieldset': {
              borderColor: 'grey.200'
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'grey.500' }} />
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
            {filteredCompanies.map((company) => (
              <TableRow 
                key={company.id}
                hover
                onClick={() => handleOpenDetails(company)}
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
                        bgcolor: 'grey.100', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 500,
                        color: 'grey.700'
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
                      bgcolor: company.status === 'En Poste' ? '#203343' : 'grey.100',
                      color: company.status === 'En Poste' ? '#fff' : 'text.secondary',
                      fontWeight: company.status === 'En Poste' ? 500 : 400,
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
                          bgcolor: 'background.paper'
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
                        color: 'text.primary',
                        fontWeight: 500,
                        '&::before': {
                          content: '"★"',
                          color: 'warning.main',
                          marginRight: '4px'
                        }
                      }}
                    >
                      {company.score}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{company.period}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={Boolean(selectedCompany)} 
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
      >
        {selectedCompany && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      bgcolor: 'grey.100', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 500,
                      color: 'grey.700',
                      fontSize: '1.2rem'
                    }}
                  >
                    {selectedCompany.name[0]}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {selectedCompany.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {selectedCompany.role}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  onClick={handleCloseDetails}
                  sx={{ minWidth: 'auto', p: 0.5 }}
                >
                  <CloseIcon />
                </Button>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Informations
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCompany.period}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCompany.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  <Chip 
                    label={selectedCompany.status}
                    size="small"
                    sx={{ 
                      bgcolor: selectedCompany.status === 'En Poste' ? '#203343' : 'grey.100',
                      color: selectedCompany.status === 'En Poste' ? '#fff' : 'text.secondary',
                      fontWeight: selectedCompany.status === 'En Poste' ? 500 : 400
                    }}
                  />
                  {selectedCompany.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: 'grey.300' }}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Description & Missions
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ whiteSpace: 'pre-line' }}
                >
                  {selectedCompany.description}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={handleCloseDetails} variant="outlined">
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
