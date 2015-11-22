class ScoutJob < ActiveJob::Base
  queue_as :default

  def perform(*args)
    logger.info('Scout on mission')
  end
end

Sidekiq::Cron::Job.create(
  name: 'ScoutCronJob',
  cron: ENV.fetch('scout_cron'),
  class: 'ScoutJob'
)
