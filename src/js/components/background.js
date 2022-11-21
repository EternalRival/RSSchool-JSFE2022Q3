import Element from '../class/Element';
import matrixImg from '../../assets/backgrounds/matrix.jpg';
import matrixVideo from '../../assets/backgrounds/matrix.mp4';

export default class BackgroundVideo extends Element {
  constructor() {
    super(document.body, 'video', 'bg-video');
    Object.assign(this.el, {
      autoplay: true,
      loop: true,
      muted: true,
      poster: matrixImg,
    });

    const src = new Element(this.el, 'source');
    Object.assign(src.el, { src: matrixVideo, type: 'video/mp4' });
  }
}

import('../checklist');
