class CallbacksController < ApplicationController
  layout false

  def github
    warden.set_user(OauthClients::Github.perform(params[:code]), store: false)
    render 'message'
  end
end
