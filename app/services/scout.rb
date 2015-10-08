class Scout < BaseService
  include HTTParty

  def initialize(lib)
    @lib = lib
  end

  def api
    self.class
  end
end
