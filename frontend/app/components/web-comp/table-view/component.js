import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class WebCompTableViewVComponent extends Component {
  @tracked columns = this.args.columns || [];
  @tracked rows = this.args.rows || [];

  get model() {
    return this.args.model;
  }
  get columns() {
    return this.args.columns;
  }
  get actionName() {
    return this.args.actionName;
  }

  get isAdmin() {
    return this.args.isAdmin;
  }

  @action
  onBookDelete(BookId) {
    this.args.onBookDelete(BookId);
  }

  @action
  handleAction(selection, datatable) {
    if (this.args.onBorrowBooks) {
      this.args.onBorrowBooks(selection, datatable);
    } else if (this.args.onReturnBooks) {
      this.args.onReturnBooks(selection, datatable);
    }
  }
}
