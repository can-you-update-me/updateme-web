module ApplicationHelper
  def json_preload(load_key, hash)
    content_tag :script, JSON.generate(hash).html_safe,
      type: 'text/json-preload', charset: 'UTF-8', json_preload: load_key
  end
end
