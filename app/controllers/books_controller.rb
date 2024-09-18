class BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: [ :update, :destroy]

  skip_before_action :verify_authenticity_token, unless: :api_request?
  def index
    books = @books = Book.cached_all_books
    render json: books, status: :ok
  end

  def create
    book_params = params.require(:book).permit(
      :isbn,
      :book_id,
      :title,
      :author,
      :language,
      :quantity
    )
    book = Book.new(book_params)

    if book.save
      render json: book, status: :created
    end
  end

  def show
    book = Book.find_by(id: params[:id])
    render json: book, status: :ok
  end

  def update
    book_params = params.require(:book).permit(
      :title,
      :author,
      :language,
      :quantity
    )
    @book.update(book_params)
    render json: @book, status: :ok
  end

  def borrow
    book_ids = params.require(:book_ids)
    books = Book.where(id: book_ids)
    books.each do |book|
      if book.quantity > 0
        book.update(quantity: book.quantity - 1)
      end
    end
    borrowed_books = current_user.books << books
    BookService.call(current_user)
    render json: { message: "Books borrowed successfully" }, status: :ok
  end

    def books_circulations
      borrowed_books = BorrowedBook.includes(:book, :user).all
      render json: {
        message: 'Books borrowed retrieved',
        books: borrowed_books.map do |borrowed_book|
          {
            book_id: borrowed_book.book_id,
            title: borrowed_book.book.title,
            author: borrowed_book.book.author,
            isbn: borrowed_book.book.isbn,
            language: borrowed_book.book.language,
            borrow_date: borrowed_book.borrow_date,
            return_date: borrowed_book.return_date,
            is_returned: borrowed_book.is_returned,
            quantity: borrowed_book.book.quantity,
            user_id: borrowed_book.user_id,
            user_name: borrowed_book.user.name,
            user_email: borrowed_book.user.email,
            user_phone_number: borrowed_book.user.phone_number,
          }
        end
      }, status: :ok
    end

  def borrowed_books
    # get all borrowed book_ids
    borrowed_books = current_user.borrowed_books.includes(:book).where(is_returned: false)

    render json: {
      message: 'Books borrowed retrieved',
      books: borrowed_books.map do |borrowed_book|
        {
          book_id: borrowed_book.book_id,
          title: borrowed_book.book.title,
          author: borrowed_book.book.author,
          isbn: borrowed_book.book.isbn,
          language: borrowed_book.book.language,
          borrow_date: borrowed_book.borrow_date,
          return_date: borrowed_book.return_date,
          is_returned: borrowed_book.is_returned,
        }
      end
    }, status: :ok
  end

  def return
    book_ids = params.require(:book_ids)
    books = Book.where(id: book_ids)
    books.each do |book|
        book.update(quantity: book.quantity + 1)
    end
    BorrowedBook.where(book_id: book_ids).update_all(is_returned: true)
    render json: { message: 'Return status updated successfully for all books' }, status: :ok
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:isbn, :title, :author, :language ,:quantity)
  end

  private

  def api_request?
    request.format.json?
  end
end
