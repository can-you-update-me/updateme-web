module Api
  class SessionsController < BaseController
    def create
      warden.authenticate!(:password, store: false)

      render json: WhoAmI.perform(current_user)
    end

    def destroy
      warden.logout
      head :ok
    end

    def fail
      head :unauthorized
    end
  end
end
