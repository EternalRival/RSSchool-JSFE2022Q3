import getRandomElements from '../../utils/utils';
import { SourceItem } from '../types/interfaces';
import { ResponseCallback } from '../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    sourcesList: SourceItem[] | undefined;

    getSources(callback: ResponseCallback): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: ResponseCallback): void {
        const target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        if (!target || !newsContainer) return;

        const getResp: (list: string) => void = (list: string): void => {
            super.getResp({ endpoint: 'everything', options: { sources: list } }, callback);
        };

        let targetElement: HTMLElement = target as HTMLElement;
        const newsContainerElement: HTMLElement = newsContainer as HTMLElement;

        while (targetElement !== newsContainerElement) {
            if (targetElement.classList.contains('source__item')) {
                const sourceId: string | null = targetElement.getAttribute('data-source-id');

                if (sourceId && newsContainerElement.getAttribute('data-source') !== sourceId) {
                    newsContainerElement.setAttribute('data-source', sourceId);

                    if (sourceId === 'all' && this.sourcesList) {
                        const list: string = getRandomElements<SourceItem>(this.sourcesList, 20)
                            .reduce((acc: string, item: SourceItem): string => `${acc + item.id},`, '')
                            .slice(0, -1);
                        getResp(list);
                    } else {
                        getResp(sourceId);
                    }
                }
                return;
            }
            targetElement = targetElement.parentNode as HTMLElement;
        }
    }
}

export default AppController;
