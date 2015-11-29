class Lib < ActiveRecord::Base
  Types = [
    Libs::RubyGem,
    Libs::JsPackage,
    Libs::PythonPackage,
    Libs::GithubRepo
  ]


  def scout
    self.class::SCOUT.perform(self)
  end
end
