class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.new_user_email.subject
  #
  def new_user_email(user)
    puts "here in new user mail"
    @user = user
    admins = User.where(role: "admin")
    puts "admins array"
    puts admins.inspect

    admins.each do |admin|
      mail(to: admin.email, subject: 'New User Signed Up')
    end
  end
end

