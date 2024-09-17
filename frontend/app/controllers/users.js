import Controller from '@ember/controller';

export default class UsersController extends Controller {

  get columns() {
    return [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email address', field: 'email', sortable: true },
      { label: 'Phone number', field: 'phone_number', sortable: false },
    ];
  }
}
