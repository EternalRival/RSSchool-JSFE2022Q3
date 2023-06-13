import { NewsApiResponse } from '../../types/interfaces/news-api-response.interface';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  news = new News();

  sources = new Sources();

  drawNews(data?: NewsApiResponse) {
    const values = data?.articles ?? [];
    this.news.draw(values);
  }

  drawSources(data?: NewsApiResponse) {
    const values = data?.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;
