Rails.application.routes.draw do
  resources :users
  root 'home_page#index'
end
