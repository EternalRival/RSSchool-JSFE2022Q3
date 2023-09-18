import { Loader } from './loader';

export class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', { apiKey: '9507b1036dba4614aa8a79a67bc2f599' });
    }
}
