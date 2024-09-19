import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';

export default class AuthenticationServiceService extends Service {
  @tracked currentUser = null;
  @tracked role = null;

  async loadCurrentUser() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/current_user/`;
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-Token': csrfToken,
          'X-Client-Address': this.getClientAddress(),
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.currentUser = data;
        this.role = data.user.role;
      } else {
        console.error('Failed to fetch current user:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }
  getClientAddress() {
    // Placeholder for client address; this should ideally be handled server-side
    return '127.0.0.1'; // Example placeholder
  }
}
