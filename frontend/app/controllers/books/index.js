import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ApplicationController from '../application';
import { inject as service } from '@ember/service';

export default class BooksIndexController extends ApplicationController {
  @service authenticationService;
  @service booksService;

  @tracked selectedBookIds = [];

  get columns() {
    const baseColumns = [
      { label: 'Title', field: 'title', sortable: true },
      { label: 'Author', field: 'author', sortable: false },
      { label: 'ISBN', field: 'isbn', sortable: true },
      { label: 'Language', field: 'language', sortable: true },
    ];

    if (this.isAdmin) {
      return [
        ...baseColumns,
        { label: 'quantity', field: 'quantity', sortable: true },
        { label: 'Actions', field: 'actions', sortable: false },
      ];
    }

    return baseColumns;
  }

  @action
  async borrowBooks(selection, datatable) {
    this.selectedBookIds = selection.map((book) => book.id);
    await this.booksService.borrowBooks.perform(this.selectedBookIds);
    // uncheck all the previously borrowed books
    datatable.clearSelection();
  }
}
