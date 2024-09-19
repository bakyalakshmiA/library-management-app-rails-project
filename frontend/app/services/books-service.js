import Service from '@ember/service';
import { task } from 'ember-concurrency';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
export default class BooksServiceService extends Service {
  @service authenticationService;
  @(task(function* (data) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books`;

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

  @(task(function* (data) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/${data.id}`;

    try {
      const response = yield fetch(url, {
        method: 'PATCH',
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
  updateBook;

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

  @(task(function* (bookId) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/${bookId}/update_status`;
    try {
      const response = yield fetch(url, {
        method: 'PATCH',
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
  updateBookStatus;

  @(task(function* () {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const config = getOwner(this).resolveRegistration('config:environment');
    let url;

    // Determine the URL based on admin status
    if (this.authenticationService.role === 'admin') {
      url = `${config.baseURL}/books/`;
    } else {
      url = `${config.baseURL}/books/available_books/`;
    }

    try {
      // Fetch data from the determined URL
      const response = yield fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token if needed
        },
        method: 'GET',
      });

      // Check for successful response
      if (!response.ok) {
        return;
      }

      // Return the JSON response
      return yield response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of an error
    }
  }).drop())
  fetchAllAvailableBooks;

  @(task(function* () {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const config = getOwner(this).resolveRegistration('config:environment');
    let url = `${config.baseURL}/books/`;

    try {
      // Fetch data from the determined URL
      const response = yield fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token if needed
        },
        method: 'GET',
      });

      // Check for successful response
      if (!response.ok) {
        return;
      }

      // Return the JSON response
      return yield response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of an error
    }
  }).drop())
  fetchAllBooks;

  @(task(function* () {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const config = getOwner(this).resolveRegistration('config:environment');
    let url = `${config.baseURL}/books/books_circulations`;

    try {
      // Fetch data from the determined URL
      const response = yield fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token if needed
        },
        method: 'GET',
      });
      if (!response.ok) {
        return;
      }
      const result = yield response.json();
      return result.books;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }).drop())
  fetchAllBooksCirculations;

  @(task(function* () {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const config = getOwner(this).resolveRegistration('config:environment');
    let url = `${config.baseURL}/books/borrowed_books`;

    try {
      // Fetch data from the determined URL
      const response = yield fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token if needed
        },
        method: 'GET',
      });
      if (!response.ok) {
        return;
      }
      const result = yield response.json();
      return result.books;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }).drop())
  fetchAllBorrowedBooks;
}
