Rails.application.routes.draw do
  get :ping, to: 'health#ping'

  get :login, to: 'sessions#new', as: :login
  post :login, to: 'sessions#create'

  get :register, to: 'users#new', as: :register
  post :register, to: 'users#create'

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
  end

  get '*unknown', to: 'home#index'

  root 'home#index'
end
