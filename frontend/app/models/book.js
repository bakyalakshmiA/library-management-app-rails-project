import Model, { attr } from '@ember-data/model';

export default class BookModel extends Model {
  @attr('string') title;
  @attr('string') isbn;
  @attr('date') publicationDate;
  @attr('string') genre;
  @attr('string') language;
  @attr('number') numberOfPages;
  @attr('string') author;
}
