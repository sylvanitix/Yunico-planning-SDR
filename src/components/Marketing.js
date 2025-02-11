import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  LinearProgress,
  Button,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Close as CloseIcon,
  Send as SendIcon,
  BarChart as StatsIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const emailSequences = {
  'Campagne LinkedIn': {
    title: 'Séquence LinkedIn B2B',
    description: 'Séquence de prospection pour décideurs IT',
    steps: [
      {
        day: 'Jour 1',
        subject: 'Optimisez votre transformation digitale',
        content: 'Bonjour {{prénom}},\n\nJe me permets de vous contacter car j\'ai noté que {{entreprise}} est en pleine transformation digitale...',
        stats: {
          openRate: '45%',
          responseRate: '12%',
        }
      },
      {
        day: 'Jour 3',
        subject: 'Re: Retour sur ma proposition',
        content: 'Bonjour {{prénom}},\n\nJe reviens vers vous concernant mon précédent email...',
        stats: {
          openRate: '52%',
          responseRate: '15%',
        }
      },
      {
        day: 'Jour 7',
        subject: 'Dernière relance - Documentation exclusive',
        content: 'Bonjour {{prénom}},\n\nJe partage actuellement un livre blanc sur les meilleures pratiques...',
        stats: {
          openRate: '38%',
          responseRate: '8%',
        }
      }
    ]
  },
  'Campagne Email': {
    title: 'Nurturing Leads Email',
    description: 'Séquence de qualification et éducation des leads',
    steps: [
      {
        day: 'Immédiat',
        subject: 'Bienvenue chez Yunico !',
        content: 'Bonjour {{prénom}},\n\nMerci d\'avoir téléchargé notre guide. Voici quelques ressources complémentaires...',
        stats: {
          openRate: '68%',
          responseRate: '22%',
        }
      },
      {
        day: 'Jour 2',
        subject: 'Découvrez nos cas clients',
        content: 'Bonjour {{prénom}},\n\nVoici comment nos clients ont amélioré leur ROI de 300%...',
        stats: {
          openRate: '55%',
          responseRate: '18%',
        }
      },
      {
        day: 'Jour 5',
        subject: 'Réservez votre démo personnalisée',
        content: 'Bonjour {{prénom}},\n\nPrenez rendez-vous avec un expert pour une démonstration sur mesure...',
        stats: {
          openRate: '42%',
          responseRate: '15%',
        }
      }
    ]
  },
  'Campagne Multi-canal': {
    title: 'Fidélisation Clients',
    description: 'Séquence d\'engagement client et upsell',
    steps: [
      {
        day: 'Mois 1',
        subject: 'Maximisez votre utilisation de Yunico',
        content: 'Bonjour {{prénom}},\n\nDécouvrez ces fonctionnalités avancées pour optimiser votre utilisation...',
        stats: {
          openRate: '72%',
          responseRate: '25%',
        }
      },
      {
        day: 'Mois 2',
        subject: 'Nouveautés Yunico - Q1 2024',
        content: 'Bonjour {{prénom}},\n\nDécouvrez les dernières fonctionnalités ajoutées ce trimestre...',
        stats: {
          openRate: '65%',
          responseRate: '20%',
        }
      },
      {
        day: 'Mois 3',
        subject: 'Exclusif : Accès anticipé à notre nouvelle feature',
        content: 'Bonjour {{prénom}},\n\nEn tant que client premium, accédez en avant-première à...',
        stats: {
          openRate: '58%',
          responseRate: '28%',
        }
      }
    ]
  }
};

