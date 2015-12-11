class OauthClient < BaseService
  include HTTParty

  format :json
  headers 'Accept' => 'application/json'
  logger Rails.logger, :debug, :curl
  debug_output $stderr

  attr_reader :code

  def initialize(code)
    @code = code
  end

  def perform
    request_access_token
    fetch_identity
    find_or_create_user
  end

  protected

  def api
    self.class
  end

  def find_or_create_user
    User.find_or_create_by!(email: @email) do |user|
      user.name = @name
      user.password = SecureRandom.hex(8)
    end
  end
end
