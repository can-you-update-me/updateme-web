module Api
  class SessionsController < BaseController
    def create
      warden.authenticate!(:password)
      head :ok
    end

    def destroy
      warden.logout
      head :ok
    end
  end
end
