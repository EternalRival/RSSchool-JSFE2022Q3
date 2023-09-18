import { NewsApiResponse } from '../../types/interfaces/news-api-response.interface';

class Loader {
  constructor(public baseLink: string, public options: Record<string, string>) {}

  getResp(
    { endpoint, options = {} }: { endpoint: string; options?: Record<string, string> },
    callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (res.ok) return res;

    if (res.status === 401 || res.status === 404)
      console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
    throw Error(res.statusText);
  }

  makeUrl(options: Record<string, string>, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: (data?: NewsApiResponse) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data: NewsApiResponse) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
