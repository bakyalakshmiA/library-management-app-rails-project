class UserRegistrationService
  def self.call(user)
    puts "created user"
    if user.persisted?
      puts "user saved in DB"
      UserMailer.new_user_email(user).deliver_later
    end
  end
end