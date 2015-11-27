class Strategies::Session < Warden::Strategies::Base
  def valid?
    true
  end

  def authenticate!
    session[:redirect_url] = request.path
    redirect!('/login')
  end
end
