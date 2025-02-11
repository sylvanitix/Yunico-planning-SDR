# Poker AI avec YOLO

Ce projet utilise l'intelligence artificielle et la détection d'objets YOLO pour jouer au poker en détectant les cartes via une webcam.

## Prérequis

- Python 3.8 ou supérieur
- Une webcam
- Les dépendances listées dans requirements.txt

## Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
pip install -r requirements.txt
```

## Utilisation

Pour lancer le programme :
```bash
python poker_ai.py
```

Le programme va :
1. Activer votre webcam
2. Détecter les cartes présentes
3. Analyser la situation de jeu
4. Proposer les meilleures décisions

Pour quitter le programme, appuyez sur 'q'.

## Note importante

Ce projet est en cours de développement. Les fonctionnalités suivantes sont à venir :
- Entraînement personnalisé de YOLO pour la détection des cartes
- Amélioration de la logique de décision
- Interface utilisateur plus élaborée
