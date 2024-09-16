import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import fetch from 'fetch';
// import { inject as service } from '@ember/service';

export default class BooksIndexRoute extends Route {
  // @service session;

  // beforeModel() {
  //   super.beforeModel(...arguments);
  //
  //   if (!this.session.isAuthenticated) {
  //     console.log('Session is not authenticated.');
  //   }
  // }

  setupController(controller, model) {
    super.setupController(controller, model);
    // Define the separate properties
    controller.set('bookColumns', [
      { label: 'Title', field: 'title', sortable: true },
      { label: 'Author', field: 'author', sortable: false },
      { label: 'ISBN', field: 'isbn', sortable: true },
      { label: 'Language', field: 'language', sortable: true },
      // { label: '# Pages', field: 'pages', sortable: false },
    ]);
  }

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
