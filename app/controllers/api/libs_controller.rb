module Api
  class LibsController < BaseController
    Lib::Types.each do |type|
      define_method type.to_s.demodulize.underscore do
        render json: type.all
      end
    end

    def create
      render json: lib_of_type.create!(lib_params)
    end

    def scout
      if id = params[:id]
        render json: Lib.find(id).scout(channel: :data)
      else
        render json: lib_of_type.new(name: params[:name]).scout
      end
    end

    private

    def lib_params
      params.permit(:name)
    end

    def lib_of_type
      Lib::SlugMap[params[:type]]
    end
  end
end
