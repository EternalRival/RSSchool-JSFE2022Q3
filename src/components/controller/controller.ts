import { NewsItem, SourceItem } from '../types/interfaces';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: { sources: SourceItem[] }) => void): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: (data: { articles: NewsItem[] }) => void): void {
        const target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        if (!target || !newsContainer) return;

        let targetElement: HTMLElement = target as HTMLElement;
        const newsContainerElement: HTMLElement = newsContainer as HTMLElement;

        while (targetElement !== newsContainerElement) {
            if (targetElement.classList.contains('source__item')) {
                const sourceId: string | null = targetElement.getAttribute('data-source-id');
                if (sourceId && newsContainerElement.getAttribute('data-source') !== sourceId) {
                    newsContainerElement.setAttribute('data-source', sourceId);
                    super.getResp({ endpoint: 'everything', options: { sources: sourceId } }, callback);
                }
                return;
            }
            targetElement = targetElement.parentNode as HTMLElement;
        }
    }
}

export default AppController;
