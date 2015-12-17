class Strategies::JWT < Warden::Strategies::Base
  def valid?
    env.key?('HTTP_AUTHORIZATION')
  end

  def authenticate!
    data, meta = JWT.decode(
      env['HTTP_AUTHORIZATION'],
      ENV['jwt_secret'],
      true,
      algorithm: ENV['jwt_algorithm']
    )
    user = User.find_by(id: data.fetch('user_id'))
    user.present? ? success!(user) : fail!('Wrong authorization token')
  rescue JWT::ExpiredSignature
    fail!('Expired token')
  rescue JWT::VerificationError
    fail!('Verification failed')
  end
end
