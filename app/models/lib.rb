class Lib < ActiveRecord::Base
  Types = [
    Libs::RubyGem,
    Libs::JsPackage,
    Libs::PythonPackage,
    Libs::GithubRepo
  ]

  protected

  def scout
    self.class::SCOUT.perform(self)
  end
end
