export default class TVShow {
  #title;

  #description;

  #URN;

  #year;

  constructor(title, year, URN, description) {
    this.#title = title;
    this.#description = description;
    this.#URN = URN;
    this.#year = year;
  }

  getTitle() {
    return this.#title;
  }

  getYear() {
    return this.#year;
  }

  getDescription() {
    return this.#description;
  }

  async getAudio() {
    return (await import(`../../assets/tv-shows/music/${this.#URN}.mp3`)).default;
  }

  async setImage(element) {
    const image = await import(`../../assets/tv-shows/img/${this.#URN}.webp`);
    Object.assign(element, { src: image.default });
  }
}
