class CreateBorrowedBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :borrowed_books do |t|
      t.references :user, foreign_key: true, index: true
      t.references :book, foreign_key: true, index: true
      t.datetime :borrow_date
      t.datetime :return_date
      t.boolean :is_returned, default: false

      t.timestamps
    end
  end
end
