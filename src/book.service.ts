import { readFile } from 'node:fs/promises';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { APIBook } from './APIBook';
import type { Book } from './Book';

@Injectable()
export class BookService implements OnModuleInit {
  private readonly logger = new Logger(BookService.name);
  private readonly storage: Map<string, Book> = new Map();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    this.logger.log('Loading books from file and API');
    await Promise.all([this.loadBooksFromFile(), this.loadBooksFromApi()]);
    this.logger.log(`${this.storage.size} books loaded`);
  }

  private async loadBooksFromFile() {
    const data = await readFile('src/dataset.json', 'utf8');
    const books = JSON.parse(data.toString()) as Book[];
    books.forEach((book) => this.addBook(book));
  }

  private async loadBooksFromApi() {
    await firstValueFrom(
      this.httpService
        .get<APIBook[]>('https://api.npoint.io/fbb2a6039fc21e320b30')
        .pipe(
          map((response) => response.data),
          map((apiBooks) =>
            apiBooks.map((apiBook) => ({
              isbn: apiBook.isbn,
              title: apiBook.title,
              author: apiBook.authors,
              date: apiBook.publication_date,
            })),
          ),
          tap((books) => books.forEach((book) => this.addBook(book))),
        ),
    );
  }

  addBook(book: Book) {
    this.storage.set(book.isbn, book);
  }

  getBook(isbn: string): Book {
    const book = this.storage.get(isbn);

    if (!book) {
      throw new Error(`Book with ISBN ${isbn} not found`);
    }

    return book;
  }

  getAllBooks(): Book[] {
    return Array.from(this.storage.values()).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  getBooksOf(author: string): Book[] {
    return this.getAllBooks()
      .filter((book) => book.author === author)
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  remove(isbn: string) {
    this.storage.delete(isbn);
  }

  search(term: string) {
    return Array.from(this.storage.values())
      .filter((book) => book.title.includes(term) || book.author.includes(term))
      .sort((a, b) => a.title.localeCompare(b.title));
  }
}
