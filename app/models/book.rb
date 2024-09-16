class Book < ApplicationRecord
  has_many :borrowed_books
  has_many :users, through: :borrowed_books

  validates :title, presence: { message: "name must be given" }
  validates :author, uniqueness: true, presence: { message: "email must be given please" }

  after_commit -> { Book.flush_cache }, on: [:create, :update, :destroy]

  # def self.cached_find(id)
  #   Rails.cache.fetch(['book', id], expires_in: 5.minutes) do
  #     find(id)
  #   end
  # end
  def self.cached_all_books
    Rails.cache.fetch('all_books', expires_in: 1.day) do
      all.to_a
    end
  end
  def self.flush_cache
    Rails.cache.delete('all_books')
  end

end
