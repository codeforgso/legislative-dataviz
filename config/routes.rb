Rails.application.routes.draw do
  root 'home#index'

  get 'home/index'
  get '/dashboard', to: "home#dashboard"
end
