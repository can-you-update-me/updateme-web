module Api
  class UsersController < BaseController
    def create
      user = User.create!(user_params)
      warden.authenticate!(:password, store: false)

      render json: WhoAmI.perform(current_user)
    end

    private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
  end
end
