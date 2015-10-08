class Lib < ActiveRecord::Base
  def scout
    self.class::SCOUT.perform(self)
  end
end
