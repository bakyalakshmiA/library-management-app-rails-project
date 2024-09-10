require 'sidekiq/web'
Rails.application.routes.draw do
  #
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  devise_for :users, controllers: {
    sessions: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :books do
    post 'borrow', on: :collection
    patch 'return', on: :collection
    get 'borrowed_books'
  end
end
