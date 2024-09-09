class Book < ApplicationRecord
  has_many :borrowed_books
  has_many :users, through: :borrowed_books

  validates :title, presence: { message: "name must be given" }
  validates :author, uniqueness: true, presence: { message: "email must be given please" }
end
