import Element from '../class/Element';
import video from '../../assets/matrix.mp4';

export default class BackgroundVideo extends Element {
  constructor() {
    super(document.body, 'video', 'bg-video');
    Object.assign(this.el, { autoplay: true, loop: true, muted: true });

    const src = new Element(this.el, 'source');
    Object.assign(src.el, { src: video, type: 'video/mp4' });
  }
}
