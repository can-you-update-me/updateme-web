# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :redis_store, servers: {
  host: ENV['REDIS_HOST'],
  port: ENV['REDIS_PORT'],
  db: 0
}, expires_in: 4.weeks
