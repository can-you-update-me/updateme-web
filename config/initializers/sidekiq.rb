redis_host = ENV['REDIS_HOST']
redis_port = ENV['REDIS_PORT']
redis_url = "redis://#{redis_host}:#{redis_port}/2"
redis_config = { url: redis_url, namespace: 'jobs' }

Sidekiq.configure_server do |config|
  config.redis = redis_config
end

Sidekiq.configure_client do |config|
  config.redis = redis_config
end
