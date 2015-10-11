class UsersController < ApplicationController
  def create
    user = User.create!(user_params)
    # UserMailer.confirmation(user).deliver_later

    warden.authenticate!(:password)
    redirect_to session[:redirect_url] || root_path
  end

  def verify
    if User.find(params[:id]).verify(params[:token_secret])
      redirect_to root_path
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
