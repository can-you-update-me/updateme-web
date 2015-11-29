class Lib < ActiveRecord::Base
  Types = [
    Libs::RubyGem,
    Libs::JsPackage,
    Libs::PythonPackage,
    Libs::GithubRepo
  ]

  validates_uniqueness_of :name, scope: :type

  def scout
    self.class::SCOUT.perform(self)
  end
end
