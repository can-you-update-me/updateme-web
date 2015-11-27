class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  def warden
    env['warden']
  end

  def current_user
    @current_user ||= warden.user
  end

  def require_user!
    warden.authenticate!(:session)
  end
end