function Marketing() {
  const stats = [
    {
      title: 'Taux de réponse',
      value: '25%',
      trend: '+5%',
      color: 'primary',
    },
    {
      title: 'Taux de conversion',
      value: '12%',
      trend: '+2%',
      color: 'success',
    },
    {
      title: 'Leads qualifiés',
      value: '45',
      trend: '+10',
      color: 'info',
    },
    {
      title: 'Réunions planifiées',
      value: '8',
      trend: '+3',
      color: 'warning',
    },
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Campagne LinkedIn',
      platform: 'LinkedIn',
      status: 'En cours',
      progress: 75,
      metrics: {
        vues: '2.5k',
        interactions: '500',
        leads: '50',
      },
      sequence: emailSequences['Campagne LinkedIn'].steps,
      openRate: '45%',
      responseRate: '12%',
    },
    {
      id: 2,
      name: 'Campagne Email',
      platform: 'Email',
      status: 'En cours',
      progress: 45,
      metrics: {
        envoyés: '1000',
        ouvertures: '350',
        clics: '75',
      },
      sequence: emailSequences['Campagne Email'].steps,
      openRate: '68%',
      responseRate: '22%',
    },
    {
      id: 3,
      name: 'Campagne Multi-canal',
      platform: 'Multi',
      status: 'Planifiée',
      progress: 0,
      metrics: {
        canaux: '3',
        audience: '5k',
        budget: '1500€',
      },
      sequence: emailSequences['Campagne Multi-canal'].steps,
      openRate: '72%',
      responseRate: '25%',
    },
  ];

  const [selectedCampaign, setSelectedCampaign] = React.useState(null);
  const [inputs, setInputs] = React.useState({
    investissement: 0,
    revenuMensuel: 0,
    coutOperation: 0,
    duree: 0,
  });
  const [results, setResults] = React.useState({
    roi: 0,
    beneficeNet: 0,
    rentabilite: 0,
  });

  const handleOpenSequence = (campaignName) => {
    setSelectedCampaign(campaignName);
  };

  const handleCloseSequence = () => {
    setSelectedCampaign(null);
  };

  const handleInputChange = (field) => (event) => {
    setInputs({ ...inputs, [field]: event.target.value });
    calculateResults();
  };

  const calculateResults = () => {
    const { investissement, revenuMensuel, coutOperation, duree } = inputs;
    const totalRevenu = revenuMensuel * duree;
    const totalCout = investissement + coutOperation * duree;
    const beneficeNet = totalRevenu - totalCout;
    const roi = (beneficeNet / investissement) * 100;
    const rentabilite = (beneficeNet / totalRevenu) * 100;

    setResults({ roi, beneficeNet, rentabilite });
  };

  const renderEmailSequence = () => {
    if (!selectedCampaign || !emailSequences[selectedCampaign]) return null;

    const sequence = emailSequences[selectedCampaign];

    return (
      <Dialog
        open={true}
        onClose={handleCloseSequence}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon />
              <Typography variant="h6">{sequence.title}</Typography>
            </Box>
            <IconButton onClick={handleCloseSequence}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {sequence.description}
          </Typography>
          
          <Stepper orientation="vertical">
            {sequence.steps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel
                  StepIconComponent={() => (
                    <SendIcon />
                  )}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                      {step.day}
                    </Typography>
                    <Chip
                      icon={<StatsIcon />}
                      label={`Open: ${step.stats.openRate} • Reply: ${step.stats.responseRate}`}
                      size="small"
                    />
                  </Box>
                </StepLabel>
                <StepContent>
                  <Paper>
                    <Typography variant="subtitle1" color="primary.dark" gutterBottom>
                      {step.subject}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        whiteSpace: 'pre-line',
                        fontFamily: 'monospace',
                      }}
                    >
                      {step.content}
                    </Typography>
                  </Paper>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Marketing
        </Typography>
        <Button variant="contained" color="primary">
          Nouvelle Campagne
        </Button>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" color={`${stat.color}.main`}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                  {stat.trend} ce mois
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
        Campagnes Actives
      </Typography>

      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.name}>
            <Card 
              onClick={() => handleOpenSequence(campaign.name)}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                  bgcolor: 'action.hover',
                },
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -12,
                  right: -12,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  boxShadow: 2,
                  zIndex: 1,
                }}
              >
                {campaign.sequence.length}
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CampaignIcon color="primary" />
                  <Typography variant="h6" component="div">
                    {campaign.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Taux d'ouverture
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      {campaign.openRate}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Taux de réponse
                    </Typography>
                    <Typography variant="h6" color="info.main">
                      {campaign.responseRate}%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Chip
                    icon={<EmailIcon />}
                    label={`${campaign.sequence.length} emails`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={campaign.status}
                    size="small"
                    color={campaign.status === 'En cours' ? 'success' : 'warning'}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 2, 
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  Cliquez pour voir la séquence
                  <ArrowForwardIcon fontSize="small" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {renderEmailSequence()}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Calculateur ROI Marketing
        </Typography>

        <Grid container spacing={3}>
          {/* Section des inputs */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Paramètres
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Investissement initial (€)"
                    type="number"
                    value={inputs.investissement}
                    onChange={handleInputChange('investissement')}
                    InputProps={{
                      startAdornment: (
                        <Tooltip title="Montant total investi dans la campagne">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Revenu mensuel généré (€)"
                    type="number"
                    value={inputs.revenuMensuel}
                    onChange={handleInputChange('revenuMensuel')}
                    InputProps={{
                      startAdornment: (
                        <Tooltip title="Revenu mensuel généré par la campagne">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Coût opérationnel mensuel (€)"
                    type="number"
                    value={inputs.coutOperation}
                    onChange={handleInputChange('coutOperation')}
                    InputProps={{
                      startAdornment: (
                        <Tooltip title="Coûts mensuels de maintenance et d'opération">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Durée (mois)"
                    type="number"
                    value={inputs.duree}
                    onChange={handleInputChange('duree')}
                    InputProps={{
                      startAdornment: (
                        <Tooltip title="Durée de la campagne en mois">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Section des résultats */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, bgcolor: results.roi > 0 ? '#e8f5e9' : 'background.paper' }}>
                  <Typography variant="h6" gutterBottom>
                    ROI
                  </Typography>
                  <Typography variant="h3" color={results.roi > 0 ? 'success.main' : 'error.main'}>
                    {results.roi}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Retour sur investissement
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Bénéfice Net
                  </Typography>
                  <Typography variant="h4" color={results.beneficeNet > 0 ? 'success.main' : 'error.main'}>
                    {results.beneficeNet}€
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Profit total
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Rentabilité
                  </Typography>
                  <Typography variant="h4" color={results.rentabilite > 0 ? 'success.main' : 'error.main'}>
                    {results.rentabilite}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Marge bénéficiaire
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Marketing;
