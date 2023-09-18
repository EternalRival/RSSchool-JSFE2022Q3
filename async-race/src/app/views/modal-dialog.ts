import { Component, ComponentProps } from '../../components/Component';

export class Modal extends Component {
  private background = new Component({ className: 'modal', parent: document.body });
  constructor(props?: Omit<ComponentProps, 'parent'>) {
    super({ ...props, className: 'modal__dialog' });
    this.background.append(this);
    this.background.node.addEventListener('click', (e) => {
      if (e.target === this.background.node) {
        this.destroy();
      }
    });
  }
  public destroy(): void {
    this.background.destroy();
  }
}
