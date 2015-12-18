class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :lib_id, :channel

  has_one :lib
end
