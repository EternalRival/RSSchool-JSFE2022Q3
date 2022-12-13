import { Category, Country, Language } from './enums';

export interface NewsApi {
    apiKey: string;
    category?: Category;
    language?: Language;
    country?: Country;
}
