class Strategies::JWT < Warden::Strategies::Base
  def valid?
    headers.key?('Authorization')
  end

  def authenticate!
    data, meta = JWT.decode(
      request.headers['Authorization'],
      ENV['jwt_secret'],
      ENV['jwt_algorithm']
    )
    user = User.find_by(id: data.fetch('user_id'))
    user.present? ? success!(user) : fail!('Wrong authorization token')
  rescue JWT::ExpiredSignature
    fail!('Expired token')
  rescue JWT::VerificationError
    fail!('Verification failed')
  end
end
