/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseComponent } from './elements/base-component';
import { Button } from './elements/button';
import { Filters } from './filters/filtres';
import { ProductCard } from './product/product-card';
import { StoreContent } from './store-content';
import { ProductsListState } from '../states/goods-state';
import { Keyboard } from '../services/db/keyboard';
import { ChangeView } from './elements/change-view';
import { DB } from '../services/db/database';
import { getNoun } from '../utils/get-noun';

export class Store extends BaseComponent {
  private chunkSize = 20;
  private chunkNumber = 0;

  private container = new BaseComponent({ className: 'container' });
  private wrapper = new BaseComponent({ className: 'store__wrapper' });
  private title = new BaseComponent<HTMLHeadingElement>({ tag: 'h1', className: 'store__title', text: 'Клавиатуры' });
  private showFiltersBtn = new Button({ className: 'store__filter', text: 'Фильтры' });
  private contentWrapper = new BaseComponent({ className: 'store__content' });
  private storeList = new StoreContent();
  private storeItems: ProductCard[] = [];
  private changeView = new ChangeView();
  private goodsCount = new BaseComponent({ className: 'store__goods-count' });

  private filters = new Filters(new ProductsListState(DB.filter.list));
  private nextButton = new Button({
    text: 'Показать еще',
    className: 'store__more',
    onclick: () => {
      this.storeList.appendEl(this.chunk);
      this.renderBottomButton();
    },
  });
  private scrollButton = new Button({
    text: 'Наверх',
    className: 'store__more',
    onclick: () => window.scrollTo({ behavior: 'smooth', top: 0 }),
  });

  constructor(/* private productsState: ProductsListState */) {
    super({ tag: 'section', className: 'store' });

    this.showFiltersBtn.getNode().onclick = () => {
      const { classList } = this.wrapper.getNode();
      classList.toggle('store__wrapper_is-open');

      if (!classList.contains('store__wrapper_is-open')) this.filters.destroy();
      else this.contentWrapper.getNode().prepend(this.filters.getNode());
    };

    this.appendEl(this.container);
    this.container.appendEl(this.wrapper);
    this.wrapper.appendEl([this.title, this.showFiltersBtn, this.contentWrapper]);
    this.contentWrapper.appendEl([this.storeList, this.changeView]);

    window.addEventListener('hashchange', () => {
      console.warn('hashhhh');
      this.update();
    });
    this.update();
  }

  update = () => {
    this.chunkNumber = 0;
    this.storeItems = this.chunk;
    this.storeList.getNode().replaceChildren();
    this.storeList.appendEl(this.storeItems);
    this.contentWrapper.appendEl(this.goodsCount);
    const num = this.productsState.get().length;
    if (num === 0)
      this.goodsCount.setText('По вашему запросу нет результатов')
    else if (num === DB.keyboards.length)
      this.goodsCount.setText('');
    else
      this.goodsCount
        .setText(`По вашему запросу ${num > 1 ? 'найдено' : 'найден'
          } ${num} ${getNoun(num, 'результат', 'результата', 'результатов')}`);
    // TODO! переписать условие, когда будут QueryParams
    this.renderBottomButton();
  };

  private get chunk() {
    return DB.getChunk(this.chunkNumber++, this.chunkSize, DB.filter.list).map(
      (item: Keyboard) => new ProductCard(item),
    );
  }

  private renderBottomButton() {
    const [length, number, size] = [DB.filter.list.length, this.chunkNumber, this.chunkSize];
    const [next, scroll] = [this.nextButton.getNode(), this.scrollButton.getNode()];

    next.remove();

    if (length >= size) this.wrapper.appendEl(next);

    if (number * size >= length) next.replaceWith(scroll);
    else scroll.replaceWith(next);
  }
}
