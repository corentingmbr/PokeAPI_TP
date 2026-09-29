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

export default Type;
