import AppController from '../controller/controller';
import AppView from '../view/appView';
import { category, country, language } from './types';

export default interface IApp {
    controller: AppController;
    view: AppView;
}

export interface IDrawSource {
    draw: (data: []) => void;
}

export interface Source {
    id: string;
    name: string;
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
/* черновичок
Sources.draw(data:{
          "id": "abc-news",
          "name": "ABC News",
          "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
          "url": "https://abcnews.go.com",
          "category": "general",
          "language": "en",
          "country": "us"
}[])
data {status:string,sources:{
            "id": "abc-news",
            "name": "ABC News",
            "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
            "url": "https://abcnews.go.com",
            "category": "general",
            "language": "en",
            "country": "us"
            }[]}


*/
