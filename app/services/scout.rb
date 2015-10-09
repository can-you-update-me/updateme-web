class Scout < BaseService
  include HTTParty

  format :json
  headers 'Accept' => 'application/json'
  logger Rails.logger, :debug, :curl
  debug_output $stderr

  def initialize(lib)
    @lib = lib
  end

  def api
    self.class
  end
end
