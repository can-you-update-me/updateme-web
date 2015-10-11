class SessionsController < ApplicationController
  def new
  end

  def create
    warden.authenticate!(:password)
    redirect_to session[:redirect_url] || root_path
  end

  def destroy
    warden.logout
    head :ok
  end
end
