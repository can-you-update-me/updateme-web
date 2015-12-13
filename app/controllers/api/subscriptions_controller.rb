module Api
  class SubscriptionsController < BaseController
    def index
      render json: Subscription.where(user: current_user)
    end

    def create
      render json: Subscription.create!(subscription_params)
    end

    def destroy
      Subscription.find(params[:id]).destroy
      head :ok
    end

    private

    def subscription_params
      params.permit(:lib_id).merge(user: current_user)
    end
  end
end
