class Strategies::JWT < Warden::Strategies::Base
  def valid?
    headers.key?('Authorization')
  end

  def authenticate!
    data, meta = JWT.decode(request.headers['Authorization'], ENV['jwt_secret'])
    user = User.find_by(id: data.fetch('user_id'))
    user.nil? ? success!(user) : fail!('Wrong authorization token')
  end
end
