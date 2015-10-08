class Scouts::Pypi < Scout
  base_uri 'pypi.python.org/pypi'

  def perform
    api.get("/#{@lib.name}/json")
  end
end
