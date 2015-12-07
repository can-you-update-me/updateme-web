class Strategies::Password < Warden::Strategies::Base
  using JsonParams

  def valid?
    params['email'] && params['password']
  end

  def authenticate!
    user = User.find_by(email: params['email'])
    match = user.try(:authenticate, params['password'])
    match ? success!(user) : fail!('Wrong email or password')
  end
end
