class BookService
  def self.call(user)
    puts "created user"
      puts "user saved in DB"
      BooksMailer.borrow_books_email(user).deliver_later
  end
end