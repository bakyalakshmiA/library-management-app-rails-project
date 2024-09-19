import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BooksIndexRoute extends Route {
  @service authenticationService;
  async beforeModel() {
    await this.authenticationService.loadCurrentUser();
  }
  @service booksService;
  async model() {
    if (this.authenticationService.role === 'admin') {
      return await this.booksService.fetchAllBooks.perform();
    } else {
      return await this.booksService.fetchAllAvailableBooks.perform();
    }
  }
}
