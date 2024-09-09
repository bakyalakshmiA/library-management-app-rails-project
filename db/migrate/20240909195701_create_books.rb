class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.integer :isbn, null: false, index: { unique: true }
      t.string :title, null: false, limit: 50
      t.string :author, null: false, limit: 50
      t.string :language, null: false, limit: 50
      t.integer :quantity, default: 0, null: false
      t.timestamps
    end
  end
end
