class ApplicationController < ActionController::Base

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  def devise_controller?
    Rails.logger.debug "Checking if #{self.class} is a Devise controller"
    super
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :phone_number, :role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :phone_number])
  end

  protected


end
