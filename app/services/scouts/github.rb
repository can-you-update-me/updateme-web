class Scouts::Github < Scout
  BASE_URI = 'api.github.com'

  def perform
    api.get("/repos/#{@lib.name}/git/refs/tags")
  end
end
