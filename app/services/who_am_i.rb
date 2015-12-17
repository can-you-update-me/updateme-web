class WhoAmI < BaseService
  attr_reader :current_user

  def initialize(current_user)
    @current_user = current_user
  end

  def perform
    {
      name: current_user.name,
      email: current_user.email,
      email_digest: Digest::MD5.hexdigest(current_user.email),
      subscriptions: current_user.subscriptions,
      token: JWT.encode(
        {
          user_id: current_user.id,
          exp: exp
        },
        ENV['jwt_secret'],
        ENV['jwt_algorithm']
      )
    }
  end

  private

  def exp
    (Time.now + 7.days).to_i
  end
end
