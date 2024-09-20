class BooksMailer < ApplicationMailer
  def borrow_books_email(user,book_ids)
    @user = user
    @books = Book.where(id: book_ids)  # Fetch books by IDs

    mail(
      to: @user.email,
      subject: 'Books Borrowed Successfully'
    ) do |format|
      format.html { render 'borrow_books_email' }
      format.text { render plain: 'Books Borrowed Successfully' }
    end
  end

  def return_books_email(user, book_ids)
    @user = user
    @books = Book.where(id: book_ids)

    mail(
      to: @user.email,
      subject: 'Books Returned Successfully'
    ) do |format|
      format.html { render 'return_books_email' }
      format.text { render plain: 'Books Returned Successfully' }
    end
  end
end
