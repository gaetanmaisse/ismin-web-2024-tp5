import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type supertest from 'supertest';
import { BookModule } from '../src/book.module';

describe('Books API', () => {
  let app: INestApplication;
  let httpRequester: supertest.Agent;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [BookModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  it('GET /books', async () => {
    const response = await httpRequester.get('/books').expect(200);

    expect(response.body).toEqual(expect.any(Array));
  });

  it('POST /books', async () => {
    const response = await httpRequester
      .post('/books')
      .send({
        isbn: '978-2081510436',
        title: 'Candide',
        author: 'Voltaire',
        date: '1759',
      })
      .expect(201);

    expect(response.body).toEqual({
      isbn: '978-2081510436',
      title: 'Candide',
      author: 'Voltaire',
      date: '1759',
    });
  });

  it('GET /books/:isbn', async () => {
    // First prepare the data by adding a book
    await httpRequester.post('/books').send({
      isbn: '978-2081510436',
      title: 'Candide',
      author: 'Voltaire',
      date: '1759',
    });

    // Then get the previously stored book
    const response = await httpRequester
      .get('/books/978-2081510436')
      .expect(200);

    expect(response.body).toEqual({
      isbn: '978-2081510436',
      title: 'Candide',
      author: 'Voltaire',
      date: '1759',
    });
  });

  it('GET /books by author', async () => {
    // First prepare the data by adding some books
    await httpRequester.post('/books').send({
      isbn: '978-2081510436',
      title: 'Candide',
      author: 'Voltaire',
      date: '1759',
    });
    await httpRequester.post('/books').send({
      isbn: '978-2081510438',
      title: 'Zadig',
      author: 'Voltaire',
      date: '1748',
    });
    await httpRequester.post('/books').send({
      isbn: '978-2081510437',
      title: 'La Cantatrice chauve',
      author: 'Ionesco',
      date: '1950',
    });

    // Then get the previously stored book
    const response = await httpRequester
      .get('/books')
      .query({ author: 'Voltaire' })
      .expect(200);

    expect(response.body).toEqual([
      {
        isbn: '978-2081510436',
        title: 'Candide',
        author: 'Voltaire',
        date: '1759',
      },
      {
        isbn: '978-2081510438',
        title: 'Zadig',
        author: 'Voltaire',
        date: '1748',
      },
    ]);
  });

  it('DELETE /books/:isbn', async () => {
    // First prepare the data by adding a book
    await httpRequester.post('/books').send({
      isbn: '978-2081510436',
      title: 'Candide',
      author: 'Voltaire',
      date: '1759',
    });

    // Delete the book
    await httpRequester.delete('/books/978-2081510436').expect(200);

    // Finally, check the book was successfully deleted
    const response = await httpRequester.get('/books');

    expect(response.body).toEqual([]);
  });
});
