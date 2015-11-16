require File.expand_path('../boot', __FILE__)

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'
    config.autoload_paths += %w(lib/warden)

    config.active_record.raise_in_transactional_callbacks = true

    config.action_mailer.smtp_settings = {
      address: ENV['smtp_address'],
      port: ENV['smtp_port'],
      domain: ENV['smtp_domain'],
      user_name: ENV['smtp_user_name'],
      password: ENV['smtp_password'],
      authentication: ENV['smtp_authentication']
    }

    config.cache_store = :redis_store, {
      host: ENV['REDIS_HOST'],
      port: ENV['REDIS_PORT'],
      db: 1,
      namespace: 'cache'
    }, { expires_in: 4.weeks }

    config.active_job.queue_adapter = :sidekiq

    config.to_prepare do
      Warden::Strategies.add(:password, Strategies::Password)
    end
  end
end
