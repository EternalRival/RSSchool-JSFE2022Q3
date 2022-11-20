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

  async setAudio(element, options) {
    const audio = await import(`../../assets/tv-shows/music/${this.#URN}.mp3`);
    Object.assign(element, { src: audio.default, ...options });
  }

  async setImage(element) {
    const image = await import(`../../assets/tv-shows/img/${this.#URN}.jpg`);
    Object.assign(element, { src: image.default });
  }
}
