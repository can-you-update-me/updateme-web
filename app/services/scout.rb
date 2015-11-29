class Scout < BaseService
  include HTTParty

  format :json
  headers 'Accept' => 'application/json'
  logger Rails.logger, :debug, :curl
  debug_output $stderr

  def initialize(lib, channel: :stable)
    @lib = lib
    @channel = channel
  end

  protected

  def api
    self.class
  end
end
