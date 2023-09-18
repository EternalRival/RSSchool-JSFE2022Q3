import { RequestMethod, StatusCode } from '../types/enums';
import { NewsApi } from '../types/newsApi';
import { ResponseData } from '../types/types';

export class Loader {
    constructor(private baseLink: string, private options: Readonly<NewsApi>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options }: { endpoint: string; options?: object },
        callback: (data: ResponseData) => void
    ): void {
        this.load(RequestMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.UNAUTHORIZED || res.status === StatusCode.NOT_FOUND)
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

    load(method: RequestMethod, endpoint: string, callback: (data: ResponseData) => void, options: object = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<ResponseData> => res.json())
            .then((data): void => {
                if (callback) callback(data);
                else console.error('No callback for GET response');
            })
            .catch((err: Error): void => console.error(err));
    }
}
