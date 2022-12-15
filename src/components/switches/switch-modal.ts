import { DB } from '../../services/db/Database';
import BaseComponent from '../elements/base-component';

export default class SwitchModal extends BaseComponent {
  private modalTitle: BaseComponent;

  private modalAvialable: BaseComponent;

  private modalInfo: BaseComponent;

  private modalDescription: BaseComponent;

  private modalImg: BaseComponent;

  private modalStats: BaseComponent[];

  constructor(id: string, isAvialable: boolean) {
    super({ className: 'modal' });
    this.modalTitle = new BaseComponent({
      tag: 'h2',
      className: 'modal__title',
      parent: this.node,
      text: DB.getSwitchData(id, 'title') as string,
    });

    this.modalAvialable = new BaseComponent({
      className: `${isAvialable ? 'store__card-av store__card-av_true' : 'store__card-av store__card-av_false'}`,
      text: `${isAvialable ? 'В наличии' : 'Нет в наличии'}`,
      parent: this.node,
    });
    this.modalInfo = new BaseComponent({
      className: 'modal__info',
      parent: this.node,
    });
    this.modalImg = new BaseComponent({ className: 'modal__img', parent: this.modalInfo.getNode() });
    import (`../../assets/images/switches/AJP.webp`).then((url) => {
      this.modalImg.getNode().style.backgroundImage = `url(${url.default})`;
    });
    this.modalStats = (DB.getSwitchData(id, 'props') as string[]).map((item) => new BaseComponent({ className: 'modal__stats', text: item, parent: this.modalInfo.getNode() }));
    this.modalDescription = new BaseComponent({
      tag: 'p',
      className: 'modal__description',
      parent: this.node,
      text: DB.getSwitchData(id, 'description') as string,
    });
  }
}
