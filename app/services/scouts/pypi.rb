class Scouts::Pypi < Scout
  base_uri 'pypi.python.org/pypi'

  def data
    api.get("/#{@lib.name}/json")
  end

  def latest
    data['info']['version']
  end

  def stable

  end
end
