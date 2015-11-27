class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :lib

  validates_inclusion_of :channel, in: %w( stable latest )
end
