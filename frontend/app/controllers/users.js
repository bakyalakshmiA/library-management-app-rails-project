import ApplicationController from "./application";

export default class UsersController extends ApplicationController {

  get columns() {
    return [
      { label: 'Name', field: 'name', sortable: true },
      { label: 'Email address', field: 'email', sortable: true },
      { label: 'Phone number', field: 'phone_number', sortable: false },
    ];
  }
}
