module Api
  class LibsController < BaseController
    Lib::Types.each do |type|
      define_method type.to_s.demodulize.underscore do
        render json: type.all
      end
    end
  end
end
