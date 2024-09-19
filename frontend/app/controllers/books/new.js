import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ApplicationController from '../application';

export default class BooksNewController extends ApplicationController {
  @service booksService;
  @service router;

  @tracked bookTitle = '';
  @tracked author = '';
  @tracked isbn = '';
  @tracked language = '';
  @tracked quantity = '';

  get disableSubmit() {
    // Check if any of the tracked properties are empty
    return (
      !this.bookTitle.length ||
      !this.author.length ||
      !this.isbn.length ||
      !this.language.length ||
      !this.quantity.length
    );
  }
  get bookData() {
    return {
      isbn: this.isbn,
      title: this.bookTitle,
      author: this.author,
      language: this.language,
      quantity: parseInt(this.quantity),
    };
  }

  @action
  async submitBook(e) {
    e.preventDefault();
    try {
      const result = await this.booksService.createBook.perform(this.bookData);
      console.log('Book created successfully:', result);
      this.router.transitionTo('books.index');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  }
}
