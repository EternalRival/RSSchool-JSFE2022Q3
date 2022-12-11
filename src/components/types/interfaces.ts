import AppController from '../controller/controller';
import AppView from '../view/appView';
import News from '../view/news/news';
import Sources from '../view/sources/sources';
import { category, country, language } from './types';

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

export interface Source {
    id: string;
    name: string;
}
export interface SourceItem extends Source {
    description: string;
    url: string;
    category: category;
    language: language;
    country: country;
}
export interface NewsItem {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
