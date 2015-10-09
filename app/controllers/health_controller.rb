class HealthController < ApplicationController
  def ping
    head :ok
  end
end
