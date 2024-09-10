class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.new_user_email.subject
  #
  default from: 'notifications@example.com'

  def new_user_email(user)
    @user = user
    admins = User.where(admin: true);
    admins.each do |admin|
      mail(to: admin.email, subject: 'New User Signed Up')
    end
    #@greeting = "Hi"
    # mail to: "to@example.org"
  end
end
