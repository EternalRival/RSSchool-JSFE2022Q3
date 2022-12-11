import { IKek as IDrawSource, NewsItem, Source } from '../../interfaces/interfaces';
import './news.css';

class News implements IDrawSource {
    draw(data: NewsItem[]) {
        /*
        data: {
            "source": {
                         "id": "abc-news",
                         "name": "ABC News"
                      },
                      "author": "The Associated Press",
                      "title": "Scientists lower alert for Mauna Loa, say eruption could end",
                      "description": "Scientists have lowered the alert level for the Mauna Loa volcano on Hawaii’s Big Island and say its first eruption in nearly 40 years may soon end",
                      "url": "https://abcnews.go.com/US/wireStory/scientists-lower-alert-mauna-loa-eruption-end-94965247",
                      "urlToImage": "https://s.abcnews.com/images/US/WireAP_97774604598f4e24a3e644191ea07f90_16x9_992.jpg",
                      "publishedAt": "2022-12-11T03:03:59Z",
                      "content": "HONOLULU -- Scientists lowered the alert level for the Mauna Loa volcano on Hawaii's Big Island from a warning to a watch on Saturday and said the mountain's first eruption in nearly 40 years may soo… [+1469 chars]"
               }[]
        */
        const news: NewsItem[] = data.length >= 10 ? data.filter((_, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (!newsItemTemp) throw new Error('Element #newsItemTemp is missing');

        news.forEach((item: NewsItem, idx: number) => {
            const newsClone: HTMLTemplateElement = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            if (!newsClone) return;
            const setTextContent = (selector: string, textContent: string): void => {
                const element: HTMLTemplateElement | null = newsClone.querySelector(selector);
                if (!element) throw new Error(`Element ${selector} is missing`);
                element.textContent = textContent;
            };
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhoto: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-photo');
            if (metaPhoto) metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            setTextContent('.news__meta-author', item.author || item.source.name);
            setTextContent('.news__meta-date', item.publishedAt.slice(0, 10).split('-').reverse().join('-'));
            setTextContent('.news__description-title', item.title);
            setTextContent('.news__description-source', item.source.name);
            setTextContent('.news__description-content', item.description);

            const readMoreAnchor: HTMLTemplateElement | null = newsClone.querySelector('.news__read-more a');
            if (readMoreAnchor) readMoreAnchor.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsElement: HTMLTemplateElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
