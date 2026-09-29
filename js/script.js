class Type {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.color = this.getColorHexa();
  }

  getColorHexa() {
    switch (this.name) {
      case 'Eau':
      case 'Water':
        return '#2a75d3';
      case 'Plante':
      case 'Grass':
        return '#3d7a6b';
      case 'Poison':
        return '#D850C2';
      case 'Vol':
      case 'Flying':
        return '#738DDB';
      case 'Feu':
      case 'Fire':
        return '#e66d00';
      case 'Insecte':
      case 'Bug':
        return '#70B901';
      case 'Électrik':
      case 'Electric':
        return '#FFD244';
      case 'Sol':
      case 'Ground':
        return '#CD793F';
      case 'Fée':
      case 'Fairy':
        return '#d96c9c';
      case 'Combat':
      case 'Fighting':
        return '#a53329';
      case 'Psy':
      case 'Psychic':
        return '#FD6960';
      case 'Acier':
      case 'Steel':
        return '#246A79';
      case 'Glace':
      case 'Ice':
        return '#67D1C8';
      case 'Roche':
      case 'Rock':
        return '#CBB866';
      case 'Dragon':
        return '#1C6ABB';
      case 'Ténèbres':
      case 'Dark':
        return '#544439';
      case 'Normal':
        return '#8b8b7a';
      case 'Spectre':
      case 'Ghost':
        return '#605898';
      default:
        return '#808080';
    }
  }
}

class Pokemon {
  constructor(data) {
    this.id = data.id || data.pokedexId;
    this.image = data.image;
    this.name = data.name;
    this.arrTypes = Array.isArray(data.apiTypes || data.arrTypes)
      ? (data.apiTypes || data.arrTypes).map((t) => (t instanceof Type ? t : new Type(t)))
      : [];
    this.apiTypes = this.arrTypes;
    this.attack = data.stats ? data.stats.attack : data.attack;
    this.defense = data.stats ? data.stats.defense : data.defense;
    this.special_attack = data.stats ? data.stats.special_attack : data.special_attack;
    this.speed = data.stats ? data.stats.speed : data.speed;
    this.HP = data.stats ? data.stats.HP : (data.HP || 0);
  }

  displayCard() {
    const article = document.createElement('article');
    const primaryType = this.arrTypes[0];
    const color = primaryType ? primaryType.color : '#808080';

    article.style.borderColor = color;
    article.style.backgroundColor = color;

    article.innerHTML = `
      <figure>
        <picture>
          <img src="${this.image}" alt="Image ${this.name}" loading="lazy" />
        </picture>
        <figcaption>
          <span class="types" style="background-color: ${color};">${primaryType ? primaryType.name : ''}</span>
          <h2>${this.name}</h2>
          <ol>
            <li>Points de vie : ${this.HP}</li>
            <li>Attaque : ${this.attack}</li>
            <li>Défense : ${this.defense}</li>
            <li>Attaque spécial : ${this.special_attack}</li>
            <li>Vitesse : ${this.speed}</li>
          </ol>
        </figcaption>
      </figure>
    `;

    return article;
  }
}

export { Pokemon, Type };

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fighting: 'Combat',
  flying: 'Vol',
  poison: 'Poison',
  ground: 'Sol',
  rock: 'Roche',
  bug: 'Insecte',
  ghost: 'Spectre',
  steel: 'Acier',
  fire: 'Feu',
  water: 'Eau',
  grass: 'Plante',
  electric: 'Électrik',
  psychic: 'Psy',
  ice: 'Glace',
  dragon: 'Dragon',
  dark: 'Ténèbres',
  fairy: 'Fée',
  stellar: 'Stellaire'
};

