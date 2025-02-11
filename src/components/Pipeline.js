import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Add as AddIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

// Importer les données des entreprises
import { companies } from './Companies';

const initialColumns = {
  'nouveau': {
    id: 'nouveau',
    title: 'Nouveaux leads',
    items: [],
  },
  'contact': {
    id: 'contact',
    title: 'Premier contact',
    items: [
      {
        id: '2',
        title: 'Growth Lead',
        company: 'Avec Vous ?',
        contact: 'Sylvain Boué',
        deadline: '2025-02-20',
        description: 'Diplômé d\'un Master 2 en Communication à l\'ECS Paris, je cherche un poste de Growth Hacker Outbound B2B. Curieux, créatif et rigoureux, je suis prêt à mettre mes compétences au service d\'une équipe dynamique.',
      },
    ],
  },
  'entretien': {
    id: 'entretien',
    title: 'Entretien',
    items: [],
  },
  'proposition': {
    id: 'proposition',
    title: 'Proposition',
    items: [
      {
        id: '3',
        title: 'Growth Lead',
        company: 'Vos Concurrents 😉',
        contact: 'Sylvain Boué',
        deadline: '2025-02-10',
        description: 'Ne laissez pas vos concurrents recruter avant vous ! Mes compétences en Growth Hacking B2B et mon expérience peuvent faire la différence.',
      },
    ],
  },
  'cloture': {
    id: 'cloture',
    title: 'Clôturé',
    items: [
      {
        id: '1',
        title: 'Account Manager B2B',
        company: 'EraB2B',
        contact: 'Sylvain Boué',
        deadline: '2024-12-01',
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
        skills: ['Account Management', 'Business Development', 'Social Selling', 'CRM', 'Sales'],
      },
      {
        id: '4',
        title: 'Growth Hacker B2B',
        company: 'Yunico',
        contact: 'Sylvain Boué',
        deadline: '2024-06-01',
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
        skills: ['Growth Hacking', 'Marketing B2B', 'CRM', 'Automatisation', 'Social Selling'],
      },
      {
        id: '5',
        title: 'Growth Hacker',
        company: 'BD Multimedia',
        contact: 'Sylvain Boué',
        deadline: '2023-09-01',
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
        skills: ['Growth Hacking', 'Marketing Digital', 'Analytics', 'Social Media', 'SEO'],
      },
      {
        id: '6',
        title: 'Chargé de Communication',
        company: 'Centaure Avocats',
        contact: 'Sylvain Boué',
        deadline: '2023-02-01',
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
        skills: ['Communication', 'Marketing', 'Événementiel', 'Relations Publiques', 'Content Strategy'],
      },
      {
        id: '7',
        title: 'Social Media Manager',
        company: 'TaliAcademie.com',
        contact: 'Sylvain Boué',
        deadline: '2022-06-01',
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
        skills: ['Social Media', 'Création de contenu', 'Montage vidéo', 'Community Management', 'Analytics'],
      },
    ],
  },
};

