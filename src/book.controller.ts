import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import type { Book } from './Book';
import { BookService } from './book.service';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(@Body() book: Book): Book {
    this.bookService.addBook(book);
    return this.bookService.getBook(book.isbn);
  }

  @Get()
  getBooks(@Query('author') author: string): Book[] {
    if (author) {
      return this.bookService.getBooksOf(author);
    }
    return this.bookService.getAllBooks();
  }

  @Get(':isbn')
  getBook(@Param('isbn') isbn: string): Book {
    return this.bookService.getBook(isbn);
  }

  @Delete(':isbn')
  deleteBook(@Param('isbn') isbn: string): void {
    this.bookService.remove(isbn);
  }

  @Post('search')
  @HttpCode(200)
  searchBooks(@Body() { term }: { term: string }): Book[] {
    return this.bookService.search(term);
  }
}
