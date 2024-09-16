import Component from '@glimmer/component';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class WebCompTableViewVComponent extends Component {
  get model() {
    return this.args.model;
  }
}


