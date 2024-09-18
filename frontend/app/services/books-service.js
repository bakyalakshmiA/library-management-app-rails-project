import Service from '@ember/service';
import { task } from 'ember-concurrency';
import { getOwner } from '@ember/application';

export default class BooksServiceService extends Service {
  @(task(function* (data) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books#create`;

    try {
      const response = yield fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return;
      }
      return yield response.json();
    } catch (error) {
      console.error('Error creating book:', error);
    }
  }).drop())
  createBook;

  @(task(function* (bookIds) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/borrow`;
    try {
      const response = yield fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ book_ids: bookIds }),
      });
      if (!response.ok) {
        return;
      }
      return yield response.json();
    } catch (error) {
      console.error('Error borrowing books:', error);
      return [];
    }
  }).drop())
  borrowBooks;

  @(task(function* (bookIds) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/return`;
    try {
      const response = yield fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ book_ids: bookIds }),
      });
      if (!response.ok) {
        return;
      }
      return yield response.json();
    } catch (error) {
      console.error('Error returning books:', error);
      return [];
    }
  }).drop())
  returnBooks;

  @(task(function* (bookId) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/${bookId}`;
    try {
      const response = yield fetch(url, {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });
      if (!response.ok) {
        return;
      }
      return yield response.json();
    } catch (error) {
      console.error('Error returning books:', error);
      return [];
    }
  }).drop())
  fetchBookDetails;
}
