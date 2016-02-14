Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
     resources :emotions, only: [:index]
     resources :user, only: [:create]
     resource :session, only: [:create, :destroy]
   end 
end
