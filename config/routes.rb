Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :books do
    post 'borrow', on: :collection
    patch 'return', on: :collection
    get 'borrowed_books'
  end
end
