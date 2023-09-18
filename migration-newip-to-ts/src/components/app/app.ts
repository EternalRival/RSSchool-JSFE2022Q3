import { AppController } from '../controller/controller';
import { ResponseData } from '../types/types';
import { AppView } from '../view/appView';

export class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesElement: Element | null = document.querySelector('.sources');

        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event): void => {
                this.controller.getNews(e, (data: ResponseData): void => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: ResponseData): void => {
            this.controller.sourcesList = data.sources;
            this.view.drawSources(data);
        });
    }
}
