import { ResponseCallback } from '../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: ResponseCallback): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: ResponseCallback): void {
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
