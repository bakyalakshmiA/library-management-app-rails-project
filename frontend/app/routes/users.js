import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import fetch from 'fetch';

export default class UsersRoute extends Route {
  async model() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/users`;
    try {
      const response = await fetch(url, {
        headers: {
          method: 'GET',
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
