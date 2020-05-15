Rails.application.routes.draw do
  # if needed, can add 500, 400
  match '/404', :to => 'errors#not_found',:as=>"not_found", :via => :all
  namespace :api , defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: :create
    end
  end
  root 'home_page#index'
end