const TYPE_ICONS = {
  plante: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/grass.png',
  feu: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fire.png',
  eau: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/water.png',
  poison: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/poison.png',
  insecte: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/bug.png',
  vol: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/flying.png',
  normal: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/normal.png',
  électrik: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/electric.png',
  sol: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/ground.png',
  fée: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fairy.png',
  combat: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fighting.png',
  psy: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/psychic.png',
  roche: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/rock.png',
  spectre: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/ghost.png',
  glace: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/ice.png',
  dragon: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/dragon.png',
  acier: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/steel.png',
  ténèbres: 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/dark.png'
};

let currentPokemons = [];
let selectedTypeFilter = null;
let selectedSortCriteria = 'id';
let frenchNamesCache = {};

const mainContainer = document.querySelector('main');
const generationSelect = document.getElementById('generation-select');
const sortSelect = document.getElementById('sort-select');
const typesContainer = document.getElementById('types');

async function initFrenchNamesDictionary() {
  try {
    const response = await fetch('./data/names_fr.json');
    if (response.ok) {
      frenchNamesCache = await response.json();
    }
  } catch (error) {
    console.warn('Dictionnaire local names_fr.json indisponible :', error);
  }
}

function renderPokemons(pokemonsList) {
  mainContainer.innerHTML = '';

  if (!pokemonsList || pokemonsList.length === 0) {
    mainContainer.innerHTML = '<p class="status-message">Aucun Pokémon ne correspond au filtre sélectionné.</p>';
    return;
  }

  pokemonsList.forEach((pokemon) => {
    const article = pokemon.displayCard();
    mainContainer.appendChild(article);
  });
}

function applyFilterAndSort() {
  let result = [...currentPokemons];

  if (selectedTypeFilter) {
    result = result.filter((pokemon) =>
      pokemon.arrTypes.some(
        (t) => t.name.toLowerCase() === selectedTypeFilter.toLowerCase()
      )
    );
  }

  result.sort((a, b) => {
    switch (selectedSortCriteria) {
      case 'name':
        return a.name.localeCompare(b.name, 'fr');
      case 'hp':
        return b.HP - a.HP;
      case 'attack':
        return b.attack - a.attack;
      case 'type':
        const typeA = a.arrTypes[0]?.name || '';
        const typeB = b.arrTypes[0]?.name || '';
        return typeA.localeCompare(typeB, 'fr');
      case 'id':
      default:
        return a.id - b.id;
    }
  });

  renderPokemons(result);
}

function renderTypeFilterButtons(pokemonsList) {
  typesContainer.innerHTML = '';

  const presentTypesMap = new Map();
  pokemonsList.forEach((pokemon) => {
    pokemon.arrTypes.forEach((t) => {
      if (!presentTypesMap.has(t.name)) {
        presentTypesMap.set(t.name, t.image);
      }
    });
  });

  const allButton = document.createElement('div');
  allButton.className = !selectedTypeFilter ? 'active' : '';
  allButton.innerHTML = `<p style="font-size: 0.9rem; margin: auto;">Tous</p>`;
  allButton.addEventListener('click', () => {
    selectedTypeFilter = null;
    updateActiveTypeButton(allButton);
    applyFilterAndSort();
  });
  typesContainer.appendChild(allButton);

  Array.from(presentTypesMap.keys()).sort().forEach((typeName) => {
    const typeKey = typeName.toLowerCase();
    const iconUrl = presentTypesMap.get(typeName) || TYPE_ICONS[typeKey] || 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/normal.png';

    const typeDiv = document.createElement('div');
    if (selectedTypeFilter && selectedTypeFilter.toLowerCase() === typeKey) {
      typeDiv.classList.add('active');
    }

    typeDiv.innerHTML = `
      <img src="${iconUrl}" alt="${typeName}" />
      <p>${typeName}</p>
    `;

    typeDiv.addEventListener('click', () => {
      if (selectedTypeFilter === typeName) {
        selectedTypeFilter = null;
      } else {
        selectedTypeFilter = typeName;
      }
      updateActiveTypeButton(selectedTypeFilter ? typeDiv : allButton);
      applyFilterAndSort();
    });

    typesContainer.appendChild(typeDiv);
  });
}

