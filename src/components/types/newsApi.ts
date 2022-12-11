import { category, country, language } from './types';

export default interface NewsApi {
    apiKey: string;
    category?: category;
    language?: language;
    country?: country;
}
