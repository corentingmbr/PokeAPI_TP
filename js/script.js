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





function getTypeColors(type) {
  const normalizedType = (type || '').trim().toLowerCase();

  switch (normalizedType) {
    case 'plante':
    case 'grass':
      return {
        border: '#3d7a6b',
        background: '#3d7a6bb3',
        badge: '#2d5a4e'
      };

    case 'feu':
    case 'fire':
      return {
        border: '#e66d00',
        background: '#e66d00b3',
        badge: '#b34700'
      };

    case 'eau':
    case 'water':
      return {
        border: '#2a75d3',
        background: '#2a75d3b3',
        badge: '#185499'
      };

    case 'poison':
      return {
        border: '#8a448d',
        background: '#8a448db3',
        badge: '#5e2b60'
      };

    case 'insecte':
    case 'bug':
      return {
        border: '#889e27',
        background: '#889e27b3',
        badge: '#5e6d19'
      };

    case 'vol':
    case 'flying':
      return {
        border: '#7da4e8',
        background: '#7da4e8b3',
        badge: '#4a7bc9'
      };

    case 'normal':
      return {
        border: '#8b8b7a',
        background: '#8b8b7ab3',
        badge: '#616155'
      };

    case 'électrik':
    case 'electrik':
    case 'electric':
      return {
        border: '#e5b700',
        background: '#e5b700b3',
        badge: '#a88600'
      };

    case 'sol':
    case 'ground':
      return {
        border: '#b58b47',
        background: '#b58b47b3',
        badge: '#82602a'
      };

    case 'fée':
    case 'fee':
    case 'fairy':
      return {
        border: '#d96c9c',
        background: '#d96c9cb3',
        badge: '#9e466e'
      };

    case 'combat':
    case 'fighting':
      return {
        border: '#a53329',
        background: '#a53329b3',
        badge: '#701e17'
      };

    case 'psy':
    case 'psychic':
      return {
        border: '#db3f6b',
        background: '#db3f6bb3',
        badge: '#962343'
      };

    case 'roche':
    case 'rock':
      return {
        border: '#9e8c45',
        background: '#9e8c45b3',
        badge: '#695c2b'
      };

    case 'spectre':
    case 'ghost':
      return {
        border: '#605898',
        background: '#605898b3',
        badge: '#3f386b'
      };

    case 'glace':
    case 'ice':
      return {
        border: '#5cb8b2',
        background: '#5cb8b2b3',
        badge: '#37827d'
      };

    case 'dragon':
      return {
        border: '#5b38d6',
        background: '#5b38d6b3',
        badge: '#391d9c'
      };

    case 'acier':
    case 'steel':
      return {
        border: '#8f9bb3',
        background: '#8f9bb3b3',
        badge: '#5c697e'
      };

    case 'ténèbres':
    case 'tenebres':
    case 'dark':
      return {
        border: '#544439',
        background: '#544439b3',
        badge: '#33271f'
      };

    default:
      return {
        border: 'grey',
        background: 'grey',
        badge: '#000000'
      };
  }
}




async function initFrenchNamesDictionary() {
  try {
    const response = await fetch('./data/names_fr.json');
    if (response.ok) {
      frenchNamesCache = await response.json();
    }
  } catch (error) {
    console.warn('Impossible de charger le dictionnaire names_fr.json en local :', error);
  }
}





function createPokemonArticle(pokemon) {
  
  const article = document.createElement('article');

  
  const colors = getTypeColors(pokemon.primaryType);
  article.style.borderColor = colors.border;
  article.style.backgroundColor = colors.background;

  
  article.innerHTML = `
    <figure>
      <picture>
        <img src="${pokemon.image}" alt="Image ${pokemon.name}" loading="lazy" />
      </picture>
      <figcaption>
        <span class="types" style="background-color: ${colors.badge};">${pokemon.primaryType}</span>
        <h2>${pokemon.name}</h2>
        <ol>
          <li>Points de vie : ${pokemon.stats.hp}</li>
          <li>Attaque : ${pokemon.stats.attack}</li>
          <li>Défense : ${pokemon.stats.defense}</li>
          <li>Attaque spécial : ${pokemon.stats.specialAttack}</li>
          <li>Vitesse : ${pokemon.stats.speed}</li>
        </ol>
      </figcaption>
    </figure>
  `;

  return article;
}


