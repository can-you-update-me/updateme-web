Rails.application.routes.draw do
  get :ping, to: 'health#ping'

  scope :callbacks, controller: :callbacks do
    get :github
  end

  namespace :api do
    resources :libs, only: [:create] do
      collection do
        Lib::Slugs.each do |slug|
          get slug
        end

        post 'preview' => :scout
      end

      member do
        post :scout
      end
    end

    resources :subscriptions, only: [:index, :create, :destroy]

    resource :users, only: [:create]
    resource :sessions, only: [:create]
  end

  resources :users, only: [] do
    member do
      get 'verify/:token' => :verify, as: :verify
    end
  end

  get '*unknown', to: 'home#index'

  root 'home#index'
end
