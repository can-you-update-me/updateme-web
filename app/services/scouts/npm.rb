class Scouts::Npm < Scout
  base_uri 'registry.npmjs.org'

  def perform
    api.get("/#{@lib.name}/latest")
  end
end
