require 'sidekiq/web'
Rails.application.routes.draw do

  root to: redirect('/a/books')

  mount_ember_app :frontend, to: "/a"

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :books, only: [:index, :create, :update, :destroy] do
    post 'borrow', on: :collection
    patch 'return', on: :collection
    collection do
      get 'borrowed_books'
      get 'books_circulations'
    end
  end

  devise_scope :user do
    get 'current_user', to: 'users/sessions#current_user_data'
  end

  get 'users', to: 'users#index'

end
