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
    if current_user.nil?
      session[:redirect_path] = request.path
      redirect_to login_path
    end
  end
end
