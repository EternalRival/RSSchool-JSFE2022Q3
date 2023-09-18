import { getRandomElements } from '../../utils/utils';
import { SourceItem } from '../types/interfaces';
import { ResponseData } from '../types/types';
import { AppLoader } from './appLoader';

export class AppController extends AppLoader {
    sourcesList?: SourceItem[];

    getSources(callback: (data: ResponseData) => void): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: (data: ResponseData) => void): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        const getResp = (list: string): void => {
            super.getResp({ endpoint: 'everything', options: { sources: list } }, callback);
        };

        if (!(target instanceof HTMLElement && newsContainer instanceof HTMLElement)) return;

        while (target !== newsContainer) {
            if (target instanceof HTMLElement && target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

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
            if (target instanceof HTMLElement) target = target.parentNode;
        }
    }
}
