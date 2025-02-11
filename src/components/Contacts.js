import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Link,
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
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const contacts = [
  {
    id: 1,
    name: 'Sylvain Boué',
    role: 'Growth Lead & Product Manager • Yunico',
    status: 'Lead Premium',
    skills: ['Growth', 'Product', 'B2B SaaS', 'Communication Digitale', 'Marketing', 'Management'],
    score: '100%',
    email: 'sylvain.boue@yunico.fr',
    linkedin: 'https://www.linkedin.com/in/sylvainboue/',
    avatar: '/images/profile.png',
    education: 'Mastère 2 en Communication Digitale - ECS Paris',
    location: 'Wissous - 91320',
    about: 'Diplômé d\'un Mastère 2 en Communication Digitale à l\'ECS Paris, je cherche un poste de Growth Hacker Outbound B2B. Curieux, créatif et rigoureux, je suis prêt à mettre mes compétences au service d\'une équipe dynamique.',
    highlights: [
      '+300% croissance leads B2B',
      'Management d\'équipe 8 personnes',
      'Expert en analytics',
      'Maîtrise des outils de Growth',
      'Stratégie d\'acquisition B2B'
    ],
    experiences: [
      {
        title: 'Growth Lead',
        company: 'Entreprise A',
        period: '2023 - Présent',
        description: 'Gestion complète de la stratégie growth, +300% de leads B2B'
      },
      {
        title: 'Product Manager',
        company: 'Entreprise B',
        period: '2021 - 2023',
        description: 'Management d\'une équipe de 8 personnes, lancement de nouveaux produits'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2024',
        credential: 'AWS-123456',
        logo: '/path/to/aws-logo.png',
      },
      {
        name: 'Google Analytics Certified',
        issuer: 'Google',
        date: '2023',
        credential: 'GA-789012',
        logo: '/path/to/google-logo.png',
      },
      {
        name: 'HubSpot Growth Marketing',
        issuer: 'HubSpot Academy',
        date: '2023',
        credential: 'HB-345678',
        logo: '/path/to/hubspot-logo.png',
      },
    ],
  }
];

function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseContact = () => {
    setSelectedContact(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Contacts
        </Typography>
        <Button
          variant="contained"
          startIcon={<FilterIcon />}
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
        placeholder="Rechercher par nom, rôle ou compétence..."
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

      <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
        {filteredContacts.map((contact) => (
          <Box
            key={contact.id}
            onClick={() => handleOpenContact(contact)}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'grey.200',
              cursor: 'pointer',
              '&:last-child': {
                borderBottom: 'none'
              },
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <Avatar
              src={contact.avatar}
              alt={contact.name}
              sx={{ 
                width: 48, 
                height: 48, 
                mr: 2,
                bgcolor: 'grey.400',
                fontSize: '1.2rem',
                fontWeight: 500
              }}
            >
              {contact.name.charAt(0)}
            </Avatar>
            
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {contact.name}
                </Typography>
                <Chip
                  label={contact.status}
                  size="small"
                  sx={{
                    bgcolor: '#203343',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    '&::before': {
                      content: '"★"',
                      color: 'warning.main',
                      marginRight: '4px'
                    }
                  }}
                >
                  {contact.score}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {contact.role}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {contact.skills.map((skill, index) => (
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
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={Link}
                href={`mailto:${contact.email}`}
                color="primary"
                size="small"
                onClick={(e) => e.stopPropagation()}
              >
                <EmailIcon />
              </IconButton>
              <IconButton
                component={Link}
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                size="small"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={Boolean(selectedContact)}
        onClose={handleCloseContact}
        maxWidth="md"
        fullWidth
      >
        {selectedContact && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Avatar
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    sx={{ width: 120, height: 120 }}
                  >
                    {selectedContact.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h5">{selectedContact.name}</Typography>
                      <Chip
                        label={selectedContact.status}
                        sx={{
                          bgcolor: '#203343',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {selectedContact.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedContact.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedContact.education}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseContact}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent dividers>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>À propos</Typography>
                <Typography variant="body1">{selectedContact.about}</Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Points forts</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedContact.highlights.map((highlight, index) => (
                    <Typography key={index} variant="body1">• {highlight}</Typography>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Certifications</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {selectedContact.certifications.map((certification, index) => (
                    <Box key={index}>
                      <Typography variant="body1">{certification.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {certification.issuer} • {certification.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Credential ID: {certification.credential}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>Expériences</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {selectedContact.experiences.map((experience, index) => (
                    <Box key={index}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {experience.title} • {experience.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {experience.period}
                      </Typography>
                      <Typography variant="body1">
                        {experience.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>Compétences</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedContact.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      variant="outlined"
                      sx={{
                        borderColor: 'grey.300',
                        color: 'text.primary',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                variant="outlined"
                startIcon={<LinkedInIcon />}
                component={Link}
                href={selectedContact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                component={Link}
                href={`mailto:${selectedContact.email}`}
              >
                Contacter
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Contacts;
