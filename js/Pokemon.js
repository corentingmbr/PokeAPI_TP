import Type from './Type.js';

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

export default Pokemon;