function renderPokemons(pokemonsList) {
  
  mainContainer.innerHTML = '';

  if (!pokemonsList || pokemonsList.length === 0) {
    mainContainer.innerHTML = '<p class="status-message">Aucun Pokémon ne correspond au filtre sélectionné.</p>';
    return;
  }

  
  pokemonsList.forEach((pokemon) => {
    const article = createPokemonArticle(pokemon);
    mainContainer.appendChild(article);
  });
}






function applyFilterAndSort() {
  
  let result = [...currentPokemons];

  if (selectedTypeFilter) {
    result = result.filter((pokemon) =>
      pokemon.types.some(
        (type) => type.toLowerCase() === selectedTypeFilter.toLowerCase()
      )
    );
  }

  
  result.sort((a, b) => {
    switch (selectedSortCriteria) {
      case 'name':
        
        return a.name.localeCompare(b.name, 'fr');

      case 'hp':
        
        return b.stats.hp - a.stats.hp;

      case 'attack':
        
        return b.stats.attack - a.stats.attack;

      case 'type':
        
        return a.primaryType.localeCompare(b.primaryType, 'fr');

      case 'id':
      default:
        
        return a.id - b.id;
    }
  });

  
  renderPokemons(result);
}


function renderTypeFilterButtons(pokemonsList) {
  typesContainer.innerHTML = '';

  
  const presentTypes = new Set();
  pokemonsList.forEach((pokemon) => {
    pokemon.types.forEach((type) => presentTypes.add(type));
  });

  
  const allButton = document.createElement('div');
  allButton.className = !selectedTypeFilter ? 'active' : '';
  allButton.innerHTML = `
    <p style="font-size: 0.9rem; margin: auto;">Tous</p>
  `;
  allButton.addEventListener('click', () => {
    selectedTypeFilter = null;
    updateActiveTypeButton(allButton);
    applyFilterAndSort();
  });
  typesContainer.appendChild(allButton);

  
  Array.from(presentTypes).sort().forEach((typeName) => {
    const typeKey = typeName.toLowerCase();
    const iconUrl = TYPE_ICONS[typeKey] || 'https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/normal.png';

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






async function loadData(generationNumber) {
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

        
        const types = details.types.map((t) => {
          const typeEn = t.type.name;
          return TYPE_TRANSLATIONS[typeEn] || typeEn;
        });

        
        const statsMap = {};
        details.stats.forEach((s) => {
          statsMap[s.stat.name] = s.base_stat;
        });

        
        const image =
          details.sprites?.other?.['official-artwork']?.front_default ||
          details.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return {
          id: details.id,
          name: frenchName,
          image: image,
          types: types,
          primaryType: types[0] || 'Normal',
          stats: {
            hp: statsMap['hp'] || 0,
            attack: statsMap['attack'] || 0,
            defense: statsMap['defense'] || 0,
            specialAttack: statsMap['special-attack'] || 0,
            speed: statsMap['speed'] || 0
          }
        };
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

    console.log(`Génération ${generationNumber} chargée avec succès :`, currentPokemons.length, 'Pokémon.');
  } catch (error) {
    console.error(`Erreur réseau/API sur loadData(${generationNumber}) :`, error);

    
    if (String(generationNumber) === '1') {
      console.warn('Basculement sur data.json local...');
      await loadLocalFallbackData();
    } else {
      mainContainer.innerHTML = `
        <p class="status-message" style="color: #ff6b6b;">
          Impossible de contacter PokéAPI pour la génération ${generationNumber}.
          Vérifiez votre connexion internet.
        </p>
      `;
    }
  }
}


async function loadLocalFallbackData() {
  try {
    const response = await fetch('./data/data.json');
    const localData = await response.json();
    console.log('Données chargées depuis data.json (TP 18) :', localData);

    currentPokemons = localData.map((item) => ({
      id: item.pokedexId,
      name: item.name,
      image: item.image,
      types: item.apiTypes.map((t) => t.name),
      primaryType: item.apiTypes[0]?.name || 'Normal',
      stats: {
        hp: item.stats.HP,
        attack: item.stats.attack,
        defense: item.stats.defense,
        specialAttack: item.stats.special_attack,
        speed: item.stats.speed
      }
    }));

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
  console.log(`Génération sélectionnée (event change) : ${chosenGeneration}`);
  loadData(chosenGeneration);
});


sortSelect.addEventListener('change', (event) => {
  selectedSortCriteria = event.target.value;
  console.log(`Critère de tri sélectionné : ${selectedSortCriteria}`);
  applyFilterAndSort();
});


async function initApp() {
  
  await initFrenchNamesDictionary();

  
  loadData(1);
}


initApp();