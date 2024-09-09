class BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: [ :update, :destroy]

  def index
    books = Book.all
    render json: books, status: :ok
  end

  def create
    book_params = params.require(:book).permit(
      :book_id,
      :title,
      :author,
      :language
    )
    book = Book.new(book_params)

    if book.save
      render json: book, status: :created
    end
  end

  def update
    book_params = params.require(:book).permit(
      :title,
      :author,
      :language
    )
    @book.update(book_params)
    render json: @book, status: :ok
  end

  def borrow
    book_ids = params.require(:book_ids)
    books = Book.where(id: book_ids)
    current_user.books << books
    render json: { message: "Books borrowed successfully" }, status: :ok
  end

  def borrowed_books
    book_ids = current_user.borrowed_books.pluck(:book_id)
    render json: { message: 'Books borrowed successfully' , books: "#{@books}" }, status: :ok
  end

  def return
    book_ids = params.require(:book_ids)
    BorrowedBook.where(book_id: book_ids).update_all(is_returned: true)
    render json: { message: 'Return status updated successfully for all books' }, status: :ok
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:isbn, :title, :author, :language ,:quantity)
  end

end
