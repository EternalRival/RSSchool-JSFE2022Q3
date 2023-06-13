import { NewsApiResponse } from '../../types/interfaces/news-api-response.interface';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback: (data?: NewsApiResponse) => void) {
    super.getResp({ endpoint: 'sources' }, callback);
  }

  getNews(e: Event, callback: (data?: NewsApiResponse) => void) {
    let { target } = e;
    const newsContainer = e.currentTarget;

    while (target !== newsContainer) {
      if (!(target instanceof Element)) return;

      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');

        if (sourceId && newsContainer instanceof Element && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp({ endpoint: 'everything', options: { sources: sourceId } }, callback);
        }
        return;
      }
      target = target.parentNode;
    }
  }
}

export default AppController;
