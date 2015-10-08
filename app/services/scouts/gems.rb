class Scouts::Gems < Scout
  base_uri 'rubygems.org/api/v1/versions'

  def perform
    api.get("/#{@lib.name}/latest.json")
  end
end
