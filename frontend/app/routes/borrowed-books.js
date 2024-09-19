import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class BorrowedBooksRoute extends Route {
  @service authenticationService;
  async beforeModel() {
    await this.authenticationService.loadCurrentUser();
  }

  async model() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/books_circulations`;
    try {
      const response = await fetch(url, {
        headers: {
          method: 'GET',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      return result.books;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
