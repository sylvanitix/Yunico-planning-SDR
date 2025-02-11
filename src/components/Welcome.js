import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Welcome({ onStart }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    {
      icon: <PersonIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Profil Growth Hacker",
      description: "Découvrez mon expertise en Growth Hacking B2B"
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Pipeline Interactif",
      description: "Suivez mon parcours comme un véritable deal"
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Métriques & KPIs",
      description: "Analysez mes performances en temps réel"
    }
  ];

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        py: 4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sylvain Boué
        </Typography>
      </motion.div>

      <Box sx={{ mb: 4, height: 60 }}>
        <TypeAnimation
          sequence={[
            'Growth Hacker B2B',
            2000,
            'Expert Outbound',
            2000,
            'Automation Specialist',
            2000,
          ]}
          wrapper="span"
          speed={50}
          style={{ 
            fontSize: '2em',
            display: 'inline-block',
            color: theme.palette.text.primary
          }}
          repeat={Infinity}
        />
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mb: 6
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: 280,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/pipeline')}
          startIcon={<PlayArrowIcon />}
          sx={{
            px: 4,
            py: 2,
            borderRadius: 2,
            fontSize: '1.2rem',
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
            }
          }}
        >
          Démarrer l'expérience
        </Button>
      </motion.div>

      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          opacity: 0.1,
        }}
      >
        <svg width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle cx="25" cy="25" r="3" fill={theme.palette.primary.main} />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </Box>
    </Box>
  );
}

export default Welcome;
