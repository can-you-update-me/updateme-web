class Scouts::Crates < Scout
  base_uri 'https://crates.io/api/v1'

  def data
    api.get("/crates/#{@lib.name}")
  end

  def latest
    data['max_version']
  end
end
