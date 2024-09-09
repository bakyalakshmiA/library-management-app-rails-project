class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  skip_before_action :verify_authenticity_token, if: :json_request?


  has_many :borrowed_books
  has_many :books, through: :borrowed_books

  enum role: {user: 0, admin: 1}

  validates_presence_of :name, :phone_number
end
