class BooksMailer < ApplicationMailer
  def borrow_books_email(user)
    puts "here in new user mail"
    @user = user
    admins = User.where(role: "admin")
    puts admins.inspect

    admins.each do |admin|
      mail(to: admin.email, subject: 'Book Borrowed by user')
    end
  end
end
