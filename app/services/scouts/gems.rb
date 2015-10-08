class Scouts::Gems < Scout
  BASE_URI = 'rubygems.org/api/v1/versions'

  def perform
    api.get("/#{@lib.name}")
  end
end
