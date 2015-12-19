module Api
  class UsersController < BaseController
    before_action :require_user!, only: [:update]

    def create
      user = User.create!(user_params)
      warden.authenticate!(:password, store: false)

      render json: WhoAmI.perform(current_user)
    end

    def update
      current_user.update!(user_params.except(:email))

      render json: WhoAmI.perform(current_user)
    end

    private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
  end
end
