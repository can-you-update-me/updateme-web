class Scouts::Pypi < Scout
  BASE_URI = 'pypi.python.org/pypi'

  def perform
    api.get("/#{@lib.name}/json")
  end
end
