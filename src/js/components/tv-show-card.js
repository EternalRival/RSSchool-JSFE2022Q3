import Element from '../class/Element';

export default class TVShowCard {
  constructor(parent, tvShow) {
    this.card = new Element(parent, 'div', 'tv-show');
    this.preview = new Element(this.card.el, 'div', 'tv-show__preview');
    this.img = new Element(this.preview.el, 'img', 'tv-show__image');
    this.player = new Element(this.preview.el, 'div', 'tv-show__player');
    this.title = new Element(this.player.el, 'div', 'tv-show__title', tvShow.getTitle());
    this.year = new Element(this.player.el, 'div', 'tv-show__year', tvShow.getYear());
    this.audio = new Element(this.player.el, 'audio', 'tv-show__audio');
    this.description = new Element(
      this.card.el,
      'div',
      'tv-show__description',
      tvShow.getDescription(),
    );
    tvShow.setImage(this.img.el);
    tvShow.setAudio(this.audio.el, { controls: true, preload: 'metadata' });
  }
}