function Pipeline() {
  const [columns, setColumns] = useState(initialColumns);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newLead, setNewLead] = useState({
    title: '',
    company: '',
    contact: 'Sylvain Boué',
    deadline: '',
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleMenuClick = (event, card) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCard(card);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCard(null);
  };

  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewLead({
      title: '',
      company: '',
      contact: 'Sylvain Boué',
      deadline: '',
    });
  };

  const handleAddLead = () => {
    const newLeadWithId = {
      ...newLead,
      id: Math.random().toString(36).substr(2, 9),
    };
    setColumns({
      ...columns,
      nouveau: {
        ...columns.nouveau,
        items: [...columns.nouveau.items, newLeadWithId],
      },
    });
    handleAddDialogClose();
  };

  const handleCompanyClick = (companyName) => {
    const company = companies.find(c => c.name === companyName);
    if (company) {
      setSelectedCompany(company);
      setIsCompanyDialogOpen(true);
    }
  };

  const handleCompanyDialogClose = () => {
    setIsCompanyDialogOpen(false);
    setSelectedCompany(null);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Pipeline</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDialogOpen}
        >
          Nouveau lead
        </Button>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        overflowX: 'auto', 
        pb: 2, 
        height: 'calc(100vh - 200px)',
        '& > *': {
          flex: '1 0 300px',
          maxWidth: '350px',
        }
      }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Paper
              key={columnId}
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 164, 189, 0.2)',
                '& .MuiPaper-root': {
                  boxShadow: 'none',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                {column.title}
                <Chip
                  label={column.items.length}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontWeight: 600,
                    height: '20px',
                    '& .MuiChip-label': {
                      px: 1,
                      fontSize: '0.75rem',
                    },
                  }}
                />
              </Typography>

              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      overflowY: 'auto',
                      transition: 'background-color 0.2s ease',
                      bgcolor: snapshot.isDraggingOver ? 'rgba(0, 164, 189, 0.1)' : 'transparent',
                      flexGrow: 1,
                      '&::-webkit-scrollbar': {
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0, 164, 189, 0.2)',
                        borderRadius: '4px',
                      },
                    }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              mb: 1,
                              transform: snapshot.isDragging ? 'rotate(3deg)' : 'none',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                              '&:hover': {
                                boxShadow: '0 4px 12px rgba(0, 164, 189, 0.2)',
                              },
                            }}
                          >
                            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'flex-start' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.875rem' }}>
                                  {item.title}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleMenuClick(e, item)}
                                  sx={{ p: 0.5, mt: -0.5, mr: -0.5 }}
                                >
                                  <MoreIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1, fontSize: '0.75rem', cursor: 'pointer' }}
                                onClick={() => handleCompanyClick(item.company)}
                              >
                                <BusinessIcon fontSize="small" />
                                {item.company}
                              </Typography>
                              {item.skills && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                                  {item.skills.map((skill) => (
                                    <Chip
                                      key={skill}
                                      label={skill}
                                      size="small"
                                      variant="outlined"
                                      sx={{ 
                                        borderColor: 'secondary.main', 
                                        color: 'secondary.main',
                                        height: '20px',
                                        '& .MuiChip-label': {
                                          px: 1,
                                          fontSize: '0.7rem',
                                        }
                                      }}
                                    />
                                  ))}
                                </Box>
                              )}
                              {item.description && (
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ 
                                    mb: 1,
                                    fontSize: '0.75rem',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {item.description}
                                </Typography>
                              )}
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                              }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <Avatar 
                                    sx={{ 
                                      width: 20, 
                                      height: 20, 
                                      bgcolor: 'secondary.main',
                                      fontSize: '0.75rem',
                                    }}
                                  >
                                    {item.contact.charAt(0)}
                                  </Avatar>
                                  <Typography variant="caption" color="text.primary">
                                    {item.contact}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <TimeIcon sx={{ 
                                    fontSize: '0.875rem',
                                    color: columnId === 'cloture' ? 'text.disabled' :
                                           new Date(item.deadline) < new Date() ? 'error.main' :
                                           new Date(item.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'warning.main' : 'success.main'
                                  }} />
                                  <Typography variant="caption" sx={{
                                    color: columnId === 'cloture' ? 'text.disabled' :
                                           new Date(item.deadline) < new Date() ? 'error.main' :
                                           new Date(item.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'warning.main' : 'success.main'
                                  }}>
                                    {new Date(item.deadline).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          ))}
        </DragDropContext>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Voir les détails</MenuItem>
        <MenuItem onClick={handleMenuClose}>Modifier</MenuItem>
        <MenuItem onClick={handleMenuClose}>Supprimer</MenuItem>
      </Menu>

      <Dialog
        open={isAddDialogOpen}
        onClose={handleAddDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ajouter un nouveau lead</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre du poste"
                value={newLead.title}
                onChange={(e) => setNewLead({ ...newLead, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Entreprise"
                value={newLead.company}
                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact"
                value={newLead.contact}
                onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Date limite"
                value={newLead.deadline}
                onChange={(e) => setNewLead({ ...newLead, deadline: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Annuler</Button>
          <Button
            onClick={handleAddLead}
            variant="contained"
            disabled={!newLead.title || !newLead.company}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isCompanyDialogOpen}
        onClose={handleCompanyDialogClose}
        maxWidth="md"
        fullWidth
      >
        {selectedCompany && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5">{selectedCompany.name}</Typography>
                <Chip label={selectedCompany.status} color="primary" />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>{selectedCompany.role}</Typography>
              <Typography variant="body1" paragraph>{selectedCompany.description}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Compétences :</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedCompany.skills.map((skill, index) => (
                    <Chip key={index} label={skill} />
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCompanyDialogClose}>Fermer</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Pipeline;
