module Api
  class UsersController < BaseController
    def create
      user = User.create!(user_params)
      warden.authenticate!(:password)
      render json: user
    end

    private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
  end
end
