class Scout < BaseService
  include HTTParty

  format :json
  headers 'Accept' => 'application/json'
  logger Rails.logger, :debug, :curl

  def initialize(lib, channel: :latest)
    @lib = lib
    @channel = channel
  end

  def perform
    fail 'Unrecognized channel' unless respond_to?(@channel)
    send(@channel)
  end

  def stable
    latest
  end

  protected

  def api
    self.class
  end
end
