import { BaseComponent } from '../elements/base-component';
import { Image } from '../elements/image';
import { Loader } from '../store/loader';

export class ProductImage extends BaseComponent {
  private images: BaseComponent[] | undefined;
  private image = new Image();

  private loader = new Loader();

  constructor(imageList: string[]) {
    super({ className: 'store__img' });

    const setImage = (fileName: string): void => {
      this.appendEl(this.loader);
      this.image.getNode().onload = () => this.loader.destroy();
      this.image.getNode().src = `assets/images/keyboards/${fileName}.webp`;
    };

    this.images = imageList.map((v, i, a) => {
      const component = new BaseComponent({ className: 'store__img' });
      const node = component.getNode();

      if (i === 0) setImage(v);

      node.onmouseover = () => setImage(v);
      node.onmouseout = () => setImage(a[0]);

      return component;
    });

    this.appendEl([this.image, ...this.images]);
    this.image.setStyleAttr(['position', 'absolute'], ['zIndex', '0']);
    // this.node.before(this.loader.getNode())
  }
}
