class OauthClients::Github < OauthClient
  base_uri 'https://api.github.com'
  default_params(
    client_id: ENV['github_client_id'],
    client_secret: ENV['github_client_secret']
  )

  def request_access_token
    oauth_data = api.post(
      'https://github.com/login/oauth/access_token',
      body: { code: code }
    )

    @access_token = oauth_data['access_token']
  end

  def fetch_identity
    headers = {
      'Authorization' => "token #{@access_token}",
      'User-Agent' => ENV['github_client_id']
    }

    user_data = api.get('/user', headers: headers)

    @email, @name = user_data['email'], user_data['name']
  end
end
