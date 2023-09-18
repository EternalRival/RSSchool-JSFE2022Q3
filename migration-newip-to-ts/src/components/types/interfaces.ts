import { Category, Country, Language } from './enums';

export interface SourceItem {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: Category;
    language?: Language;
    country?: Country;
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
