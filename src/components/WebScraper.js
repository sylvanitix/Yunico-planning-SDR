import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Divider,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Language as WebIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Language,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Définition de l'animation pulse
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Style pour le badge animé
const AnimatedChip = styled(Chip)({
  backgroundColor: '#4caf50',
  color: 'white',
  animation: `${pulse} 2s infinite ease-in-out`,
});

// Style pour le bouton d'upload
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function WebScraper() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [batchUrls, setBatchUrls] = useState([]);
  const [batchResults, setBatchResults] = useState([]);
  const [batchProgress, setBatchProgress] = useState(0);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Fonction pour traiter le fichier CSV importé
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const urls = text.split('\\n')
          .map(line => line.trim())
          .filter(line => line && line.startsWith('http'));
        setBatchUrls(urls);
        setError(null);
      };
      reader.onerror = () => {
        setError('Erreur lors de la lecture du fichier');
      };
      reader.readAsText(file);
    }
  };

  // Fonction pour traiter un lot d'URLs
  const processBatch = async () => {
    if (batchUrls.length === 0) {
      setError('Veuillez d\'abord importer un fichier CSV contenant des URLs');
      return;
    }

    setIsBatchProcessing(true);
    setBatchResults([]);
    setBatchProgress(0);
    setError(null);

    const results = [];
    for (let i = 0; i < batchUrls.length; i++) {
      try {
        const url = batchUrls[i];
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.contents) {
          const extractedData = extractData(data.contents);
          results.push({
            url,
            ...extractedData,
            status: 'success'
          });
        } else {
          results.push({
            url,
            socials: [],
            emails: [],
            phones: [],
            status: 'error'
          });
        }
      } catch (error) {
        results.push({
          url: batchUrls[i],
          socials: [],
          emails: [],
          phones: [],
          status: 'error'
        });
      }

      setBatchProgress(((i + 1) / batchUrls.length) * 100);
    }

    setBatchResults(results);
    setIsBatchProcessing(false);
  };

  // Fonction pour télécharger les résultats en CSV
  const downloadResults = () => {
    if (batchResults.length === 0) {
      setError('Aucun résultat à exporter');
      return;
    }

    const csvContent = [
      ['URL', 'Réseaux Sociaux', 'Emails', 'Téléphones', 'Statut'],
      ...batchResults.map(result => [
        result.url,
        result.socials.map(s => s.url).join('; '),
        result.emails.join('; '),
        result.phones.join('; '),
        result.status
      ])
    ].map(row => row.join(',')).join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'webscraper_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction pour extraire les données d'une page web
  const extractData = (html) => {
    const socials = [];
    const emails = new Set();
    const phones = new Set();

    // Extraire les réseaux sociaux
    const socialPatterns = {
      linkedin: /https:\/\/[w.]*linkedin\.com\/[^\\s"'<>]+/g,
      facebook: /https:\/\/[w.]*facebook\.com\/[^\\s"'<>]+/g,
      twitter: /https:\/\/[w.]*twitter\.com\/[^\\s"'<>]+/g,
      instagram: /https:\/\/[w.]*instagram\.com\/[^\\s"'<>]+/g,
    };

    Object.entries(socialPatterns).forEach(([type, pattern]) => {
      const matches = html.match(pattern) || [];
      matches.forEach(url => {
        if (!socials.some(s => s.url === url)) {
          socials.push({ type, url });
        }
      });
    });

    // Extraire les emails
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emailMatches = html.match(emailPattern) || [];
    emailMatches.forEach(email => emails.add(email));

    // Extraire les numéros de téléphone (format français)
    const phonePattern = /(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}/g;
    const phoneMatches = html.match(phonePattern) || [];
    phoneMatches.forEach(phone => phones.add(phone));

    return {
      socials,
      emails: Array.from(emails),
      phones: Array.from(phones),
    };
  };

  // Fonction pour traiter une recherche individuelle
  const handleSingleScrape = async () => {
    if (!url) {
      setError('Veuillez entrer une URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error('Impossible d\'accéder à cette page');
      }

      const results = extractData(data.contents);
      setResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour rendre un icône en fonction du type de réseau social
  const renderIcon = (type) => {
    switch (type) {
      case 'linkedin':
        return <LinkedInIcon />;
      case 'facebook':
        return <FacebookIcon />;
      case 'twitter':
        return <TwitterIcon />;
      case 'instagram':
        return <InstagramIcon />;
      case 'phone':
        return <PhoneIcon />;
      case 'email':
        return <EmailIcon />;
      default:
        return <WebIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Typography variant="h4">
          Web Scraper
        </Typography>
        <AnimatedChip
          icon={<CheckCircleIcon />}
          label="Fonctionnel"
          size="medium"
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recherche individuelle
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="URL du site"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleSingleScrape}
            disabled={loading}
            sx={{
              bgcolor: 'grey.800',
              '&:hover': {
                bgcolor: 'grey.900'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Scanner'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Recherche par lot
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{ flexGrow: 1 }}
          >
            Importer CSV
            <VisuallyHiddenInput 
              type="file" 
              accept=".csv"
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </Button>
          <Button
            variant="contained"
            onClick={processBatch}
            disabled={isBatchProcessing || batchUrls.length === 0}
            startIcon={<Language />}
            sx={{ flexGrow: 1 }}
          >
            {isBatchProcessing ? (
              <>
                <CircularProgress size={24} color="inherit" />
                {Math.round(batchProgress)}%
              </>
            ) : (
              'Scanner le lot'
            )}
          </Button>
          <Button
            variant="contained"
            onClick={downloadResults}
            disabled={batchResults.length === 0}
            startIcon={<DownloadIcon />}
            sx={{ flexGrow: 1 }}
          >
            Exporter CSV
          </Button>
        </Box>

        {batchUrls.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {batchUrls.length} URLs chargées
          </Typography>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {(results || batchResults.length > 0) && (
          <Paper sx={{ mt: 3 }}>
            <List>
              {/* Affichage des résultats individuels */}
              {results && (
                <>
                  {results.socials?.map((social, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {renderIcon(social.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={social.type.charAt(0).toUpperCase() + social.type.slice(1)}
                        secondary={
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            {social.url}
                          </a>
                        }
                      />
                    </ListItem>
                  ))}
                  
                  {results.phones?.map((phone, index) => (
                    <ListItem key={`phone-${index}`}>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Téléphone" 
                        secondary={
                          <a href={`tel:${phone}`}>
                            {phone}
                          </a>
                        }
                      />
                    </ListItem>
                  ))}
                  
                  {results.emails?.map((email, index) => (
                    <ListItem key={`email-${index}`}>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={
                          <a href={`mailto:${email}`}>
                            {email}
                          </a>
                        }
                      />
                    </ListItem>
                  ))}
                </>
              )}

              {/* Affichage des résultats par lot */}
              {batchResults.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Résultats du lot ({batchResults.length} sites analysés)
                  </Typography>
                  {batchResults.map((result, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {result.url}
                      </Typography>
                      <Typography variant="body2" color={result.status === 'success' ? 'success.main' : 'error.main'}>
                        Status: {result.status}
                      </Typography>
                      {result.status === 'success' && (
                        <>
                          <Typography variant="body2">
                            Réseaux sociaux: {result.socials.length}
                          </Typography>
                          <Typography variant="body2">
                            Emails: {result.emails.length}
                          </Typography>
                          <Typography variant="body2">
                            Téléphones: {result.phones.length}
                          </Typography>
                        </>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Message si aucun résultat */}
              {results && results.socials?.length === 0 && 
               results.phones?.length === 0 && 
               results.emails?.length === 0 && (
                <ListItem>
                  <ListItemText 
                    primary="Aucune information trouvée" 
                    secondary="Essayez une autre page du site"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}

export default WebScraper;
