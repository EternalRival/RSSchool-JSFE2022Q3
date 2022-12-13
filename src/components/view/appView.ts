import { NewsItem, SourceItem } from '../types/interfaces';
import { ResponseData } from '../types/types';
import { News } from './news/news';
import { Sources } from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseData): void {
        const values: NewsItem[] = data.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: ResponseData): void {
        const values: SourceItem[] = data.sources ?? [];
        this.sources.draw(values);
    }
}
