Rails.application.routes.draw do
  resources :job_types
  devise_for :users, controllers: { :sessions => "sessions", :registrations => "registrations" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :users
  root to: "users#show"
end
