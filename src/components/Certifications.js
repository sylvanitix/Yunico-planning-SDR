import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  School as SchoolIcon,
  VerifiedUser as VerifiedIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

function Certifications() {
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const certifications = [
    {
      id: 1,
      title: "Mastère 2 Communication Digitale",
      institution: "ECS Paris",
      year: "2023",
      type: "Diplôme",
      status: "Validé ✨",
      score: 95,
      skills: ["Communication", "Marketing Digital", "Growth Hacking"],
      icon: SchoolIcon,
      color: "#2196f3",
      description: "Formation d'excellence en communication digitale et marketing digital. Spécialisation en Growth Hacking et acquisition B2B.",
      achievements: [
        "Major de promotion",
        "Projet de fin d'études : Stratégie d'acquisition B2B",
        "Stage de 6 mois en tant que Growth Lead"
      ]
    },
    {
      id: 2,
      title: "Growth Hacking Avancé",
      institution: "Growth.co",
      year: "2022",
      type: "Certification",
      status: "Expert 🚀",
      score: 98,
      skills: ["Growth", "Analytics", "Automation"],
      icon: TrophyIcon,
      color: "#4caf50",
      description: "Certification professionnelle en Growth Hacking, focus sur l'acquisition B2B et l'automatisation des processus de growth.",
      achievements: [
        "Note finale : 98/100",
        "Spécialisation B2B SaaS",
        "Projet pratique : +200% de conversion"
      ]
    },
    {
      id: 3,
      title: "Product Management",
      institution: "Product School",
      year: "2022",
      type: "Certification",
      status: "Certifié 🎯",
      score: 92,
      skills: ["Product Strategy", "User Research", "Agile"],
      icon: VerifiedIcon,
      color: "#ff9800",
      description: "Formation intensive en gestion de produit, avec focus sur les méthodologies agiles et le développement produit B2B.",
      achievements: [
        "Certification avec mention",
        "Cas pratique : Lancement de produit B2B",
        "Méthodologie agile appliquée"
      ]
    },
    {
      id: 4,
      title: "Marketing Analytics",
      institution: "Google",
      year: "2021",
      type: "Certification",
      status: "Validé 📊",
      score: 90,
      skills: ["Analytics", "Data", "Reporting"],
      icon: TimelineIcon,
      color: "#f44336",
      description: "Certification Google en analyse marketing et data analytics. Spécialisation en tracking et optimisation des conversions.",
      achievements: [
        "Google Analytics Expert",
        "Data Studio Master",
        "Attribution modeling"
      ]
    }
  ];

  const handleOpenDialog = (certification) => {
    setSelectedCertification(certification);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Certifications
        </Typography>
        <Button
          variant="contained"
          startIcon={<SchoolIcon />}
        >
          Ajouter
        </Button>
      </Box>

      <Grid container spacing={3}>
        {certifications.map((certification) => {
          const IconComponent = certification.icon;
          return (
            <Grid item xs={12} md={6} key={certification.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: certification.color,
                        width: 56,
                        height: 56,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {certification.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {certification.institution} • {certification.year}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Score
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {certification.score}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={certification.score} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {certification.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Chip
                    label={certification.status}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => handleOpenDialog(certification)}
                  >
                    Voir les détails
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedCertification && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: selectedCertification.color,
                    width: 40,
                    height: 40,
                  }}
                >
                  <selectedCertification.icon />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {selectedCertification.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedCertification.institution} • {selectedCertification.year}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" paragraph>
                {selectedCertification.description}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Réalisations principales
              </Typography>
              <Box component="ul" sx={{ mt: 0 }}>
                {selectedCertification.achievements.map((achievement, index) => (
                  <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                    {achievement}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Compétences validées
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedCertification.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Fermer</Button>
              <Button
                variant="contained"
                startIcon={<LanguageIcon />}
                onClick={() => {/* TODO: Add link to certification */}}
              >
                Voir le certificat
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Certifications;
