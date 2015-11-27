Rails.application.routes.draw do
  get :ping, to: 'health#ping'

  get :login, to: 'sessions#new', as: :login
  post :login, to: 'sessions#create'

  get :register, to: 'users#new', as: :register
  post :register, to: 'users#create'

  lib_types = Lib::Types.map do |type|
    type.to_s.demodulize.underscore.dasherize
  end

  namespace :api do
    resources :libs, only: [:index] do
      collection do
        lib_types.each do |lib_type|
          get lib_type
        end
      end
    end
  end

  get '*unknown', to: 'home#index'

  root 'home#index'
end
