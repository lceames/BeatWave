Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, formats: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:create, :destroy, :index, :show]
    resources :comments, only: [:create, :destroy]
  end
end
