import Component from '@glimmer/component';
// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class LeftNavBarComponent extends Component {
  get isAdmin() {
    return this.args.isAdmin;
  }
}
