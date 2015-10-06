workers Integer(ENV['WEB_CONCURRENCY'] || 2)
max_threads = Integer(ENV['MAX_THREADS'] || 5)
threads 2, max_threads

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 3000
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
