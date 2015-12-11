module ApplicationHelper
  GITHUB_OAUTH_URL = URI('https://github.com').tap do |uri|
    uri.path = '/login/oauth/authorize'
    uri.query = {
      client_id: ENV['github_client_id'],
      scope: 'user:email'
    }.to_query
  end.freeze

  def json_preload(load_key, hash)
    content_tag(
      :script,
      JSON.generate(hash).html_safe,
      charset: 'UTF-8',
      type: 'text/json-preload',
      json_preload: load_key.camelize(:lower)
    )
  end

  def oauth_links
    { github: github_oauth_url }
  end

  def github_oauth_url
    GITHUB_OAUTH_URL
  end

  def who_am_i(who = current_user)
    WhoAmI.perform(who).to_json.html_safe
  end
end
