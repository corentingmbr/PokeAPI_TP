# PokéAPI - Pokédex Interactif

Application web interactive de consultation et de gestion de Pokédex développée en JavaScript Vanilla (ES6+) et packagée avec Vite.

## Fonctionnalités

- **Rendu dynamique du DOM (TP 18)** : Génération des cartes Pokémon à l'aide de template literals et adaptation dynamique des couleurs selon le type principal.
- **Consommation d'API (TP 19)** : Récupération asynchrone des données officielles via PokéAPI par génération (1 à 8) avec localisation des noms et types en français.
- **Programmation fonctionnelle (TP 20)** :
  - Filtrage multi-critères par type (`Array.prototype.filter`).
  - Tri dynamique (`Array.prototype.sort`) par numéro Pokédex, nom, points de vie, attaque et type.
- **Programmation Orientée Objet (TP 21)** : Modélisation des entités avec les classes `Pokemon` et `Type` encapsulant les données et la logique d'affichage (`displayCard()`, `getColorHexa()`).
- **Architecture modulaire (TP 23)** : Séparation des responsabilités en modules ES6 (`Pokemon.js`, `Type.js`, `script.js`).

## Structure du projet

```text
PokeAPI_TP/
├── css/
│   ├── normalize.css
│   └── style.css
├── data/
│   ├── data.json
│   └── names_fr.json
├── js/
│   ├── Pokemon.js
│   ├── Type.js
│   └── script.js
├── public/
├── index.html
├── package.json
└── vite.config.js
```
## Usage de L'IA

L'IA a servi à :

- La rédaction des commit, la mise en place des fichiers / Dossiers de projet depuis le REPO professeur (pour l'environnement vite). 
- La gestion du repo (messages de commit / relecture du code produit et organisation du repo)
- La refonte Graphique de l'outil (mode sombre + Implémentation des icônes de types pour la bannière de tri par Type)
- La rédaction du README.md

## Installation & Lancement

Prérequis : Node.js (version 18 ou supérieure recommandée).

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```

3. Compiler pour la production :
   ```bash
   npm run build
   ```

## Technologies

• HTML5 / CSS3 (CSS Grid & Flexbox)  
• JavaScript moderne (ES6+ Modules, Async/Await, Classes)  
• Vite  
• PokéAPI
