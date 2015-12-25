module ApplicationHelper
  def json_preload(load_key, hash)
    content_tag(
      :script,
      JSON.generate(hash).html_safe,
      charset: 'UTF-8',
      type: 'text/json-preload',
      json_preload: load_key.camelize(:lower)
    )
  end

  def oauth_client_ids
    { github: ENV['github_client_id'] }
  end

  def who_am_i(who = current_user)
    WhoAmI.perform(who).to_json.html_safe
  end
end
