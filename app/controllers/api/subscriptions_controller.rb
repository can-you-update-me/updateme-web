module Api
  class SubscriptionsController < BaseController
    before_action :require_user!

    def index
      render json: current_user.subscriptions.includes(:lib)
    end

    def create
      render json: current_user.subscriptions.create!(subscription_params)
    end

    def destroy
      Subscription.find(params[:id]).destroy
      head :ok
    end

    private

    def subscription_params
      params.permit(:lib_id, :channel)
    end
  end
end
