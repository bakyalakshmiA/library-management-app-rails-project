class Book < ApplicationRecord
  has_many :borrowed_books
  has_many :users, through: :borrowed_books

  validates :title, presence: { message: "name must be given" }
  validates :author, uniqueness: true, presence: { message: "email must be given please" }

  after_commit -> { Book.flush_cache }, on: [:create, :update, :destroy]

  def self.cached_all_books
    Rails.cache.fetch('all_books', expires_in: 1.day) do
      all.to_a
    end
  end

  def self.cached_available_books(current_user)
    Rails.cache.fetch('available_books', expires_in: 1.day) do
      available_books = where(status: true)
                          .where.not(quantity: 0)

      # Exclude books borrowed by the current user and not returned
      borrowed_book_ids = current_user.borrowed_books
                                      .where(is_returned: false) # Exclude borrowed books that are not returned
                                      .pluck(:book_id) # Extract book ids that are returned

      available_books.where.not(id: borrowed_book_ids).to_a
    end
  end
  def self.flush_cache
    Rails.cache.delete('all_books')
    Rails.cache.delete('available_books')
  end

end
