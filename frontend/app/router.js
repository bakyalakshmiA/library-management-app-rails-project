import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('books', function () {
    this.route('index', { path: '/' });
    this.route('new');
    this.route('edit');
  });
  this.route('home');

  this.route('posts', function () {});
});
