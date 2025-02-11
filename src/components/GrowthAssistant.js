import React, { useState, useEffect } from 'react';
import {
  Box,
  Fab,
  Popover,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import {
  TipsAndUpdates as TipsIcon,
  Close as CloseIcon,
  ArrowForward as ArrowIcon,
  Insights as InsightsIcon,
  EmojiObjects as IdeaIcon,
  Timeline as StatsIcon,
} from '@mui/icons-material';

function GrowthAssistant() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTip, setCurrentTip] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const growthTips = [
    {
      title: "Astuce Growth #1",
      content: "Utilisez LinkedIn pour partager du contenu qui montre votre expertise en Growth. Cela augmente votre visibilité de 40%.",
      tag: "LinkedIn Strategy"
    },
    {
      title: "Conseil Acquisition #2",
      content: "Les emails personnalisés ont un taux d'ouverture 26% plus élevé. Mentionnez un accomplissement spécifique du recruteur.",
      tag: "Email Marketing"
    },
    {
      title: "Hack Visibilité #3",
      content: "Commentez de manière pertinente sur les posts LinkedIn des recruteurs ciblés. 30% de chances d'engagement en plus.",
      tag: "Engagement"
    },
    {
      title: "Astuce Personal Branding",
      content: "Créez une série de posts courts sur vos succès en Growth. Format : Problème → Solution → Résultats.",
      tag: "Content"
    }
  ];

  const profileStats = {
    viewsToday: 45,
    viewsIncrease: "+28%",
    searchAppearances: 158,
    profileScore: 92,
    topSkills: ["Growth Hacking", "Product", "B2B SaaS"],
    activeRecruiters: 12
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowStats(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % growthTips.length);
  };

  const toggleView = () => {
    setShowStats(!showStats);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'growth-assistant-popover' : undefined;

  useEffect(() => {
    const timer = setInterval(() => {
      if (open) {
        nextTip();
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [open]);

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
      <Fab
        color="primary"
        aria-label="growth assistant"
        onClick={handleClick}
        sx={{
          width: 65,
          height: 65,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {showStats ? <StatsIcon /> : <TipsIcon />}
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            width: 320,
            borderRadius: 2,
            mt: -2,
            mr: 2,
          },
        }}
      >
        <Card sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <CardContent sx={{ pt: 4 }}>
            {!showStats ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <IdeaIcon color="primary" />
                  <Typography variant="h6">
                    {growthTips[currentTip].title}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {growthTips[currentTip].content}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={growthTips[currentTip].tag}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    endIcon={<ArrowIcon />}
                    onClick={nextTip}
                    size="small"
                  >
                    Prochain conseil
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <InsightsIcon color="primary" />
                  <Typography variant="h6">
                    Statistiques du jour
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Vues aujourd'hui
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {profileStats.viewsToday}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      {profileStats.viewsIncrease}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Apparitions recherche
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {profileStats.searchAppearances}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Score profil
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {profileStats.profileScore}%
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Top compétences
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {profileStats.topSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Recruteurs actifs
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {profileStats.activeRecruiters}
                  </Typography>
                </Box>
              </>
            )}
          </CardContent>
          <Button
            fullWidth
            onClick={toggleView}
            sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 0 }}
          >
            {showStats ? 'Voir les conseils' : 'Voir les stats'}
          </Button>
        </Card>
      </Popover>
    </Box>
  );
}

export default GrowthAssistant;
