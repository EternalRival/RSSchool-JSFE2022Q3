import Element from './Element';
import Player from './Player';

export default class TVShowCard extends Element {
  constructor(parent, tvShow) {
    super(parent, 'div', 'tv-show');
    this.preview = new Element(this.el, 'div', 'tv-show__preview');
    this.img = new Element(this.preview.el, 'img', 'tv-show__image');
    this.player = new Element(this.preview.el, 'div', 'tv-show__player');
    this.title = new Element(this.player.el, 'div', 'tv-show__title', tvShow.getTitle());
    this.year = new Element(this.player.el, 'div', 'tv-show__year', tvShow.getYear());
    this.audio = new Player(this.player.el, tvShow.getAudio(), 'tv-show__audio', {
      preload: 'metadata',
      volume: 0.33,
    });
    this.description = new Element(this.el, 'div', 'tv-show__description', tvShow.getDescription());
    this.img.el.alt = '';
    tvShow.setImage(this.img.el);
  }
}
