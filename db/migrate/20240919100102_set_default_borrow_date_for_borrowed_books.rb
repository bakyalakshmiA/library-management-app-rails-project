class SetDefaultBorrowDateForBorrowedBooks < ActiveRecord::Migration[5.2]
  def change
    change_column_default :borrowed_books, :borrow_date, -> { 'CURRENT_TIMESTAMP' }
  end
end
