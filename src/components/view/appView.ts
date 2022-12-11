import { IAppView, NewsItem, SourceItem } from '../types/interfaces';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements IAppView {
    news: News;

    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: { articles: NewsItem[] }): void {
        const values: NewsItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: { sources: SourceItem[] }): void {
        const values: SourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
