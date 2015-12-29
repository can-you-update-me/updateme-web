class Scouts::Npm < Scout
  base_uri 'registry.npmjs.org'

  def data
    api.get("/#{@lib.name}/latest")
  end

  def latest
    data['version']
  end
end
