import { Source } from './source.interface';
import { Article } from './article.interface';

export interface NewsApiResponse {
  status: string;
  totalResults?: number;
  sources?: Source[];
  articles?: Article[];
}
