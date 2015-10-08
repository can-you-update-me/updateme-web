class Scouts::Npm < Scout
  BASE_URI = 'registry.npmjs.org'

  def perform
    api.get("/#{@lib.name}/latest")
  end
end
