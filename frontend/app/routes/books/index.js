
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import fetch from 'fetch';

export default class BooksIndexRoute extends Route {
  async model() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const url = `${config.baseURL}/books/`;
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

      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
