Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
<<<<<<< HEAD
      resources :emotions, only: [:index]
      resources :users, only: [:create]
      resource :session, only: [:create, :destroy]
=======
    resources :emotions, only: [:index]
    resources :tweets, only: [:create]
>>>>>>> 7ef2f9a047aa7c77bd86f44189cb8dee59bfeacb
  end
end
