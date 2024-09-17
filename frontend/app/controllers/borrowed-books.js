import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class BorrowedBooksController extends Controller {
  @service authenticationService;
  @service booksService;

  get columns() {
    const baseColumns = [
      { label: 'ISBN', field: 'isbn', sortable: true },
      { label: 'Title', field: 'title', sortable: true },
      { label: 'borrow date', field: 'borrow_date', sortable: false },
      { label: 'return date', field: 'return_date', sortable: true },
    ];

    if (this.authenticationService.role === 'admin') {
      return [
        ...baseColumns,
        { label: 'user name', field: 'user_name', sortable: false },
        { label: 'status', field: 'is_returned', sortable: false },
      ];
    }
    return baseColumns;
  }

  @action
  async returnBooks(selection, datatable) {
    this.selectedBookIds = selection.map((book) => book.book_id);
    await this.booksService.returnBooks.perform(this.selectedBookIds);
    // uncheck all the previously borrowed books
    datatable.clearSelection();
  }
}
