module JsonParams
  refine ::Warden::Strategies::Base do
    def request
      @request ||= ActionDispatch::Request.new(@env)
    end

    def params
      request.params
    end
  end
end
