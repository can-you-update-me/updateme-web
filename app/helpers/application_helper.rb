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
end
