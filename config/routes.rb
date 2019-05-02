Rails.application.routes.draw do
  resources :users
  scope '/api' do
    resources :bananas
    post 'user_token' => 'user_token#create'
  end
end
