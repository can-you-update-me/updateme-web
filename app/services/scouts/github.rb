class Scouts::Github < Scout
  base_uri 'https://api.github.com'

  headers 'User-Agent' => ENV['github_app_name']
  default_params(
    client_id: ENV['github_client_id'],
    client_secret: ENV['github_client_secret']
  )

  def perform
    api.get("/repos/#{@lib.name}/readme")
  end

  def latest
    api.get("/repos/#{@lib.name}/git/refs/tags")
  end
end
