class BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: [ :update,:update_status,:destroy]

  skip_before_action :verify_authenticity_token, unless: :api_request?
  def index
    books = @books = Book.cached_all_books
    render json: books, status: :ok
  end

  def available_books
    books = @books = Book.cached_available_books(current_user)
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
      render json: book, status: :ok
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

  def update_status
    if @book.update(status: false)
      Book.flush_cache
      render json: @book, status: :ok
    else
      render json: { error: @book.errors.full_messages }, status: :unprocessable_entity # Return errors if the update fails
    end
  end

  def borrow
    book_ids = params.require(:book_ids)
    books = Book.where(id: book_ids)

    # Get the current time
    current_time = Time.current

    # Calculate the return date (28 days from now)
    return_date = current_time + 28.days

    books.each do |book|
      if book.quantity > 0
        book.update(quantity: book.quantity - 1)

        borrowed_book = BorrowedBook.find_by(user: current_user, book: book)

        if borrowed_book
          # Update the return date if the record exists
          borrowed_book.update(return_date: return_date)
          puts "Updated existing borrowed book"
        else
          # Create a new record if it does not exist
          BorrowedBook.create(user: current_user, book: book, return_date: return_date)
          puts "Created new borrowed book record"
        end

      end
    end
    puts "here we borrowed"

    BookService.call(current_user, book_ids ,:borrow)
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
    BookService.call(current_user, book_ids ,:return)
    render json: { message: 'Return status updated successfully for all books' }, status: :ok
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:isbn, :title, :author, :language ,:quantity)
  end

  def destroy
    # code here
  end

  private

  def api_request?
    request.format.json?
  end
end
