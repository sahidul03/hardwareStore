Rails.application.routes.draw do
  resources :receipt_items
  resources :work_receipts do
    member do
      get :payment
    end
  end
  resources :customers do
    member do
      get :history
    end
  end
  resources :reports do
    collection do
      get :dashboard
      get :month_to_month_summary
      get :date_to_date_reports
    end
  end
  resources :jobs
  resources :job_types
  devise_for :users, controllers: { :sessions => "sessions", :registrations => "registrations" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :users
  root to: "reports#dashboard"
end
