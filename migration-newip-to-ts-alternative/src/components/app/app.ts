import { NewsApiResponse } from '../../types/interfaces/news-api-response.interface';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller = new AppController();

  view = new AppView();

  start() {
    document
      .querySelector('.sources')
      ?.addEventListener('click', (e) =>
        this.controller.getNews(e, (data?: NewsApiResponse) => this.view.drawNews(data))
      );
    this.controller.getSources((data?: NewsApiResponse) => this.view.drawSources(data));
  }
}

export default App;
