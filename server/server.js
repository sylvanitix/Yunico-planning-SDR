const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Fonction pour extraire les réseaux sociaux
const extractSocialMedia = (html) => {
  const $ = cheerio.load(html);
  const socials = [];
  
  // Recherche des liens vers les réseaux sociaux
  $('a[href*="linkedin.com"]').each((_, el) => {
    socials.push({ type: 'linkedin', url: $(el).attr('href') });
  });
  
  $('a[href*="facebook.com"]').each((_, el) => {
    socials.push({ type: 'facebook', url: $(el).attr('href') });
  });
  
  $('a[href*="twitter.com"]').each((_, el) => {
    socials.push({ type: 'twitter', url: $(el).attr('href') });
  });
  
  $('a[href*="instagram.com"]').each((_, el) => {
    socials.push({ type: 'instagram', url: $(el).attr('href') });
  });
  
  return [...new Map(socials.map(item => [item.url, item])).values()];
};

// Fonction pour extraire les emails
const extractEmails = (html) => {
  const $ = cheerio.load(html);
  const emails = new Set();
  
  // Recherche des liens mailto:
  $('a[href^="mailto:"]').each((_, el) => {
    const email = $(el).attr('href').replace('mailto:', '').split('?')[0];
    emails.add(email);
  });
  
  // Recherche des emails dans le texte
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const text = $('body').text();
  const matches = text.match(emailRegex) || [];
  matches.forEach(email => emails.add(email));
  
  return Array.from(emails);
};

// Fonction pour extraire les numéros de téléphone
const extractPhones = (html) => {
  const $ = cheerio.load(html);
  const phones = new Set();
  
  // Recherche des liens tel:
  $('a[href^="tel:"]').each((_, el) => {
    const phone = $(el).attr('href').replace('tel:', '');
    phones.add(phone);
  });
  
  // Recherche des numéros dans le texte
  const phoneRegex = /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g;
  const text = $('body').text();
  const matches = text.match(phoneRegex) || [];
  matches.forEach(phone => phones.add(phone));
  
  return Array.from(phones);
};

app.post('/api/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Vérification de l'URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('URL invalide');
    }
    
    // Récupération du contenu de la page
    const response = await axios.get(url);
    const html = response.data;
    
    // Extraction des données
    const socials = extractSocialMedia(html);
    const emails = extractEmails(html);
    const phones = extractPhones(html);
    
    res.json({
      socials,
      emails,
      phones
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
