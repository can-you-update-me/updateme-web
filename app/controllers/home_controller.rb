class HomeController < ApplicationController
  def index
    @libs = [
      {
        name: 'Ruby Gem',
        devicon: 'ruby'
      },
      {
        name: 'JS Package',
        devicon: 'javascript'
      },
      {
        name: 'Python Package',
        devicon: 'python'
      },
      {
        name: 'GitHub Repo',
        devicon: 'github'
      }
    ].each do |lib|
      lib[:key] = lib[:name].downcase.gsub(/\s+/, '-')
    end
  end
end
