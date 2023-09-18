import newsPlaceholder from 'assets/placeholder.webp';
import { Article } from '../../../types/interfaces/article.interface';
import './news.css';

class News {
  draw(data: Article[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
    if (!newsItemTemp) return;

    const setChildText = (element: DocumentFragment, selector: string, text: string) => {
      const child = element.querySelector(selector);
      if (child) child.textContent = text;
    };

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      if (!(newsClone instanceof DocumentFragment)) return;

      if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
      if (metaPhoto) metaPhoto.style.backgroundImage = `url(${item.urlToImage || newsPlaceholder})`;
      setChildText(newsClone, '.news__meta-author', item.author || item.source.name);
      setChildText(newsClone, '.news__meta-date', item.publishedAt.slice(0, 10).split('-').reverse().join('-'));
      setChildText(newsClone, '.news__description-title', item.title);
      setChildText(newsClone, '.news__description-source', item.source.name);
      setChildText(newsClone, '.news__description-content', item.description);

      newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news');
    if (!newsElement) return;
    newsElement.innerHTML = '';
    newsElement.appendChild(fragment);
  }
}

export default News;
