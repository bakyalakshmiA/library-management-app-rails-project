class BookService
  def self.call(user, book_ids , email_type)
    case email_type
    when :borrow
      BooksMailer.borrow_books_email(user,book_ids).deliver_later
    when :return
      BooksMailer.return_books_email(user,book_ids).deliver_later
    else
      raise "Unknown email type: #{email_type}"
    end
  end
end