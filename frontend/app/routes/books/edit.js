import Route from '@ember/routing/route';
// import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class BooksEditRoute extends Route {
  @service booksService;
  async model(params) {
    return await this.booksService.fetchBookDetails.perform(params.id);
  }
}
