import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', { apiKey: '63383ad8c3164b8abdedaeb401f3bff8' });
    }
}

export default AppLoader;
