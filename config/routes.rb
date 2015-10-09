Rails.application.routes.draw do
  get :ping, to: 'health#ping'
end
