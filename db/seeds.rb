Libs::RubyGem.create([
  { name: 'rails' },
  { name: 'rack' },
  { name: 'rake' },
  { name: 'zeus' },
  { name: 'faraday' },
  { name: 'byebug' },
  { name: 'puma' },
  { name: 'figaro' }
])

Libs::JsPackage.create([
  { name: 'angular' },
  { name: 'webpack' },
  { name: 'lodash' },
  { name: 'postcss' },
  { name: 'react' },
  { name: 'angular2' },
  { name: 'express' },
  { name: 'karma' }
])

Libs::PythonPackage.create([
  { name: 'requests' },
  { name: 'django' },
  { name: 'flask' },
  { name: 'docopt' },
  { name: 'ipython' },
  { name: 'jinja2' },
  { name: 'sqlalchemy' },
  { name: 'scipy' }
])

Libs::GithubRepo.create([
  { name: 'goupdateme/updateme' },
  { name: 'docker/docker' },
  { name: 'docker/compose' },
  { name: 'docker/machine' },
  { name: 'docker/swarm' },
  { name: 'ClusterHQ/flocker' },
  { name: 'antirez/redis' },
  { name: 'princemaple/scroll-trigger' }
])
