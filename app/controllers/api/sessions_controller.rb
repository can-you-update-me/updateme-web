module Api
  class SessionsController < BaseController
    def create
      warden.authenticate!(:password, store: false)
      head :ok
    end

    def destroy
      warden.logout
      head :ok
    end
  end
end
