class Scouts::Github < Scout
  base_uri 'api.github.com'

  def perform
    api.get("/repos/#{@lib.name}/git/refs/tags")
  end
end
