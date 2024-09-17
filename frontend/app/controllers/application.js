import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service authenticationService;
  @tracked currentUser;
  @tracked role;

  constructor() {
    super(...arguments);
    this.initializeCurrentUser();
  }

  async initializeCurrentUser() {
    try {
      await this.authenticationService.loadCurrentUser();
      this.currentUser = this.authenticationService.currentUser;
      this.role = this.authenticationService.role;
    } catch (error) {
      console.error('Failed to load current user:', error);
    }
  }

  get isAdmin() {
    return this.role === 'admin';
  }
}
