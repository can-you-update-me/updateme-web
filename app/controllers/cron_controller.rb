class CronController < ApplicationController
  skip_before_action :verify_authenticity_token

  def time_to_update
    render text: 'OK'
  end
end
