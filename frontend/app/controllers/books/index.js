import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BooksIndexController extends Controller {
  @tracked SelectedBookIds = [];
  @action
  borrowBooks(selection) {
    this.SelectedBookIds = [];
    selection.forEach((book) => {
      // Assuming 'book' has an 'id' property
      const bookId = book.id;
      this.SelectedBookIds.push(bookId);
    });
  }
}
