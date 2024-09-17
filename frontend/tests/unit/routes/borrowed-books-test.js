import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | borrowed_books', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:borrowed-books');
    assert.ok(route);
  });
});
