class AddBookStatus < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :status, :integer, default: 1
  end
end
