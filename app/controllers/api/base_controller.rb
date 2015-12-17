module Api
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session

    def require_user!
      warden.authenticate!(:jwt, store: false)
    end
  end
end
