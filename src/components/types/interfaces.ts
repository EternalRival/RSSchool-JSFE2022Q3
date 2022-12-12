import AppController from '../controller/controller';
import AppView from '../view/appView';
import News from '../view/news/news';
import Sources from '../view/sources/sources';
import NewsApi from './newsApi';
import { category, country, language, ResponseCallback } from './types';

export interface IApp {
    controller: AppController;
    view: AppView;
}

export interface IDrawSource {
    draw: (data: []) => void;
}

export interface IAppView {
    news: News;
    sources: Sources;
}

export interface ILoader {
    baseLink: string;
    options: NewsApi;
    getResp: (a: { endpoint: string; options: object }, callback: ResponseCallback) => void;
    errorHandler: (res: Response) => Response;
    makeUrl: (options: object, endpoint: string) => string;
    load: (method: string, endpoint: string, callback: ResponseCallback, options: object) => void;
}

export interface SourceItem {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: category;
    language?: language;
    country?: country;
}
export interface NewsItem {
    source: SourceItem;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
