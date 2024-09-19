import ApplicationController from '../application';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class BooksEditController extends ApplicationController {
  @service booksService;
  @service router;

  @tracked bookTitle = this.model.title;
  @tracked author = this.model.author;
  @tracked isbn = this.model.isbn;
  @tracked language = this.model.language;
  @tracked quantity = this.model.quantity;

  get bookData() {
    return {
      id: this.model.id,
      isbn: parseInt(this.isbn),
      title: this.bookTitle,
      author: this.author,
      language: this.language,
      quantity: parseInt(this.quantity),
    };
  }
  @action
  async updateBook() {
    try {
      await this.booksService.updateBook.perform(this.bookData);
      this.transitionToRoute('books.index');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  }
}
