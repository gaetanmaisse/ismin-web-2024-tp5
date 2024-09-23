import { ISBN } from './ISBN';

export interface Book {
  isbn: ISBN;
  title: string;
  author: string;
  date: string;
}
