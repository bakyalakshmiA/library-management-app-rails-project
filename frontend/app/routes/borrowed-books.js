import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BorrowedBooksRoute extends Route {
  @service authenticationService;
  @service booksService;
  async beforeModel() {
    await this.authenticationService.loadCurrentUser();
  }

  async model() {
    if (this.authenticationService.role === 'admin') {
      return await this.booksService.fetchAllBooksCirculations.perform();
    } else {
      return await this.booksService.fetchAllBorrowedBooks.perform();
    }
  }
}
