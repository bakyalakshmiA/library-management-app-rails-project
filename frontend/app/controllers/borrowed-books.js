import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class BorrowedBooksController extends Controller {
  @service authenticationService;

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
}
