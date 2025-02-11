import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  LinearProgress,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  CardMedia
} from '@mui/material';
import {
  Science as ScienceIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Psychology as PsychologyIcon,
  Lightbulb as LightbulbIcon,
  GitHub as GitHubIcon,
  PlayArrow as PlayIcon,
  Close as CloseIcon,
  AutoAwesome as AutoAwesomeIcon,
  BugReport as BugReportIcon,
  CheckCircle as CheckCircleIcon,
  Update as UpdateIcon,
  Timeline as TimelineIcon,
  Build as BuildIcon,
  Link as LinkIcon,
  ExpandMore as ExpandMoreIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Storage as StorageIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

function InnovationLab() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(false);

  const innovations = [
    {
      id: 1,
      title: "Web Scraper Intelligent",
      description: "Outil de scraping avancé avec proxy rotatif et détection de technologie",
      category: "Automatisation",
      status: "Production",
      completion: 100,
      impact: "Réduction de 80% du temps de prospection",
      technologies: ["Python", "Selenium", "BeautifulSoup", "Proxy Management"],
      features: [
        "Extraction multi-sources",
        "Bypass CAPTCHA",
        "Export personnalisable",
        "Détection de stack technique"
      ],
      metrics: {
        performance: 90,
        reliability: 95,
        accuracy: 85
      },
      github: "https://github.com/username/smart-scraper",
      demo: "https://demo.example.com/scraper",
      updates: [
        {
          date: "2024-01",
          version: "2.1",
          changes: ["Support multi-threading", "Amélioration détection email"]
        }
      ]
    },
    {
      id: 2,
      title: "Growth Hacking Framework",
      description: "Framework d'automatisation marketing multi-canal",
      category: "Marketing",
      status: "Production",
      completion: 95,
      impact: "Augmentation de 150% du taux de conversion",
      technologies: ["Node.js", "Python", "APIs Marketing"],
      features: [
        "Automatisation LinkedIn",
        "Séquences d'emails",
        "Scoring leads",
        "Analytics avancés"
      ],
      metrics: {
        performance: 95,
        reliability: 90,
        accuracy: 92
      },
      github: "https://github.com/username/growth-framework",
      demo: "https://demo.example.com/growth",
      updates: [
        {
          date: "2024-02",
          version: "3.0",
          changes: ["IA pour personnalisation", "Nouveau dashboard"]
        }
      ]
    },
    {
      id: 3,
      title: "API Integration Hub",
      description: "Plateforme centralisée d'intégration d'APIs marketing",
      category: "Infrastructure",
      status: "Développement",
      completion: 75,
      impact: "Centralisation de 15+ APIs marketing",
      technologies: ["FastAPI", "Redis", "Docker", "OAuth"],
      features: [
        "Authentication unifiée",
        "Rate limiting intelligent",
        "Logging centralisé",
        "Analytics temps réel"
      ],
      metrics: {
        performance: 88,
        reliability: 85,
        accuracy: 90
      },
      github: "https://github.com/username/api-hub",
      demo: "https://demo.example.com/api-hub",
      updates: [
        {
          date: "2024-01",
          version: "1.5",
          changes: ["Support GraphQL", "Cache distribué"]
        }
      ]
    }
  ];

  const tools = [
    {
      id: 1,
      name: "Make (Integromat)",
      logo: "/images/tools/make.svg",
      description: "Plateforme d'automatisation avancée permettant d'orchestrer des workflows complexes entre plus de 1000+ applications. Expertise en création de scénarios d'automatisation sur mesure pour optimiser les processus de recrutement et de prospection.",
      category: "Automatisation",
      useCases: [
        "Synchronisation bidirectionnelle entre HubSpot et LinkedIn Sales Navigator pour un suivi client unifié",
        "Automatisation des processus de qualification et d'enrichissement des leads via Dropcontact et Kaspr",
        "Création de workflows de nurturing multicanal (LinkedIn + Email) avec personnalisation avancée",
        "Intégration de webhooks pour des alertes en temps réel sur les opportunités qualifiées"
      ],
      link: "https://www.make.com",
      expertise: 95,
      integrations: ["HubSpot", "LinkedIn", "Dropcontact", "Kaspr", "Lemlist", "Waalaxy", "Phantombuster"],
      yearStarted: 2021
    },
    {
      id: 2,
      name: "HubSpot",
      logo: "/images/tools/hubspot.svg",
      description: "CRM et suite marketing tout-en-un, maîtrisé en profondeur pour la gestion de pipelines commerciaux complexes. Configuration avancée des workflows d'automatisation et reporting personnalisé pour le suivi de la performance des campagnes.",
      category: "Marketing & CRM",
      useCases: [
        "Mise en place de pipelines de vente optimisés avec scoring leads automatisé",
        "Création de workflows d'engagement multicanaux basés sur le comportement des prospects",
        "Configuration de tableaux de bord personnalisés pour le suivi des KPIs commerciaux",
        "Intégration complète avec la stack d'outils de prospection pour un tracking unifié"
      ],
      link: "https://www.hubspot.com",
      expertise: 93,
      integrations: ["Sales Navigator", "Make", "Lemlist", "Dropcontact", "Kaspr"],
      yearStarted: 2021
    },
    {
      id: 3,
      name: "Sales Navigator",
      logo: "/images/tools/sales-navigator.svg",
      description: "Version premium de LinkedIn exploitée de manière experte pour la prospection B2B ciblée. Maîtrise des filtres avancés et des techniques de social selling pour générer des leads qualifiés.",
      category: "Social Selling",
      useCases: [
        "Identification précise des décideurs grâce aux filtres de recherche avancés",
        "Veille stratégique sur les entreprises cibles et leurs actualités clés",
        "Construction de listes de prospects ultra-ciblées par secteur et fonction",
        "Synchronisation des leads avec HubSpot pour un suivi commercial optimisé"
      ],
      link: "https://business.linkedin.com/sales-solutions/sales-navigator",
      expertise: 94,
      integrations: ["LinkedIn", "HubSpot", "Waalaxy", "Evaboot", "Phantombuster"],
      yearStarted: 2021
    },
    {
      id: 4,
      name: "Lemlist",
      logo: "/images/tools/lemlist.svg",
      description: "Plateforme d'email automation spécialisée dans la personnalisation avancée. Expertise en création de séquences de prospection hautement personnalisées avec A/B testing pour optimiser les taux de réponse.",
      category: "Email Marketing",
      useCases: [
        "Création de campagnes email multicanales avec personnalisation dynamique",
        "Mise en place de scénarios de relance intelligents basés sur le comportement",
        "Optimisation continue des templates via A/B testing pour maximiser les taux d'ouverture",
        "Intégration avec CRM pour un suivi précis des interactions prospects"
      ],
      link: "https://www.lemlist.com",
      expertise: 92,
      integrations: ["HubSpot", "Make", "Sales Navigator", "Dropcontact"],
      yearStarted: 2022
    },
    {
      id: 5,
      name: "Kaspr",
      logo: "/images/tools/kaspr.svg",
      description: "Outil d'enrichissement de données LinkedIn utilisé de manière experte pour extraire et vérifier les coordonnées professionnelles. Maîtrise des fonctionnalités avancées pour maximiser la qualité des données.",
      category: "Lead Generation",
      useCases: [
        "Extraction et validation en temps réel des emails professionnels depuis LinkedIn",
        "Enrichissement automatique des profils prospects avec données de contact vérifiées",
        "Synchronisation des données enrichies vers HubSpot via Make",
        "Qualification avancée des leads grâce aux insights professionnels"
      ],
      link: "https://www.kaspr.io",
      expertise: 90,
      integrations: ["LinkedIn", "HubSpot", "Make", "Sales Navigator"],
      yearStarted: 2022
    },
    {
      id: 6,
      name: "Bouncer",
      logo: "/images/tools/bouncer.svg",
      description: "Solution de validation d'emails en temps réel, utilisée stratégiquement pour maintenir une base de données propre et optimiser la délivrabilité des campagnes email.",
      category: "Email Validation",
      useCases: [
        "Validation en temps réel des emails avant import dans le CRM",
        "Nettoyage régulier des bases de données pour maintenir une excellente délivrabilité",
        "Intégration aux workflows d'enrichissement pour validation instantanée",
        "Analyse détaillée de la qualité des sources de données"
      ],
      link: "https://www.bouncer.io",
      expertise: 89,
      integrations: ["Make", "HubSpot", "Lemlist", "Dropcontact"],
      yearStarted: 2022
    },
    {
      id: 7,
      name: "LaGrowthMachine",
      logo: "/images/tools/lagrowth.svg",
      description: "Plateforme d'automatisation multicanale maîtrisée pour orchestrer des campagnes de prospection sophistiquées combinant LinkedIn, Email et Twitter.",
      category: "Automatisation",
      useCases: [
        "Orchestration de campagnes multicanales synchronisées (LinkedIn + Email + Twitter)",
        "Personnalisation avancée des messages selon les interactions prospects",
        "Analyse performance par canal pour optimisation continue des séquences",
        "Intégration avec CRM pour tracking complet du parcours prospect"
      ],
      link: "https://www.lagrowthMachine.com",
      expertise: 88,
      integrations: ["LinkedIn", "Gmail", "HubSpot", "Make"],
      yearStarted: 2023
    },
    {
      id: 8,
      name: "Waalaxy",
      logo: "/images/tools/waalaxy.svg",
      description: "Solution d'automatisation LinkedIn exploitée pour maximiser l'engagement. Expertise en configuration de séquences de prospection respectant les limites de la plateforme.",
      category: "LinkedIn Automation",
      useCases: [
        "Automatisation intelligente des actions LinkedIn (connexions, messages, suivis)",
        "Création de séquences de prospection multicritères",
        "Synchronisation bidirectionnelle avec HubSpot pour suivi des conversions",
        "Analyse détaillée des performances par campagne et segment"
      ],
      link: "https://www.waalaxy.com",
      expertise: 90,
      integrations: ["LinkedIn", "Sales Navigator", "HubSpot", "Make"],
      yearStarted: 2022
    },
    {
      id: 9,
      name: "Emelia",
      logo: "/images/tools/emelia.svg",
      description: "Plateforme d'email automation nouvelle génération maîtrisée pour ses capacités de personnalisation poussée et son intelligence artificielle intégrée.",
      category: "Email Marketing",
      useCases: [
        "Création de séquences email ultra-personnalisées avec IA",
        "Optimisation automatique des moments d'envoi par prospect",
        "A/B testing avancé sur les éléments clés (objet, contenu, CTA)",
        "Intégration complète avec le CRM pour un suivi précis des conversions"
      ],
      link: "https://www.emelia.io",
      expertise: 87,
      integrations: ["Gmail", "HubSpot", "Make", "Dropcontact"],
      yearStarted: 2023
    },
    {
      id: 10,
      name: "Ocean.io",
      logo: "/images/tools/ocean-io.svg",
      description: "Plateforme de prospection B2B basée sur l'IA, utilisée stratégiquement pour identifier les entreprises cibles idéales et leurs décideurs clés.",
      category: "Lead Generation",
      useCases: [
        "Identification d'entreprises similaires aux meilleurs clients (look-alike)",
        "Enrichissement automatique des données entreprises et contacts",
        "Scoring prédictif des prospects basé sur l'IA",
        "Export structuré des données vers le CRM avec mise à jour automatique"
      ],
      link: "https://www.ocean.io",
      expertise: 85,
      integrations: ["HubSpot", "Make", "Sales Navigator"],
      yearStarted: 2023
    },
    {
      id: 11,
      name: "Pharow",
      logo: "/images/tools/pharow.svg",
      description: "Solution innovante d'automatisation LinkedIn intégrant l'IA pour une personnalisation avancée des interactions. Expertise en configuration de campagnes ciblées à grande échelle.",
      category: "LinkedIn Automation",
      useCases: [
        "Personnalisation dynamique des messages LinkedIn avec IA",
        "Automatisation intelligente des séquences de prospection",
        "Analyse comportementale des prospects pour optimisation",
        "Synchronisation en temps réel avec le CRM"
      ],
      link: "https://www.pharow.com",
      expertise: 88,
      integrations: ["LinkedIn", "Sales Navigator", "HubSpot", "Make"],
      yearStarted: 2023
    },
    {
      id: 12,
      name: "Phantombuster",
      logo: "/images/tools/phantombuster.svg",
      description: "Suite d'automatisation et de scraping maîtrisée pour l'extraction et l'enrichissement de données à grande échelle. Expertise en configuration de workflows d'automatisation complexes.",
      category: "Automatisation & Scraping",
      useCases: [
        "Extraction massive de données LinkedIn avec respect des limites",
        "Automatisation des actions sur multiples réseaux sociaux",
        "Enrichissement de bases de données prospects à grande échelle",
        "Intégration aux workflows d'automatisation via Make"
      ],
      link: "https://www.phantombuster.com",
      expertise: 91,
      integrations: ["LinkedIn", "Sales Navigator", "Make", "HubSpot", "Twitter"],
      yearStarted: 2022
    },
    {
      id: 13,
      name: "Octoparse",
      logo: "/images/tools/octoparse.svg",
      description: "Outil de web scraping avancé maîtrisé pour l'extraction de données web complexes. Expertise en configuration de scénarios d'extraction automatisés et structurés.",
      category: "Web Scraping",
      useCases: [
        "Extraction automatisée de données web complexes et dynamiques",
        "Configuration de workflows de collecte de données périodiques",
        "Structuration et normalisation automatique des données extraites",
        "Export automatisé vers les outils d'analyse et CRM"
      ],
      link: "https://www.octoparse.com",
      expertise: 86,
      integrations: ["Make", "HubSpot", "Airtable", "Google Sheets"],
      yearStarted: 2023
    },
    {
      id: 14,
      name: "Dropcontact",
      logo: "/images/tools/dropcontact.svg",
      description: "Service d'enrichissement de données B2B utilisé de manière experte pour la validation et l'enrichissement de données prospects en temps réel. Maîtrise des API pour intégration aux workflows.",
      category: "Enrichissement de données",
      useCases: [
        "Validation et enrichissement en temps réel des données prospects",
        "Mise à jour automatique des informations professionnelles dans le CRM",
        "Intégration aux workflows de prospection pour qualification instantanée",
        "Nettoyage et standardisation des bases de données existantes"
      ],
      link: "https://www.dropcontact.com",
      expertise: 89,
      integrations: ["Make", "HubSpot", "Lemlist", "Kaspr", "Phantombuster"],
      yearStarted: 2022
    },
    {
      id: 15,
      name: "Evaboot",
      logo: "/images/tools/evaboot.svg",
      description: "Plateforme d'automatisation LinkedIn nouvelle génération maîtrisée pour ses capacités d'IA avancées. Expertise en configuration de campagnes de prospection hautement personnalisées.",
      category: "LinkedIn Automation",
      useCases: [
        "Automatisation LinkedIn intelligente avec personnalisation IA",
        "Gestion multi-comptes avec synchronisation centralisée",
        "Analytics avancés pour optimisation des performances",
        "Intégration complète avec le CRM pour suivi des conversions"
      ],
      link: "https://www.evaboot.com",
      expertise: 88,
      integrations: ["LinkedIn", "Sales Navigator", "HubSpot", "Make", "Dropcontact"],
      yearStarted: 2023
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Yunico Digital",
      description: "Agence de Growth Marketing B2B spécialisée dans la génération de leads qualifiés et l'automatisation des processus commerciaux. Notre expertise unique combine marketing digital, social selling et technologies de pointe.",
      longDescription: `Yunico Digital est une agence innovante qui redéfinit les standards du Growth Marketing B2B. Notre approche se distingue par :

      🎯 Notre Expertise :
      • Génération de leads hautement qualifiés via une approche multicanale
      • Automatisation intelligente des processus de prospection
      • Stratégies de social selling avancées sur LinkedIn
      • Optimisation continue des taux de conversion

      💡 Notre Méthodologie :
      • Analyse approfondie de votre marché et de vos buyer personas
      • Création de workflows d'acquisition personnalisés
      • Mise en place d'outils d'automatisation sur mesure
      • Reporting détaillé et optimisation continue

      🚀 Nos Résultats :
      • Augmentation moyenne de 300% du pipeline commercial
      • Taux de réponse supérieur à 45% sur les campagnes
      • ROI mesurable et prévisible
      • Scalabilité des processus commerciaux

      🤝 Notre Engagement :
      • Transparence totale sur nos actions et résultats
      • Accompagnement personnalisé de chaque client
      • Formation continue de vos équipes
      • Veille technologique et innovation constante`,
      image: "/images/projects/yunico.jpg",
      tags: ["Growth Marketing", "B2B", "Lead Generation", "Automatisation", "Social Selling"],
      status: "En cours",
      progress: 85,
      startDate: "2023-01-01",
      endDate: "2025-12-31",
      team: [
        {
          name: "Sylvain Mestre",
          role: "Growth Manager & Expert en Automatisation",
          avatar: "/images/team/sylvain.jpg"
        }
      ],
      objectives: [
        {
          title: "Génération de Leads Qualifiés",
          description: "Mise en place de processus d'acquisition multicanaux pour générer un flux constant de leads B2B qualifiés et engagés",
          status: "completed"
        },
        {
          title: "Automatisation des Processus",
          description: "Développement de workflows d'automatisation personnalisés pour optimiser chaque étape du tunnel de conversion",
          status: "in_progress"
        },
        {
          title: "Social Selling Avancé",
          description: "Déploiement de stratégies de social selling sophistiquées sur LinkedIn avec personnalisation IA",
          status: "completed"
        },
        {
          title: "Optimisation Data-Driven",
          description: "Analyse approfondie des données et optimisation continue des campagnes pour maximiser le ROI",
          status: "in_progress"
        }
      ],
      technologies: [
        {
          name: "HubSpot",
          icon: "hubspot",
          description: "CRM et automatisation marketing avancée"
        },
        {
          name: "Make",
          icon: "make",
          description: "Orchestration complexe des workflows"
        },
        {
          name: "Sales Navigator",
          icon: "sales-navigator",
          description: "Prospection B2B ultra-ciblée"
        }
      ],
      metrics: [
        {
          label: "Leads Qualifiés Générés",
          value: "500+",
          trend: "up"
        },
        {
          label: "Taux de Conversion Moyen",
          value: "45%",
          trend: "up"
        },
        {
          label: "ROI Client Moyen",
          value: "300%",
          trend: "up"
        }
      ]
    },
    {
      id: 2,
      title: "Agence Digitale",
      description: "Studio de création digitale expert en développement de solutions web innovantes et optimisation de la présence en ligne B2B. Spécialisation dans les plateformes à haute performance et l'expérience utilisateur.",
      longDescription: `Notre agence digitale combine expertise technique pointue et créativité stratégique pour développer des solutions web performantes :

      🎨 Notre Expertise Technique :
      • Développement full-stack de solutions web complexes
      • Architecture et design UX/UI centrés performance
      • Optimisation SEO technique approfondie
      • Intégration de solutions e-commerce B2B sophistiquées

      💻 Notre Approche Technologique :
      • Architecture microservices moderne et scalable
      • Performance et sécurité de niveau entreprise
      • Design responsive et accessible tous devices
      • Analyse de données et optimisation continue

      📈 Nos Réalisations Techniques :
      • Plateformes e-commerce B2B haute performance
      • Applications web progressives (PWA) complexes
      • Tableaux de bord analytiques personnalisés
      • Systèmes de gestion de contenu enterprise-grade

      🔧 Notre Stack Technologique :
      • React.js pour des interfaces ultra-réactives
      • Node.js et microservices pour le backend
      • Infrastructure cloud AWS optimisée
      • Intégration API complexe et synchronisation`,
      image: "/images/projects/agency.jpg",
      tags: ["Web Development", "UX Design", "E-commerce", "SEO", "Analytics"],
      status: "En cours",
      progress: 75,
      startDate: "2023-06-01",
      endDate: "2025-12-31",
      team: [
        {
          name: "Équipe Technique",
          role: "Experts en Développement Web",
          avatar: "/images/team/tech.jpg"
        }
      ],
      objectives: [
        {
          title: "Excellence Technique",
          description: "Développement de solutions web enterprise-grade avec focus sur la performance et la scalabilité",
          status: "in_progress"
        },
        {
          title: "Innovation UX/UI",
          description: "Création d'interfaces utilisateur innovantes optimisées pour la conversion B2B",
          status: "completed"
        },
        {
          title: "Optimisation Technique",
          description: "Implémentation de stratégies SEO techniques avancées et optimisation continue",
          status: "in_progress"
        },
        {
          title: "Analytics Avancés",
          description: "Déploiement de solutions de tracking et d'analyse sophistiquées pour le B2B",
          status: "planned"
        }
      ],
      technologies: [
        {
          name: "React",
          icon: "react",
          description: "Développement frontend moderne"
        },
        {
          name: "Node.js",
          icon: "nodejs",
          description: "Architecture backend scalable"
        },
        {
          name: "AWS",
          icon: "aws",
          description: "Infrastructure cloud enterprise"
        }
      ],
      metrics: [
        {
          label: "Projets Enterprise Livrés",
          value: "50+",
          trend: "up"
        },
        {
          label: "Satisfaction Client B2B",
          value: "98%",
          trend: "up"
        },
        {
          label: "Score Performance Web",
          value: "95%",
          trend: "up"
        }
      ]
    },
    {
      id: 3,
      title: "Consulting Digital",
      description: "Cabinet d'expertise en transformation digitale B2B spécialisé dans l'optimisation des processus commerciaux et l'intégration de solutions technologiques avancées.",
      longDescription: `Notre cabinet accompagne les entreprises B2B dans leur transformation digitale avec une approche stratégique et mesurable :

      🎓 Notre Expertise Stratégique :
      • Audit approfondi et réingénierie des processus commerciaux
      • Sélection et intégration de solutions technologiques avancées
      • Programme de transformation digitale sur mesure
      • Méthodologies agiles adaptées au B2B

      📊 Nos Services Premium :
      • Consulting stratégique en innovation digitale
      • Optimisation end-to-end des processus de vente
      • Implémentation de solutions CRM enterprise-grade
      • Stratégies data-driven personnalisées

      💪 Notre Valeur Ajoutée :
      • Expertise sectorielle B2B approfondie
      • Méthodologie éprouvée et résultats garantis
      • Accompagnement stratégique personnalisé
      • Innovation technologique continue

      📈 Impact Business Mesurable :
      • Réduction significative des coûts opérationnels
      • Augmentation mesurable de la productivité
      • Optimisation du ROI marketing et commercial
      • Amélioration des taux de conversion B2B`,
      image: "/images/projects/consulting.jpg",
      tags: ["Consulting", "Digital Transformation", "Process Optimization", "Training", "CRM"],
      status: "En cours",
      progress: 80,
      startDate: "2023-03-01",
      endDate: "2025-12-31",
      team: [
        {
          name: "Équipe Conseil",
          role: "Experts en Transformation Digitale",
          avatar: "/images/team/consulting.jpg"
        }
      ],
      objectives: [
        {
          title: "Innovation Digitale",
          description: "Accompagnement stratégique dans la transformation digitale B2B",
          status: "in_progress"
        },
        {
          title: "Excellence Opérationnelle",
          description: "Optimisation et automatisation des processus commerciaux critiques",
          status: "completed"
        },
        {
          title: "Enablement Digital",
          description: "Formation avancée aux outils et méthodologies digitales",
          status: "in_progress"
        },
        {
          title: "Performance Analytics",
          description: "Implémentation de KPIs avancés et tableaux de bord stratégiques",
          status: "planned"
        }
      ],
      technologies: [
        {
          name: "HubSpot Enterprise",
          icon: "hubspot",
          description: "CRM et marketing automation"
        },
        {
          name: "Salesforce",
          icon: "salesforce",
          description: "Gestion commerciale avancée"
        },
        {
          name: "Power BI",
          icon: "powerbi",
          description: "Analytics et BI enterprise"
        }
      ],
      metrics: [
        {
          label: "Entreprises Transformées",
          value: "30+",
          trend: "up"
        },
        {
          label: "Gain en Productivité",
          value: "40%",
          trend: "up"
        },
        {
          label: "ROI Moyen Clients",
          value: "250%",
          trend: "up"
        }
      ]
    }
  ];

  // Organiser les outils par catégorie
  const toolCategories = {
    category1: {
      name: "Automatisation & Workflow",
      icon: <SpeedIcon />,
      tools: tools.filter(tool => 
        ["Automatisation", "Automatisation & Scraping"].includes(tool.category)
      )
    },
    category2: {
      name: "LinkedIn & Social Selling",
      icon: <LinkedInIcon />,
      tools: tools.filter(tool => 
        ["LinkedIn Automation", "Social Selling", "Prospection"].includes(tool.category)
      )
    },
    category3: {
      name: "Email Marketing",
      icon: <EmailIcon />,
      tools: tools.filter(tool => 
        ["Email Marketing", "Email Validation"].includes(tool.category)
      )
    },
    category4: {
      name: "Data & Enrichissement",
      icon: <StorageIcon />,
      tools: tools.filter(tool => 
        ["Lead Generation", "Enrichissement de données"].includes(tool.category)
      )
    },
    category5: {
      name: "Web Scraping",
      icon: <LanguageIcon />,
      tools: tools.filter(tool => 
        ["Web Scraping"].includes(tool.category)
      )
    },
    category6: {
      name: "CRM & Marketing",
      icon: <BusinessIcon />,
      tools: tools.filter(tool => 
        ["Marketing & CRM"].includes(tool.category)
      )
    }
  };

  const handleCategoryChange = (category) => {
    setExpandedCategory(expandedCategory === category ? false : category);
  };

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setActiveTab(0);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleOpenTool = (tool) => {
    setSelectedTool(tool);
  };

  const handleCloseTool = () => {
    setSelectedTool(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production':
        return 'success';
      case 'Développement':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getMetricColor = (value) => {
    if (value >= 90) return 'success';
    if (value >= 75) return 'warning';
    return 'error';
  };

  const renderProjectDetails = () => {
    if (!selectedProject) return null;

    switch (activeTab) {
      case 0: // Vue d'ensemble
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>
              {selectedProject.description}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Impact Business
            </Typography>
            <Typography paragraph>
              {selectedProject.impact}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Technologies
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {selectedProject.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Fonctionnalités Clés
            </Typography>
            <List>
              {selectedProject.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Box>
        );

      case 1: // Métriques
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Performance
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={selectedProject.metrics.performance}
                      color={getMetricColor(selectedProject.metrics.performance)}
                      size={80}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div">
                        {selectedProject.metrics.performance}%
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Fiabilité
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={selectedProject.metrics.reliability}
                      color={getMetricColor(selectedProject.metrics.reliability)}
                      size={80}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div">
                        {selectedProject.metrics.reliability}%
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    Précision
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={selectedProject.metrics.accuracy}
                      color={getMetricColor(selectedProject.metrics.accuracy)}
                      size={80}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div">
                        {selectedProject.metrics.accuracy}%
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case 2: // Mises à jour
        return (
          <Box>
            <List>
              {selectedProject.updates.map((update, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <UpdateIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          Version {update.version} - {update.date}
                        </Typography>
                      }
                      secondary={
                        <List dense>
                          {update.changes.map((change, changeIndex) => (
                            <ListItem key={changeIndex}>
                              <ListItemIcon>
                                <AutoAwesomeIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={change} />
                            </ListItem>
                          ))}
                        </List>
                      }
                    />
                  </ListItem>
                  {index < selectedProject.updates.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <ScienceIcon sx={{ fontSize: 40 }} />
        <Typography variant="h4">
          Innovation Lab
        </Typography>
      </Box>

      {/* Section Stack Technologique */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <BuildIcon color="primary" />
          Stack Technologique
        </Typography>

        <Box sx={{ mb: 4 }}>
          {Object.entries(toolCategories).map(([categoryKey, category]) => (
            <Accordion
              key={categoryKey}
              expanded={expandedCategory === categoryKey}
              onChange={() => handleCategoryChange(categoryKey)}
              sx={{
                mb: 1,
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'background.default',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  <Typography variant="h6">{category.name}</Typography>
                  <Chip 
                    label={`${category.tools.length} outils`}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {category.tools.map((tool) => (
                    <Grid item xs={12} sm={6} md={4} key={tool.id}>
                      <Card 
                        sx={{
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: (theme) => theme.shadows[8],
                          },
                        }}
                        onClick={() => handleOpenTool(tool)}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                              src={tool.logo}
                              sx={{ width: 50, height: 50, mr: 2 }}
                              variant="rounded"
                            />
                            <Box>
                              <Typography variant="h6">{tool.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tool.category}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {tool.description}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Expertise
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tool.expertise}%
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={tool.expertise}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {tool.integrations.slice(0, 3).map((integration, index) => (
                              <Chip
                                key={index}
                                label={integration}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                            {tool.integrations.length > 3 && (
                              <Chip
                                label={`+${tool.integrations.length - 3}`}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

      {/* Dialog pour les détails d'un outil */}
      <Dialog
        open={Boolean(selectedTool)}
        onClose={handleCloseTool}
        maxWidth="md"
        fullWidth
      >
        {selectedTool && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={selectedTool.logo}
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                  />
                  <Typography variant="h6">
                    {selectedTool.name}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseTool}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography paragraph>
                  {selectedTool.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Cas d'utilisation
                </Typography>
                <List>
                  {selectedTool.useCases.map((useCase, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={useCase} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Intégrations
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedTool.integrations.map((integration, index) => (
                    <Chip
                      key={index}
                      label={integration}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<LinkIcon />}
                  href={selectedTool.link}
                  target="_blank"
                >
                  Voir l'outil
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h4" gutterBottom>
        Innovation Lab • AI Ops
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Laboratoire d'innovation en Intelligence Artificielle et Automatisation pour la génération de séquences de prospection personnalisées.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="/images/projects/ai-ops.jpg"
              alt="AI Ops"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                AI Ops • Automation Engine
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Système d'automatisation intelligent pour la génération de séquences de prospection B2B hautement personnalisées.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Progression
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={90} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    90%
                  </Typography>
                </Box>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip label="AI/ML" size="small" />
                <Chip label="Automation" size="small" />
                <Chip label="Data Mining" size="small" />
                <Chip label="NLP" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="/images/projects/data-enrichment.jpg"
              alt="Data Enrichment"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Smart Data Enrichment
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Pipeline d'enrichissement de données intelligent avec scraping multi-sources et agrégation contextuelle.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Progression
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={85} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    85%
                  </Typography>
                </Box>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip label="Web Scraping" size="small" />
                <Chip label="Data Processing" size="small" />
                <Chip label="API Integration" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="/images/projects/nlp-engine.jpg"
              alt="NLP Engine"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                AI Icebreaker Generator
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Moteur NLP avancé pour la génération d'icebreakers personnalisés basés sur l'analyse contextuelle des prospects.
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Progression
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={75} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    75%
                  </Typography>
                </Box>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                <Chip label="NLP" size="small" />
                <Chip label="GPT-4" size="small" />
                <Chip label="Prompt Engineering" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Technologies & Stack
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(toolCategories).map(([category, tools]) => (
            <Grid item xs={12} md={4} key={category}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {tools.icon}
                    <Typography variant="h6">{tools.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {tools.tools.map((tool, index) => (
                      <Chip
                        key={index}
                        label={tool.name}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />
      
      <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AutoAwesomeIcon color="primary" />
        Projets Innovants
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={4} key={project.id}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
              onClick={() => handleOpenProject(project)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {project.category === 'Automatisation' && <SpeedIcon color="primary" />}
                  {project.category === 'Marketing' && <PsychologyIcon color="primary" />}
                  {project.category === 'Infrastructure' && <CodeIcon color="primary" />}
                  <Typography variant="h6" component="div">
                    {project.title}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progression
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={project.status}
                    size="small"
                    color={getStatusColor(project.status)}
                  />
                  <Chip
                    label={project.category}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={Boolean(selectedProject)}
        onClose={handleCloseProject}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LightbulbIcon color="primary" />
                  <Typography variant="h6">
                    {selectedProject.title}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseProject}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs 
                  value={activeTab} 
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  variant="fullWidth"
                >
                  <Tab 
                    icon={<AutoAwesomeIcon />} 
                    label="Vue d'ensemble" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<SpeedIcon />} 
                    label="Métriques" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<TimelineIcon />} 
                    label="Mises à jour" 
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              {renderProjectDetails()}

              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href={selectedProject.github}
                  target="_blank"
                >
                  Code Source
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PlayIcon />}
                  href={selectedProject.demo}
                  target="_blank"
                >
                  Voir la Démo
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default InnovationLab;