function updateActiveTypeButton(activeButton) {
  const buttons = typesContainer.querySelectorAll('div');
  buttons.forEach((btn) => btn.classList.remove('active'));
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

async function loadData(generationNumber = 1) {
  console.log(`loadData(${generationNumber}) déclenché.`);
  mainContainer.innerHTML = '<p class="status-message">Chargement des Pokémon en cours...</p>';

  try {
    const genResponse = await fetch(`${POKEAPI_BASE_URL}/generation/${generationNumber}`);
    if (!genResponse.ok) {
      throw new Error(`Erreur HTTP lors de la récupération de la génération ${generationNumber}`);
    }

    const genData = await genResponse.json();

    const pokemonSpeciesList = genData.pokemon_species || [];
    const pokemonIds = pokemonSpeciesList
      .map((species) => {
        const parts = species.url.split('/').filter(Boolean);
        return parseInt(parts[parts.length - 1], 10);
      })
      .sort((a, b) => a - b);

    const fetchPromises = pokemonIds.map(async (id) => {
      try {
        const res = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        if (!res.ok) return null;
        const details = await res.json();

        const frenchName = frenchNamesCache[id] || details.name;

        const apiTypes = details.types.map((t) => {
          const typeEn = t.type.name;
          const typeFr = TYPE_TRANSLATIONS[typeEn] || typeEn;
          const typeIcon = TYPE_ICONS[typeFr.toLowerCase()] || `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${typeEn}.png`;
          return new Type({ name: typeFr, image: typeIcon });
        });

        const statsMap = {};
        details.stats.forEach((s) => {
          statsMap[s.stat.name] = s.base_stat;
        });

        const image =
          details.sprites?.other?.['official-artwork']?.front_default ||
          details.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return new Pokemon({
          id: details.id,
          name: frenchName,
          image: image,
          arrTypes: apiTypes,
          stats: {
            HP: statsMap['hp'] || 0,
            attack: statsMap['attack'] || 0,
            defense: statsMap['defense'] || 0,
            special_attack: statsMap['special-attack'] || 0,
            speed: statsMap['speed'] || 0
          }
        });
      } catch (err) {
        console.error(`Erreur pour le Pokémon #${id} :`, err);
        return null;
      }
    });

    const results = await Promise.all(fetchPromises);
    currentPokemons = results.filter(Boolean);

    selectedTypeFilter = null;
    renderTypeFilterButtons(currentPokemons);
    applyFilterAndSort();

    console.log(`Génération ${generationNumber} : ${currentPokemons.length} instances de Pokemon créées.`);
  } catch (error) {
    console.error(`Erreur réseau/API :`, error);

    if (String(generationNumber) === '1') {
      console.warn('Basculement sur data.json local...');
      await loadLocalFallbackData();
    } else {
      mainContainer.innerHTML = `
        <p class="status-message" style="color: #ff6b6b;">
          Impossible de contacter l'API pour la génération ${generationNumber}.
        </p>
      `;
    }
  }
}

async function loadLocalFallbackData() {
  try {
    const response = await fetch('./data/data.json');
    const localData = await response.json();

    currentPokemons = localData.map((item) => new Pokemon(item));

    selectedTypeFilter = null;
    renderTypeFilterButtons(currentPokemons);
    applyFilterAndSort();
  } catch (err) {
    console.error('Erreur lors du chargement de data.json :', err);
    mainContainer.innerHTML = '<p class="status-message">Erreur lors du chargement des données locales.</p>';
  }
}

generationSelect.addEventListener('change', (event) => {
  const chosenGeneration = event.target.value;
  console.log(`Génération sélectionnée : ${chosenGeneration}`);
  loadData(chosenGeneration);
});

sortSelect.addEventListener('change', (event) => {
  selectedSortCriteria = event.target.value;
  console.log(`Critère de tri : ${selectedSortCriteria}`);
  applyFilterAndSort();
});

async function initApp() {
  await initFrenchNamesDictionary();
  loadData(1);
}

initApp();
