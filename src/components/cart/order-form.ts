import Imask from 'imask';
import { Loader } from '../store/loader';
import { DB } from '../../services/db/database';
import { BaseComponent } from '../elements/base-component';
import { Button } from '../elements/button';
import { FormField } from '../elements/form-field';
import { Card } from './card';

export class OrderForm extends BaseComponent {
  private modalOverlay: BaseComponent;

  private modalContent: BaseComponent;

  private modalForm: BaseComponent;

  private nameField: FormField;

  private phoneField: FormField;

  private addressField: FormField;

  private emailField: FormField;

  private card: Card;

  private modalSubmit: Button;

  private modalClose: Button;

  private loader: Loader;

  constructor() {
    super({ className: 'modal' });
    this.loader = new Loader();
    this.modalOverlay = new BaseComponent({ className: 'modal__overlay' });
    this.modalContent = new BaseComponent({ className: 'modal__content' });
    this.modalForm = new BaseComponent({ tag: 'form', className: 'modal__form' });
    this.nameField = new FormField({
      className: 'modal',
      text: 'Имя Фамилия',
      placeholder: 'Василий Клаб',
      type: 'text',
      pattern: `^([\\wА-я]{3,} ?){2,}$`,
    });
    this.phoneField = new FormField({
      className: 'modal',
      text: 'Телефон',
      type: 'tel',
      placeholder: '+7(982)-386-22-16',
      pattern: `\\+7\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}`,
    });
    const phoneMaskOption = {
      mask: '+{7}(000)-000-00-00',
      lazy: false,
    };
    Imask(this.phoneField.getInputNode(), phoneMaskOption);
    this.addressField = new FormField({
      className: 'modal',
      text: 'Адрес доставки',
      placeholder: 'Кукушкина 5 дом 10',
    });
    this.emailField = new FormField({
      className: 'modal',
      text: 'E-mail',
      type: 'email',
      placeholder: 'kotopes@mail.ru',
      pattern: '.+@.+\\..+',
    });
    this.card = new Card();
    this.modalSubmit = new Button({
      className: 'modal__submit',
      text: 'Заказать',
    });
    this.modalClose = new Button({
      className: 'modal__close',
      aria: 'Закрыть',
      parent: this.modalContent.getNode(),
      onclick: () => {
        this.destroy();
        document.body.classList.remove('no-scroll');
      },
    });
    this.modalForm.getNode().onsubmit = () => {
      document.body.append(this.loader.getNode());
      setTimeout(() => {
        window.location.hash = '#store';
        this.destroy();
        DB.cart.clear();
        DB.cart.promo.clear();
        this.loader.destroy();
      }, 3500);
    }
    // render
    this.appendEl(this.modalOverlay);
    this.modalOverlay.appendEl(this.modalContent);
    this.modalContent.appendEl(this.modalForm);
    this.modalForm.appendEl([
      this.nameField,
      this.phoneField,
      this.addressField,
      this.emailField,
      this.card,
      this.modalSubmit,
    ]);
    this.modalOverlay.getNode().addEventListener('click', (e) => {
      const { target } = e;
      if (target === this.modalOverlay.getNode()) {
        this.destroy();
        document.body.classList.remove('no-scroll');
      }
    });
  }
}
