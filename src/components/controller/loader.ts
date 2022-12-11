import { NewsItem, SourceItem } from '../types/interfaces';
import NewsApi from '../types/newsApi';
class Loader {
    // todo
    baseLink: string;
    options: NewsApi;
    constructor(baseLink: string, options: NewsApi) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: object },
        callback: (data: { articles: NewsItem[]; sources: SourceItem[] }) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data: { articles: NewsItem[]; sources: SourceItem[] }) => void,
        options: object = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<{ articles: NewsItem[]; sources: SourceItem[] }> => res.json())
            .then((data: { articles: NewsItem[]; sources: SourceItem[] }): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
