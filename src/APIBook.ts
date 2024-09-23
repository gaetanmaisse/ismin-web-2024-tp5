import { ISBN } from './ISBN';

export type APIBook = {
  isbn: ISBN;
  title: string;
  authors: string;
  num_pages: string;
  publisher: string;
  language_code: string;
  publication_date: string;
};
