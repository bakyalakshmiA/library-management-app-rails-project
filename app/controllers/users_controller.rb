class UsersController < ApplicationController
  before_action :authenticate_user!

  # Action to fetch all users with a false role
  def index
    @users = User.where(role: false)
    render json: @users
  end
end
