Rails.application.routes.draw do
  get :ping, to: 'health#ping'

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

    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
  end

  resources :users, only: [] do
    member do
      get 'verify/:token' => :verify, as: :verify
    end
  end

  get '*unknown', to: 'home#index'

  root 'home#index'
end
