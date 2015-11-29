class Scouts::Gems < Scout
  base_uri 'rubygems.org/api/v1'

  def perform
    api.get("/gems/#{@lib.name}.json")
  end

  def latest
    api.get("/versions/#{@lib.name}/latest.json")
  end
end
