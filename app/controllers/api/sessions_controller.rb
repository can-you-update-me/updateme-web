module Api
  class SessionsController < BaseController
    def create
      warden.authenticate!(:password, store: false)

      render json: WhoAmI.perform(current_user)
    end

    def fail
      head :unauthorized
    end
  end
end
