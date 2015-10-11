Rails.application.routes.draw do
  get :ping, to: 'health#ping'

  get :login, to: 'sessions#new', as: :login
  post :login, to: 'sessions#create'

  get :register, to: 'users#new', as: :register
  post :register, to: 'users#create'
end
