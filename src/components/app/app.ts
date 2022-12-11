import AppController from '../controller/controller';
import { IApp, NewsItem, SourceItem } from '../types/interfaces';
import { AppView } from '../view/appView';

class App implements IApp {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement: Element | null = document.querySelector('.sources');

        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event): void => {
                this.controller.getNews(e, (data: { articles: NewsItem[] }): void => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: { sources: SourceItem[] }): void => {
            this.view.drawSources(data);
        });
    }
}

export default App;
