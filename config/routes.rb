require 'sidekiq/web'
Rails.application.routes.draw do

  root to: redirect('/a/home')

  mount_ember_app :frontend, to: "/a"

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :books, only: [:index, :show, :create, :update, :destroy] do
    post 'borrow', on: :collection
    patch 'return', on: :collection
    get 'borrowed_books'
  end

end
