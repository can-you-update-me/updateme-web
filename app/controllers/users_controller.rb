class UsersController < ApplicationController
  def verify
    if User.find(params[:id]).verify(params[:token_secret])
      redirect_to root_path
    end
  end
end
